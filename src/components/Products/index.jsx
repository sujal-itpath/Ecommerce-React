import { useEffect, useState, useRef, useCallback } from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import ProductList from "./ProductList";
import SidebarFilters from "./SidebarFilters";
import PageContainer from "../Layout/PageContainer";
import { PRODUCT_API_PATHS, API_BASE_URL } from "../../constants/apiConstants";
import { Search, ShoppingBag } from "lucide-react";
import SearchBar from "./SearchBar";
import SortOptions from "./SortOptions";
import PaginationLoader from './PaginationLoader';

// Global cache for products data
const globalCache = {
  products: null,
  timestamp: null,
  CACHE_DURATION: 5 * 60 * 1000, // 5 minutes
};

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [allProducts, setAllProducts] = useState(() => {
    // Initialize from cache if available
    if (globalCache.products && 
        globalCache.timestamp && 
        Date.now() - globalCache.timestamp < globalCache.CACHE_DURATION) {
      return globalCache.products;
    }
    return [];
  });
  const [filters, setFilters] = useState({
    brand: searchParams.get('brand')?.split(',') || [],
    discount: searchParams.get('discount')?.split(',') || [],
    rating: searchParams.get('rating')?.split(',') || [],
    category: searchParams.get('category')?.split(',') || [],
    price: searchParams.get('price')?.split(',')?.map(Number) || [0, 1000],
    color: searchParams.get('color')?.split(',') || [],
  });
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || "");
  const [sortOption, setSortOption] = useState(searchParams.get('sort') || "Most Popular");
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [limit] = useState(8);
  const [page, setPage] = useState(1);

  const observer = useRef();
  const lastProductRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          handleLoadMore();
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  // Load products only if not in cache
  useEffect(() => {
    const fetchProducts = async () => {
      if (allProducts.length > 0) return; // Skip if we already have products

      setLoading(true);
      try {
        const res = await axios.get(`${API_BASE_URL}${PRODUCT_API_PATHS.all}`);
        const productsData = res.data.products || res.data;
        
        // Update cache
        globalCache.products = productsData;
        globalCache.timestamp = Date.now();
        
        setAllProducts(productsData);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const updateURLParams = (newFilters, newSearch, newSort) => {
    const params = new URLSearchParams();
    
    if (newFilters.brand.length) params.set('brand', newFilters.brand.join(','));
    if (newFilters.discount.length) params.set('discount', newFilters.discount.join(','));
    if (newFilters.rating.length) params.set('rating', newFilters.rating.join(','));
    if (newFilters.category.length) params.set('category', newFilters.category.join(','));
    if (newFilters.price[0] !== 0 || newFilters.price[1] !== 1000) params.set('price', newFilters.price.join(','));
    if (newFilters.color.length) params.set('color', newFilters.color.join(','));
    if (newSearch) params.set('search', newSearch);
    if (newSort !== "Most Popular") params.set('sort', newSort);

    setSearchParams(params);
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    setPage(1);
    updateURLParams(newFilters, searchTerm, sortOption);
  };

  const handleSearchChange = (term) => {
    setSearchTerm(term);
    setPage(1);
    updateURLParams(filters, term, sortOption);
  };

  const handleSortChange = (option) => {
    setSortOption(option);
    setPage(1);
    updateURLParams(filters, searchTerm, option);
  };

  const applyFilters = useCallback(() => {
    let filtered = [...allProducts];

    // Apply all filters in sequence
    filtered = filtered.filter(product => {
      // Search filter
      if (searchTerm && !product.title?.toLowerCase().includes(searchTerm.toLowerCase())) {
        return false;
      }

      // Brand filter
      if (filters.brand.length > 0 && (!product.brand || !filters.brand.includes(product.brand.toString().toLowerCase()))) {
        return false;
      }

      // Category filter
      if (filters.category.length > 0 && (!product.category || !filters.category.includes(product.category.toString().toLowerCase()))) {
        return false;
      }

      // Price filter
      const [minPrice, maxPrice] = filters.price;
      if (product.price < minPrice || product.price > maxPrice) {
        return false;
      }

      // Discount filter
      if (filters.discount.length > 0) {
        const maxDiscount = Math.max(...filters.discount.map(d => parseInt(d)));
        if (!product.discount || product.discount < maxDiscount) {
          return false;
        }
      }

      // Color filter
      if (filters.color.length > 0 && (!product.color || !filters.color.includes(product.color.toString().toLowerCase()))) {
        return false;
      }

      // Rating filter
      if (filters.rating.length > 0) {
        const productRating = Math.floor(product.rating?.rate || 0);
        if (!filters.rating.includes(String(productRating))) {
          return false;
        }
      }

      return true;
    });

    // Apply sorting
    switch (sortOption) {
      case "Price: Low to High":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "Price: High to Low":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "Newest":
        filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      default:
        // Most Popular (default)
        filtered.sort((a, b) => (b.rating?.rate || 0) - (a.rating?.rate || 0));
    }

    setFilteredProducts(filtered);
  }, [allProducts, filters, searchTerm, sortOption]);

  const resetFilters = () => {
    const defaultFilters = {
      brand: [],
      discount: [],
      rating: [],
      category: [],
      price: [0, 1000],
      color: [],
    };
    setFilters(defaultFilters);
    setSearchTerm("");
    setSortOption("Most Popular");
    setPage(1);
    setSearchParams({});
  };

  const handleLoadMore = () => {
    setPage((prev) => prev + 1);
  };

  // Apply filters whenever any filter-related state changes
  useEffect(() => {
    applyFilters();
  }, [applyFilters]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white py-8 px-4 sm:px-6 lg:px-8 px-4 md:px-8 lg:px-16 xl:px-24 2xl:px-32">
      <header className="mb-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-pink-400 bg-clip-text text-transparent">
              Explore Products
            </h1>
            <p className="text-gray-600 mt-2">
              Discover our curated collection of premium items
            </p>
          </div>
          <SearchBar value={searchTerm} onChange={handleSearchChange} />
        </div>
      </header>
  
      <div className="flex flex-col lg:flex-row gap-8">
        <aside className="w-full lg:w-1/4 lg:sticky lg:top-4 lg:self-start">
          <div className="backdrop-blur-sm p-6 rounded-2xl shadow-sm border border-gray-100 max-h-[80vh] overflow-y-auto scrollbar-thin scrollbar-thumb-pink-300 scrollbar-track-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-800">Filters</h3>
              <button
                className="text-sm text-pink-500 hover:text-pink-700 transition-colors cursor-pointer"
                onClick={resetFilters}
              >
                Reset All
              </button>
            </div>
            <SidebarFilters
              onFilterChange={handleFilterChange}
              allProducts={allProducts}
              selectedFilters={filters}
            />
          </div>
        </aside>
  
        <main className="flex-1">
          <div className="mb-6 flex items-center justify-between backdrop-blur-sm p-4 rounded-xl border border-gray-100">
            <div className="flex items-center gap-2 text-gray-600">
              <ShoppingBag className="h-5 w-5" />
              <span>{filteredProducts.length} products</span>
            </div>
            <SortOptions value={sortOption} onChange={handleSortChange} />
          </div>
  
          <ProductList products={filteredProducts.slice(0, page * limit)} loading={loading} />
  
          {filteredProducts.length > page * limit && (
            <PaginationLoader loading={loading} hasMore={hasMore} onLoadMore={handleLoadMore} />
          )}
  
          <div ref={lastProductRef} className="h-10" />
        </main>
      </div>
    </div>
  );
};

export default Products;

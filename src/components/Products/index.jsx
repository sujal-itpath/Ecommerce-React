import { useEffect, useState, useCallback, useRef } from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import ProductList from "./ProductList";
import SidebarFilters from "./SidebarFilters";
import PageContainer from "../common/Layout/PageContainer";
import { PRODUCT_API_PATHS, API_BASE_URL } from "../../api/constants/apiConstants";
import { Search, ShoppingBag, SlidersHorizontal, X } from "lucide-react";
import SearchBar from "./SearchBar";
import SortOptions from "./SortOptions";

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
    category: searchParams.get('category')?.split(',') || [],
    color: searchParams.get('color')?.split(',') || [],
    price: searchParams.get('price')?.split(',')?.map(Number) || [0, 1000],
    discount: searchParams.get('discount')?.split(',') || [],
    rating: searchParams.get('rating')?.split(',') || [],
  });
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || "");
  const [sortOption, setSortOption] = useState(searchParams.get('sort') || "Most Popular");
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const productsPerPage = 8;
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  const observer = useRef();
  const lastProductRef = useCallback(node => {
    if (loading || pageLoading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        handleLoadMore();
      }
    });
    if (node) observer.current.observe(node);
  }, [loading, pageLoading, hasMore]);

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
    if (newFilters.category.length) params.set('category', newFilters.category.join(','));
    if (newFilters.color.length) params.set('color', newFilters.color.join(','));
    if (newFilters.price[0] !== 0 || newFilters.price[1] !== 1000) params.set('price', newFilters.price.join(','));
    if (newFilters.discount.length) params.set('discount', newFilters.discount.join(','));
    if (newFilters.rating.length) params.set('rating', newFilters.rating.join(','));
    if (newSearch) params.set('search', newSearch);
    if (newSort !== "Most Popular") params.set('sort', newSort);

    setSearchParams(params);
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    setCurrentPage(1);
    setFilteredProducts([]);
    updateURLParams(newFilters, searchTerm, sortOption);
  };

  const handleSearchChange = (term) => {
    setSearchTerm(term);
    setCurrentPage(1);
    setFilteredProducts([]);
    updateURLParams(filters, term, sortOption);
  };

  const handleSortChange = (option) => {
    setSortOption(option);
    setCurrentPage(1);
    setFilteredProducts([]);
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

      // Color filter
      if (filters.color.length > 0 && (!product.color || !filters.color.includes(product.color.toString().toLowerCase()))) {
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
        filtered.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
        break;
      default:
        // Most Popular (default)
        filtered.sort((a, b) => (b.rating?.rate || 0) - (a.rating?.rate || 0));
    }

    setFilteredProducts(filtered);
    setHasMore(filtered.length > currentPage * productsPerPage);
  }, [allProducts, filters, searchTerm, sortOption, currentPage]);

  const resetFilters = () => {
    const defaultFilters = {
      brand: [],
      category: [],
      color: [],
      price: [0, 1000],
      discount: [],
      rating: [],
    };
    setFilters(defaultFilters);
    setSearchTerm("");
    setSortOption("Most Popular");
    setCurrentPage(1);
    setFilteredProducts([]);
    setSearchParams({});
  };

  const handleLoadMore = async () => {
    if (pageLoading) return;
    
    setPageLoading(true);
    setCurrentPage(prev => prev + 1);
    
    // Simulate loading delay for better UX
    await new Promise(resolve => setTimeout(resolve, 500));
    setPageLoading(false);
  };

  // Apply filters whenever any filter-related state changes
  useEffect(() => {
    applyFilters();
  }, [applyFilters]);

  const toggleMobileFilters = () => {
    setIsMobileFiltersOpen(!isMobileFiltersOpen);
  };

  // Calculate current page products
  const currentProducts = filteredProducts.slice(0, currentPage * productsPerPage);

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white py-8 px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col lg:flex-row gap-8 relative">
        {/* Sidebar for larger screens */}
        <aside className="hidden lg:block w-full lg:w-1/4 lg:sticky lg:top-4 lg:self-start">
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

        {/* Main Content */}
        <main className="flex-1">
          <div className="flex flex-col gap-6">
            {/* Search and Sort Bar */}
            <div className="flex flex-col sm:flex-row items-end sm:items-center justify-between gap-4 px-8  sm:px-14">
              <div className="w-full sm:w-64 order-1 sm:order-1">
                <SearchBar value={searchTerm} onChange={handleSearchChange} />
              </div>
              <div className="flex items-center justify-between w-full sm:w-auto gap-3 order-2 sm:order-2">
                <span className="text-sm text-gray-500 sm:hidden">Sort by:</span>
                <div className="hidden sm:block w-px h-6 bg-gray-200"></div>
                <div className="flex justify-end">
                  <SortOptions value={sortOption} onChange={handleSortChange} />
                </div>
              </div>
            </div>

            {/* Products Grid */}
            {loading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500 mx-auto"></div>
                <p className="mt-4 text-gray-600">Loading products...</p>
              </div>
            ) : (
              <>
                <div className="relative px-4 sm:px-6">
                  {pageLoading && (
                    <div className="absolute bottom-0 left-0 right-0 bg-white bg-opacity-75 flex items-center justify-center py-4">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-pink-500"></div>
                    </div>
                  )}
                  <ProductList products={currentProducts} />
                  {hasMore && <div ref={lastProductRef} className="h-10" />}
                </div>
              </>
            )}
          </div>
        </main>

        {/* Floating Filter Button */}
        <button
          onClick={toggleMobileFilters}
          className="fixed bottom-8 right-8 lg:hidden w-14 h-14 bg-pink-500 text-white rounded-full shadow-lg hover:bg-pink-600 transition-colors flex items-center justify-center z-40"
        >
          <SlidersHorizontal className="w-6 h-6" />
        </button>

        {/* Mobile Filters Sidebar */}
        {isMobileFiltersOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 lg:hidden">
            <div className="absolute left-0 top-0 h-full w-4/5 max-w-sm bg-white p-6 overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-800">Filters</h3>
                <div className="flex items-center gap-4">
                  <button
                    className="text-sm text-pink-500 hover:text-pink-700 transition-colors"
                    onClick={() => {
                      resetFilters();
                      setCurrentPage(1);
                      setFilteredProducts([]);
                      toggleMobileFilters();
                    }}
                  >
                    Reset All
                  </button>
                  <button
                    onClick={toggleMobileFilters}
                    className="p-2 text-gray-600 hover:text-pink-500 transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
              </div>
              <SidebarFilters
                onFilterChange={(newFilters) => {
                  setFilters(newFilters);
                }}
                allProducts={allProducts}
                selectedFilters={filters}
              />
              <button
                className="mt-6 w-full bg-pink-500 text-white py-2 rounded-md hover:bg-pink-600 transition-colors"
                onClick={() => {
                  setCurrentPage(1);
                  setFilteredProducts([]);
                  handleFilterChange(filters);
                  toggleMobileFilters();
                }}
              >
                Apply Filters
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;

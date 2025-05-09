// In ProductDetailPage.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ProductDetail from '../../components/ProductDetail';
import { getProductById, getAllProducts } from '../../api/productApi.js';

const ProductDetailPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [allProducts, setAllProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch both the specific product and all products
        const [productResponse, allProductsResponse] = await Promise.all([
          getProductById(id),
          getAllProducts()
        ]);
        
        setProduct(productResponse.data.product);
        setAllProducts(allProductsResponse.data.products || allProductsResponse.data);
      } catch (err) {
        setError('Failed to load product details');
        console.error('Error fetching data:', err);
      }
    };

    fetchData();
  }, [id]);

  if (error) return <div className="text-red-500 text-center mt-8">{error}</div>;
  if (!product) return <div className="text-center mt-8">Loading...</div>;

  return <ProductDetail product={product} allProducts={allProducts} />;
};

export default ProductDetailPage;

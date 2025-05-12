import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE_URL, PRODUCT_API_PATHS } from '../../../api/constants/apiConstants';
import Card from '../../common/Card';

const LatestProducts = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API_BASE_URL}${PRODUCT_API_PATHS.all}`);
        if (response.data && Array.isArray(response.data.products)) {
          // Filter electronics products
          const electronicsProducts = response.data.products.filter(
            product => product.category?.toLowerCase() === 'audio'
          );
          // Get first 6 products from electronics category
          setProducts(electronicsProducts.slice(0, 6));
        } else {
          throw new Error('Invalid data format received from API');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading products...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="text-center text-red-500">
          <p>Error: {error}</p>
        </div>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Latest Product</h2>
          <p className="text-gray-600">No products available at the moment.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Latest Electronics</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Explore our newest gadgets and devices, featuring cutting-edge technology and innovation.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((product) => (
          <Card key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default LatestProducts;

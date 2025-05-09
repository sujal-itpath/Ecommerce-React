import React from 'react';
import ProductCard from '../ProductCard';
import { PackageOpen } from 'lucide-react';

const ProductList = ({ products = [], loading, firstLoadDone }) => {
  const showEmptyState = !loading && firstLoadDone && products.length === 0;

  if (showEmptyState) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-gray-500">
        <PackageOpen className="h-16 w-16 text-gray-300 mb-4" />
        <p className="text-xl font-medium text-gray-600">No products found</p>
        <p className="text-sm mt-2 text-gray-500">Try adjusting your search or filter criteria</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-10 space-y-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductList;

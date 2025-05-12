import React from "react";
import { useNavigate } from "react-router-dom";
import ProductCard from "../Products/ProductCard";
import { useCartStore } from "../../store/cartStore";

const ProductDetail = ({ product, allProducts = [] }) => {
  const { addToCart } = useCartStore();
  const navigate = useNavigate();

  if (!product) return null;

  const relatedProducts = allProducts
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 3);

  const handleAddToCart = () => {
    addToCart(product);
    navigate("/cart");
  };

  return (
    <div className="p-8 max-w-screen-xl mx-auto">
      {/* Top Section */}
      <div className="bg-white p-8 rounded-xl shadow-lg mb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Image Section */}
          <div className="flex justify-center items-center bg-gray-100 rounded-xl p-4">
            <img
              src={product.image || "https://placehold.co/400x400?text=No+Image"}
              alt={product.title}
              className="max-h-96 object-contain"
            />
          </div>

          {/* Product Info Section */}
          <div>
            <h1 className="text-4xl font-semibold mb-4">{product.title}</h1>

            <div className="flex gap-2 flex-wrap mb-4">
              <span className="px-4 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700">
                {product.category.toUpperCase()}
              </span>
              {product.brand && (
                <span className="px-4 py-1 bg-primary text-white rounded-md text-sm font-medium">
                  {product.brand}
                </span>
              )}
            </div>

            <div className="flex items-center gap-2 mb-4">
              <span className="text-yellow-500">⭐⭐⭐⭐☆</span>
              <span className="text-sm text-gray-600">
                ({product.rating?.count || 0} reviews)
              </span>
            </div>

            <div className="mt-4 mb-6">
              <p className="text-2xl font-semibold text-green-600">
                ${product.price.toFixed(2)}
              </p>
              {product.discount > 0 && (
                <div className="flex items-center gap-2 mt-2">
                  <span className="line-through text-gray-500">
                    ${(product.price * (1 + product.discount / 100)).toFixed(2)}
                  </span>
                  <span className="bg-red-600 text-white text-xs py-1 px-2 rounded-full">
                    -{product.discount}%
                  </span>
                </div>
              )}
            </div>

            <p className="text-sm text-gray-600 mb-4">
              {product.model && `Model: ${product.model} `}
              {product.color && `| Color: ${product.color}`}
            </p>

            <button
              onClick={handleAddToCart}
              className="w-full bg-green-600 text-white py-3 px-4 rounded-md text-lg font-semibold hover:bg-green-700 transition"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="bg-white p-8 rounded-xl shadow-lg mb-12">
        <h2 className="text-2xl font-semibold mb-4">Product Description</h2>
        <p className="text-gray-600">{product.description}</p>
      </div>

      {/* Specifications */}
      <div className="bg-white p-8 rounded-xl shadow-lg mb-12">
        <h2 className="text-2xl font-semibold mb-4">Specifications</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { label: "Brand", value: product.brand },
            { label: "Model", value: product.model },
            { label: "Color", value: product.color },
            { label: "Category", value: product.category },
          ].map(
            (item, i) =>
              item.value && (
                <div key={i} className="flex flex-col">
                  <span className="text-sm text-gray-500">{item.label}</span>
                  <span className="font-medium">{item.value}</span>
                </div>
              )
          )}
        </div>
      </div>

      {/* Reviews */}
      <div className="bg-white p-8 rounded-xl shadow-lg mb-12">
        <h2 className="text-2xl font-semibold mb-4">Customer Reviews</h2>
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
          <span className="text-yellow-500">⭐⭐⭐⭐☆</span>
          <span>
            ({product.rating?.rate || 0}/5 from {product.rating?.count || 0} reviews)
          </span>
        </div>
        <div className="border-t border-gray-300 pt-4 mt-4">
          <p className="italic text-gray-600">“Great product quality and value for money!” – Verified Buyer</p>
        </div>
      </div>

      {/* Related Products */}
      <div>
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">You may also like</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {relatedProducts.map((item) => (
            <ProductCard key={item.id} product={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;

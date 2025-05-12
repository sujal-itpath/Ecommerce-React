import React from "react";
import { useNavigate } from "react-router-dom";
import { useWishlistStore } from "../../store/wishlistStore";
import Card from "../common/Card";

const Wishlist = () => {
  const { wishlist } = useWishlistStore();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-pink-400 bg-clip-text text-transparent">
            My Wishlist
          </h1>
          <p className="text-gray-600 mt-2">
            {wishlist.length} items in your wishlist
          </p>
        </div>

        {wishlist.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 mb-4">Your wishlist is empty</p>
            <button
              onClick={() => navigate("/products")}
              className="bg-pink-500 text-white px-6 py-2 rounded-full hover:bg-pink-600 transition-colors"
            >
              Browse Products
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {wishlist.map((product) => (
              <Card key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;

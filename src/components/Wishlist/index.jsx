import React from "react";
import { Heart, ShoppingCart, Eye, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useWishlistStore } from "../../store/wishlistStore";

const WishlistCard = ({ product, addToCart }) => {
  const navigate = useNavigate();
  const { wishlist, toggleWishlist } = useWishlistStore();

  const {
    id,
    title,
    price,
    image,
    rating,
    discount,
    brand,
    category,
  } = product;

  const isInWishlist = wishlist.some((item) => item.id === id);
  const discountedPrice = discount
    ? price - price * (discount / 100)
    : price;

  return (
    <div
      className="group relative bg-white rounded-xl shadow hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100 hover:border-pink-200 w-full max-w-[320px] mx-auto cursor-pointer"
    >
      {/* Image */}
      <div
        className="relative overflow-hidden bg-gray-50"
        onClick={() => navigate(`/products/${id}`)}
      >
        <img
          src={image}
          alt={title}
          onError={(e) => {
            e.target.src =
              "https://placehold.co/300x300.png?text=Image+Not+Available";
          }}
          className="w-full h-64 object-contain p-3 transition-transform duration-500 group-hover:scale-105"
        />

        {discount && (
          <div className="absolute top-2 left-2 bg-pink-500 text-white px-2 py-0.5 rounded-full text-xs font-semibold shadow">
            {discount}% OFF
          </div>
        )}

        <div className="absolute bottom-2 left-2 flex gap-2 opacity-0 translate-y-3 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 z-10">
          <button 
            onClick={(e) => {
              e.stopPropagation();
              toggleWishlist(product);
            }}
            className="bg-white p-1.5 rounded-full shadow hover:bg-pink-100 transition"
          >
            <Heart className={`w-4 h-4 ${isInWishlist ? "text-pink-500 fill-pink-500" : "text-gray-600"}`} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              addToCart(product);
              navigate("/cart");
            }}
            className="bg-white p-1.5 rounded-full shadow hover:bg-pink-100 transition"
          >
            <ShoppingCart className="w-4 h-4 text-gray-600" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/products/${id}`);
            }}
            className="bg-white p-1.5 rounded-full shadow hover:bg-pink-100 transition"
          >
            <Eye className="w-4 h-4 text-gray-600" />
          </button>
        </div>
      </div>

      {/* Info */}
      <div className="p-3 space-y-1.5" onClick={() => navigate(`/products/${id}`)}>
        <p className="text-xs text-gray-400 capitalize">
          {category} • {brand}
        </p>

        <h3 className="text-sm font-semibold text-gray-800 line-clamp-2 group-hover:text-pink-500 transition">
          {title}
        </h3>

        <div className="flex items-center gap-1 text-xs">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-3.5 h-3.5 ${
                i < Math.floor(rating?.rate || 0)
                  ? "text-yellow-400 fill-yellow-400"
                  : "text-gray-300"
              }`}
            />
          ))}
          <span className="text-gray-500 ml-1">({rating?.count || 0})</span>
        </div>

        <div className="flex items-center gap-1">
          <span className="text-base font-bold text-gray-900">
            ${discountedPrice.toFixed(2)}
          </span>
          {discount && (
            <span className="text-xs text-gray-400 line-through">
              ${price.toFixed(2)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

const Wishlist = () => {
  const { wishlist } = useWishlistStore();
  const navigate = useNavigate();

  const addToCart = (product) => {
    // Implement your cart logic here
    console.log("Adding to cart:", product);
  };

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
              <WishlistCard
                key={product.id}
                product={product}
                addToCart={addToCart}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;

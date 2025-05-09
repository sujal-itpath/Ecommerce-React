import React from "react";
import { Heart, ShoppingCart, Eye, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useWishlistStore } from "../../../store/wishlistStore";
import { useCart } from "../../../context/CartContext";

const Card = ({ product }) => {
  const navigate = useNavigate();
  const { wishlist, toggleWishlist } = useWishlistStore();
  const { addToCart } = useCart();

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
  const discountedPrice = discount ? price - price * (discount / 100) : price;

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart(product);
    navigate("/cart");
  };

  const handleWishlistToggle = (e) => {
    e.stopPropagation();
    toggleWishlist(product);
  };

  const handleCardClick = () => {
    navigate(`/products/${id}`);
  };

  return (
    <div
      onClick={handleCardClick}
      className="group relative bg-white rounded-xl shadow hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100 hover:border-pink-200 w-full max-w-[320px] mx-auto cursor-pointer"
    >
      {/* Image */}
      <div className="relative overflow-hidden bg-gray-50">
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
            onClick={handleWishlistToggle}
            className="bg-white p-1.5 rounded-full shadow hover:bg-pink-100 transition"
          >
            <Heart className={`w-4 h-4 ${isInWishlist ? "text-pink-500 fill-pink-500" : "text-gray-600"}`} />
          </button>
          <button
            onClick={handleAddToCart}
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
      <div className="p-3 space-y-1.5">
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

export default Card;

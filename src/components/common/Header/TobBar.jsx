import React, { useState, useEffect } from "react";
import { Mail, Phone, Heart, ShoppingCart, LogIn, LogOut } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useCartStore } from "../../../store/cartStore";
import { useWishlistStore } from "../../../store/wishlistStore";
import Login from "../../../forms/Login";

const TopBar = () => {
  const { cartItems } = useCartStore();
  const { wishlist } = useWishlistStore();
  const navigate = useNavigate();
  const [showLogin, setShowLogin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    setIsLoggedIn(!!token);
  }, []);

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  const wishlistCount = wishlist.length;

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userId");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userName");
    setIsLoggedIn(false);
    navigate("/");
    window.location.reload();
  };

  return (
    <>
      <div className="w-full bg-purple-600 text-white py-2">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
          <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6 text-sm">
            <a
              href="mailto:info@hekto.com"
              className="flex items-center hover:text-purple-200 transition-colors"
            >
              <Mail size={16} className="mr-2" />
              <span>info@hekto.com</span>
            </a>
            <a
              href="tel:+1234567890"
              className="flex items-center hover:text-purple-200 transition-colors"
            >
              <Phone size={16} className="mr-2" />
              <span>(123)456-7890</span>
            </a>
          </div>
          <div className="flex items-center space-x-6 text-sm mt-2 md:mt-0">
            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="flex items-center hover:text-purple-200 transition-colors"
              >
                <LogOut size={16} className="mr-1" />
                <span>Logout</span>
              </button>
            ) : (
              <button
                onClick={() => setShowLogin(true)}
                className="flex items-center hover:text-purple-200 transition-colors"
              >
                <LogIn size={16} className="mr-1" />
                <span>Login</span>
              </button>
            )}

            {/* Wishlist Button */}
            <button
              onClick={() => {
                if (isLoggedIn) {
                  navigate("/wishlist");
                } else {
                  setShowLogin(true);
                }
              }}
              className="flex items-center hover:text-purple-200 transition-colors relative group"
            >
              <Heart size={16} className="mr-1" />
              {isLoggedIn && wishlistCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-pink-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center transform scale-100 group-hover:scale-110 transition-transform">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Cart Button */}
            <button
              onClick={() => {
                if (isLoggedIn) {
                  navigate("/cart");
                } else {
                  setShowLogin(true);
                }
              }}
              className="flex items-center hover:text-purple-200 transition-colors relative group"
            >
              <ShoppingCart size={16} />
              {isLoggedIn && cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-pink-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center transform scale-100 group-hover:scale-110 transition-transform">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Modal component */}
      {showLogin && (
        <Login onClose={() => setShowLogin(false)} isModal={true} />
      )}
    </>
  );
};

export default TopBar;

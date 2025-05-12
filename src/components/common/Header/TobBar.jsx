import React, { useState, useEffect } from "react";
import { Mail, Phone, Heart, ShoppingCart, LogIn, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
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
    localStorage.clear();
    setIsLoggedIn(false);
    navigate("/");
    window.location.reload();
  };

  return (
    <>
      <div className="w-full bg-purple-600 text-white py-3 shadow-sm">
        <div className="container mx-auto px-4 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
          {/* Left: Contact Info */}
          <div className="flex flex-row sm:flex-row sm:items-center justify-between gap-5 sm:gap-6 text-sm">
            <a
              href="mailto:info@hekto.com"
              className="flex items-center hover:text-purple-200 transition"
            >
              <Mail size={16} className="mr-2" />
              info@hekto.com
            </a>
            <a
              href="tel:+1234567890"
              className="flex items-center hover:text-purple-200 transition"
            >
              <Phone size={16} className="mr-2" />
              (123) 456-7890
            </a>
          </div>

          {/* Divider on small screens */}
          <div className="block sm:hidden border-t border-purple-400"></div>

          {/* Right: User Actions */}
          <div className="w-full sm:w-auto flex flex-wrap sm:flex-nowrap justify-between sm:justify-end items-center gap-3 sm:gap-6 text-sm">

            <div className="flex gap-4">
              {/* Wishlist */}
              <button 
                onClick={() => (isLoggedIn ? navigate("/wishlist") : setShowLogin(true))}
                className="relative flex items-center hover:text-purple-200 transition"
              >
                <Heart size={16} className="mr-1" />
                {isLoggedIn && wishlistCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-pink-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
              </button>

              {/* Cart */}
              <button
                onClick={() => (isLoggedIn ? navigate("/cart") : setShowLogin(true))}
                className="relative flex items-center hover:text-purple-200 transition"
              >
                <ShoppingCart size={16} />
                {isLoggedIn && cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-pink-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>

              {/* Login */}
              {!isLoggedIn && (
                <button
                  onClick={() => setShowLogin(true)}
                  className="flex items-center hover:text-purple-200 transition"
                >
                  <LogIn size={16} className="mr-1" />
                  Login
                </button>
              )}
            </div>

            {/* Logout (pushed far right) */}
            {isLoggedIn && (
              <div className="ml-auto">
                <button
                  onClick={handleLogout}
                  className="flex items-center hover:text-purple-200 transition"
                >
                  <LogOut size={16} className="mr-1" />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Login Modal */}
      {showLogin && <Login onClose={() => setShowLogin(false)} isModal={true} />}
    </>
  );
};

export default TopBar;

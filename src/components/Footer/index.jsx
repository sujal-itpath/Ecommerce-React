import React from "react";
import {
  Phone,
  Mail,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-[#EEEFFB] pt-16 pb-8 w-full">
      <div className="container mx-auto w-full px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-indigo-600">Hekto</h3>
            <div className="relative">
              <input
                type="email"
                placeholder="Enter Email Address"
                className="w-full py-3 px-4 pr-12 rounded bg-white border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
              <button className="absolute right-0 top-0 bg-pink-500 text-white rounded-r h-full px-4 hover:bg-pink-600 transition-colors">
                Sign Up
              </button>
            </div>
            <div className="text-gray-600">
              <p>Contact Info</p>
              <p className="text-sm mt-1">
                17 Princess Road, London, Greater London NW1 8JR, UK
              </p>
            </div>
          </div>

          {/* Categories */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-800">Categories</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="/category/laptops"
                  className="text-gray-600 hover:text-indigo-600 transition-colors"
                >
                  Laptops & Computers
                </a>
              </li>
              <li>
                <a
                  href="/category/cameras"
                  className="text-gray-600 hover:text-indigo-600 transition-colors"
                >
                  Cameras & Photography
                </a>
              </li>
              <li>
                <a
                  href="/category/phones"
                  className="text-gray-600 hover:text-indigo-600 transition-colors"
                >
                  Smart Phones & Tablets
                </a>
              </li>
              <li>
                <a
                  href="/category/games"
                  className="text-gray-600 hover:text-indigo-600 transition-colors"
                >
                  Video Games & Consoles
                </a>
              </li>
              <li>
                <a
                  href="/category/headphones"
                  className="text-gray-600 hover:text-indigo-600 transition-colors"
                >
                  Waterproof Headphones
                </a>
              </li>
            </ul>
          </div>

          {/* Customer Care */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-800">
              Customer Care
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="/account"
                  className="text-gray-600 hover:text-indigo-600 transition-colors"
                >
                  My Account
                </a>
              </li>
              <li>
                <a
                  href="/discount"
                  className="text-gray-600 hover:text-indigo-600 transition-colors"
                >
                  Discount
                </a>
              </li>
              <li>
                <a
                  href="/returns"
                  className="text-gray-600 hover:text-indigo-600 transition-colors"
                >
                  Returns
                </a>
              </li>
              <li>
                <a
                  href="/orders"
                  className="text-gray-600 hover:text-indigo-600 transition-colors"
                >
                  Orders History
                </a>
              </li>
              <li>
                <a
                  href="/tracking"
                  className="text-gray-600 hover:text-indigo-600 transition-colors"
                >
                  Order Tracking
                </a>
              </li>
            </ul>
          </div>

          {/* Pages */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-800">Pages</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="/blog"
                  className="text-gray-600 hover:text-indigo-600 transition-colors"
                >
                  Blog
                </a>
              </li>
              <li>
                <a
                  href="/shop"
                  className="text-gray-600 hover:text-indigo-600 transition-colors"
                >
                  Browse the Shop
                </a>
              </li>
              <li>
                <a
                  href="/category"
                  className="text-gray-600 hover:text-indigo-600 transition-colors"
                >
                  Category
                </a>
              </li>
              <li>
                <a
                  href="/pre-built"
                  className="text-gray-600 hover:text-indigo-600 transition-colors"
                >
                  Pre-Built Pages
                </a>
              </li>
              <li>
                <a
                  href="/visual-composer"
                  className="text-gray-600 hover:text-indigo-600 transition-colors"
                >
                  Visual Composer Elements
                </a>
              </li>
              <li>
                <a
                  href="/woocommerce"
                  className="text-gray-600 hover:text-indigo-600 transition-colors"
                >
                  WooCommerce Pages
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-600 text-sm">
              ©2025 Hekto. All rights reserved.
            </p>
            <div className="flex items-center space-x-4 mt-4 md:mt-0">
              <a
                href="#"
                className="text-gray-600 hover:text-blue-600 transition-colors"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-gray-600 hover:text-blue-400 transition-colors"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-gray-600 hover:text-pink-600 transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

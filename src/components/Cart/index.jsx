import React from "react";
import { useCartStore } from "../../store/cartStore";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity } = useCartStore();
  const navigate = useNavigate();

  const total = cartItems
    .reduce((sum, item) => sum + item.price * item.quantity, 0)
    .toFixed(2);

  // Handle updating quantity
  const handleQuantityUpdate = (id, newQuantity) => {
    if (newQuantity >= 1) {
      updateQuantity(id, newQuantity);
    }
  };

  // Handle removing item from cart
  const handleRemoveItem = (id) => {
    removeFromCart(id);
  };

  // Handle checkout navigation
  const handleCheckout = () => {
    navigate("/cart/checkout");
  };

  // Handle continuing shopping navigation
  const handleContinueShopping = () => {
    navigate("/products");
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-rose-50 to-white px-6 py-10">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-10">
          <div className="flex-1 bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-3xl font-bold text-pink-600 mb-6 border-b pb-3">
              Your Shopping Bag
            </h2>
            <p className="text-gray-500 text-lg text-center py-10">Your cart is empty.</p>
            <button
              onClick={handleContinueShopping}
              className="mt-6 w-full bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white py-3 text-lg font-semibold rounded-xl shadow-md transition-all duration-300"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 to-white px-6 py-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Left - Cart Items */}
        <div className="col-span-2 bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-3xl font-bold text-pink-600 mb-6 border-b pb-3">
            Your Shopping Bag
          </h2>

          <ul className="space-y-6">
            {cartItems.map((item) => (
              <li
                key={item.id}
                className="flex flex-col lg:flex-row items-center justify-between border-b pb-4"
              >
                <div className="flex items-center gap-4 w-full lg:w-auto">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-20 w-20 object-contain rounded-xl border"
                  />
                  <div>
                    <h4 className="font-semibold text-blue-500 text-lg text-gray-800">{item.title}</h4>
                    <p className="text-sm text-gray-500">${item.price} × {item.quantity}</p>
                  </div>
                </div>

                <div className="flex gap-2 items-center mt-4 lg:mt-0">
                  {/* Quantity Update Buttons */}
                  <button
                    onClick={() => handleQuantityUpdate(item.id, item.quantity - 1)}
                    className="px-4 py-2 bg-gray-100 text-black text-lg rounded-full transition-all duration-200 hover:bg-rose-100 focus:outline-none"
                  >
                    -
                  </button>
                  <span className="font-semibold text-[#0d0e43] text-xl">{item.quantity}</span>
                  <button
                    onClick={() => handleQuantityUpdate(item.id, item.quantity + 1)}
                    className="px-4 py-2 bg-gray-100 text-black text-lg rounded-full transition-all duration-200 hover:bg-rose-100 focus:outline-none"
                  >
                    +
                  </button>

                  {/* Remove Button */}
                  <button
                    onClick={() => handleRemoveItem(item.id)}
                    className="text-sm text-red-600 hover:text-red-700 hover:underline focus:outline-none"
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Right - Order Summary */}
        <div className="w-full bg-white rounded-2xl shadow-lg p-6 mt-6 lg:mt-0">
          <h3 className="text-2xl font-bold text-rose-600 mb-4">Order Summary</h3>

          <div className="space-y-4 text-gray-700">
            <div className="flex justify-between text-[#0d0e43]">
              <span>Total Items</span>
              <span>{cartItems.length}</span>
            </div>
            <div className="flex justify-between font-semibold text-xl text-[#0d0e43] border-t pt-4">
              <span>Total Price</span>
              <span className="text-pink-600">${total}</span>
            </div>
          </div>

          <button
            onClick={handleCheckout}
            className="mt-6 w-full bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white py-3 text-lg font-semibold rounded-xl shadow-md transition-all duration-300"
          >
            Proceed to Checkout
          </button>

          <button
            onClick={handleContinueShopping}
            className="mt-4 w-full bg-gray-200 text-gray-700 py-3 text-lg font-semibold rounded-xl shadow-md transition-all duration-300"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;

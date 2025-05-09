import React from "react";
import { useCartStore } from "../../store/cartStore";
import { useNavigate } from "react-router-dom";


const Cart = () => {
    const navigate = useNavigate()
  const cartItems = useCartStore((state) => state.cartItems);
  const removeFromCart = useCartStore((state) => state.removeFromCart);

  const total = cartItems
    .reduce((sum, item) => sum + item.price * item.quantity, 0)
    .toFixed(2);

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 to-white px-6 py-10">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-10">
        {/* Left - Cart Items */}
        <div className="flex-1 bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-3xl font-bold text-pink-600 mb-6 border-b pb-3">
            Your Shopping Bag
          </h2>

          {cartItems.length === 0 ? (
            <p className="text-gray-500 text-lg text-center py-10">Your cart is empty.</p>
          ) : (
            <ul className="space-y-6">
              {cartItems.map((item) => (
                <li
                  key={item.id}
                  className="flex items-center justify-between border-b pb-4"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="h-20 w-20 object-contain rounded-xl border"
                    />
                    <div>
                      <h4 className="font-semibold text-lg text-gray-800">{item.title}</h4>
                      <p className="text-sm text-gray-500">${item.price} × {item.quantity}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-sm text-rose-500 hover:underline hover:text-rose-600"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Right - Summary */}
        <div className="w-full lg:w-1/3 ">
          <div className="sticky top-20 bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-2xl font-bold text-rose-600 mb-4">Order Summary</h3>

            <div className="space-y-4 text-gray-700">
              <div className="flex justify-between">
                <span>Total Items</span>
                <span>{cartItems.length}</span>
              </div>
              <div className="flex justify-between font-semibold text-xl text-pink-600 border-t pt-4">
                <span>Total Price</span>
                <span>${total}</span>
              </div>
            </div>

            <button
            onClick={()=>navigate('/cart/checkout')}
              className="mt-6 w-full bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white py-3 text-lg font-semibold rounded-xl shadow-md transition-all duration-300"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
    
export default Cart;

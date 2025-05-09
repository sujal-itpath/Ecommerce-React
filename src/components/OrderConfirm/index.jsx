import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';

const OrderConfirm = () => {
  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-pink-50 px-4">
      <div className="bg-white p-8 rounded-xl shadow-md max-w-md w-full text-center border border-pink-200">
        <CheckCircle size={48} className="text-pink-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-pink-600 mb-2">Order Confirmed!</h2>
        <p className="text-gray-700 mb-6">Thank you for shopping with us. Your order has been successfully placed.</p>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            to="/products"
            className="bg-pink-500 text-white px-6 py-2 rounded-lg hover:bg-pink-600 transition"
          >
            Continue Shopping
          </Link>
          <Link
            to="/orders"
            className="border border-pink-500 text-pink-500 px-6 py-2 rounded-lg hover:bg-pink-100 transition"
          >
            View Orders
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirm;

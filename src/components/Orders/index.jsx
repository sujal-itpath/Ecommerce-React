import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CheckCircle, Package, Truck, Calendar } from 'lucide-react';
import useOrderStore from '../../store/orderStore';

const Orders = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { orders, loadOrders, removeOrder } = useOrderStore();
  const { order: newOrder } = location.state || {};

  useEffect(() => {
    loadOrders();
  }, [loadOrders]);

  // Format dates
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Calculate estimated delivery date
  const getEstimatedDeliveryDate = (orderDate) => { 
    const date = new Date(orderDate);
    date.setDate(date.getDate() + 2);
    return formatDate(date);
  };

  // Check if delivery date has passed
  const hasDeliveryDatePassed = (orderDate) => {
    const deliveryDate = new Date(orderDate);
    deliveryDate.setDate(deliveryDate.getDate() + 2);
    return deliveryDate < new Date();
  };

  // Filter out orders with passed delivery dates
  const activeOrders = orders.filter(order => !hasDeliveryDatePassed(order.date));

  // Remove orders with passed delivery dates
  useEffect(() => {
    orders.forEach(order => {
      if (hasDeliveryDatePassed(order.date)) {
        removeOrder(order.id);
      }
    });
  }, [orders, removeOrder]);

  if (activeOrders.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4 md:px-8 max-w-[1400px]">
          <div className="max-w-[1200px] mx-auto">
            <div className="bg-white rounded-xl shadow-sm p-6 md:p-8 text-center">
              <h1 className="text-2xl font-bold text-gray-900 mb-4">No Active Orders</h1>
              <p className="text-gray-600 mb-6">You don't have any active orders at the moment.</p>
              <button
                onClick={() => navigate('/')}
                className="px-6 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition-colors"
              >
                Start Shopping
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 md:px-8 max-w-[1400px]">
        <div className="max-w-[1200px] mx-auto">
          <h1 className="text-2xl font-bold text-gray-900 mb-8">My Orders</h1>
          
          {/* Show success message for new order */}
          {newOrder && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-8">
              <div className="flex items-center">
                <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                <p className="text-green-800">Your order has been placed successfully!</p>
              </div>
            </div>
          )}

          {/* Orders List */}
          <div className="space-y-6">
            {activeOrders.map((order) => (
              <div key={order.id} className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900">Order #{order.id}</h2>
                    <p className="text-sm text-gray-600">Placed on {formatDate(order.date)}</p>
                  </div>
                  <span className="px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                    {order.status}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Order Items */}
                  <div>
                    <h3 className="font-medium text-gray-900 mb-3">Order Items</h3>
                    <div className="space-y-3">
                      {order.products.map((item, index) => (
                        <div key={index} className="flex items-center space-x-4">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-16 h-16 object-cover rounded-lg"
                          />
                          <div>
                            <p className="font-medium">{item.name}</p>
                            <p className="text-sm text-gray-600">
                              Quantity: {item.quantity} × ${item.price.toFixed(2)}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Order Details */}
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-medium text-gray-900 mb-2">Shipping Address</h3>
                      <p className="text-sm text-gray-600">
                        {order.shippingAddress.firstName} {order.shippingAddress.lastName}<br />
                        {order.shippingAddress.address}<br />
                        {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}<br/>
                        Phone : {order.shippingAddress.phone}
                      </p>
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900 mb-2">Delivery Information</h3>
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <Calendar className="w-4 h-4" />
                        <span>Estimated Delivery: {getEstimatedDeliveryDate(order.date)}</span>
                      </div>
                    </div>
                    <div className="pt-4 border-t border-gray-200">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-900">Total Amount</span>
                        <span className="text-lg font-semibold">${order.total.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Orders;

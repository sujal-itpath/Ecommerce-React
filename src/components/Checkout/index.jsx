import React, { useState, useEffect } from 'react';
import { useCartStore } from '../../store/cartStore';

import { useNavigate } from 'react-router-dom';
import useOrderStore from '../../store/orderStore';

const Checkout = () => {
  const { cartItems, clearCart } = useCartStore();
  const addOrder = useOrderStore((state) => state.addOrder);
  const [activeStep, setActiveStep] = useState(0);
  const [shippingInfo, setShippingInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    phone: '',
  });
  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
    paymentMethod: 'credit',
  });
  const [errors, setErrors] = useState({});
  const [subtotal, setSubtotal] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    // Calculate subtotal from cart items
    const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    setSubtotal(total);
  }, [cartItems]);

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      return total + (item.price * item.quantity);
    }, 0);
  };

  const validateShippingForm = () => {
    const newErrors = {};
    if (!shippingInfo.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!shippingInfo.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!shippingInfo.email.trim()) newErrors.email = 'Email is required';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(shippingInfo.email)) newErrors.email = 'Invalid email format';
    if (!shippingInfo.address.trim()) newErrors.address = 'Address is required';
    if (!shippingInfo.city.trim()) newErrors.city = 'City is required';
    if (!shippingInfo.state.trim()) newErrors.state = 'State is required';
    if (!shippingInfo.zipCode.trim()) newErrors.zipCode = 'ZIP code is required';
    if (!shippingInfo.phone.trim()) newErrors.phone = 'Phone is required';
    if (!/^\d{10}$/.test(shippingInfo.phone.replace(/\D/g, ''))) newErrors.phone = 'Invalid phone number';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validatePaymentForm = () => {
    const newErrors = {};
    if (!paymentInfo.cardNumber.trim()) newErrors.cardNumber = 'Card number is required';
    if (!/^\d{16}$/.test(paymentInfo.cardNumber.replace(/\s/g, ''))) newErrors.cardNumber = 'Invalid card number';
    if (!paymentInfo.cardName.trim()) newErrors.cardName = 'Name on card is required';
    if (!paymentInfo.expiryDate.trim()) newErrors.expiryDate = 'Expiry date is required';
    if (!/^\d{2}\/\d{2}$/.test(paymentInfo.expiryDate)) newErrors.expiryDate = 'Invalid expiry date';
    if (!paymentInfo.cvv.trim()) newErrors.cvv = 'CVV is required';
    if (!/^\d{3}$/.test(paymentInfo.cvv)) newErrors.cvv = 'Invalid CVV';
  
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleShippingChange = (e) => {
    const { name, value } = e.target;
  
    let updatedValue = value;
  
    if (name === 'zipCode') {
      // Allow only digits and max 6
      updatedValue = value.replace(/\D/g, '').substring(0, 6);
    }
  
    setShippingInfo({
      ...shippingInfo,
      [name]: updatedValue,
    });
  
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: '',
      });
    }
  };
  
  const handlePaymentChange = (e) => {
    const { name, value } = e.target;
  
    if (name === 'cardNumber') {
      const digitsOnly = value.replace(/\D/g, '').substring(0, 16);
      const formatted = digitsOnly.replace(/(\d{4})(?=\d)/g, '$1 ').trim();
      setPaymentInfo({ ...paymentInfo, cardNumber: formatted });
  
    } else if (name === 'expiryDate') {
      let digits = value.replace(/\D/g, '').substring(0, 4);
      if (digits.length >= 3) {
        digits = digits.replace(/(\d{2})(\d{1,2})/, '$1/$2');
      }
  
      const [month, year] = digits.split('/');
      const currentYear = new Date().getFullYear() % 100;
      const currentMonth = new Date().getMonth() + 1;
  
      if (
        parseInt(month) > 12 ||
        (parseInt(year) < currentYear || (parseInt(year) === currentYear && parseInt(month) < currentMonth))
      ) {
        setErrors((prev) => ({ ...prev, expiryDate: 'Card expired' }));
      } else {
        setErrors((prev) => ({ ...prev, expiryDate: '' }));
      }
  
      setPaymentInfo({ ...paymentInfo, expiryDate: digits });
  
    } else if (name === 'cvv') {
      const digits = value.replace(/\D/g, '').substring(0, 3);
      setPaymentInfo({ ...paymentInfo, cvv: digits });
  
    } else {
      setPaymentInfo({ ...paymentInfo, [name]: value });
    }
  
    // Clear error for other fields
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: '',
      });
    }
  };
  
  

  const handleNext = () => {
    if (activeStep === 0 && !validateShippingForm()) return;
    if (activeStep === 1 && !validatePaymentForm()) return;
    setActiveStep((prev) => prev + 1);
  };

  const handleBack = () => setActiveStep((prev) => prev - 1);

  const handleSubmit = async () => {
    try {
      // Create order object
      const order = {
        id: Date.now().toString(), // Unique order ID
        userId: localStorage.getItem('userId'),
        date: new Date().toISOString(),
        products: cartItems.map(item => ({
          productId: item.id,
          quantity: item.quantity,
          name: item.name,
          price: item.price,
          image: item.image
        })),
        total: calculateTotal(),
        status: 'pending',
        shippingAddress: shippingInfo,
        paymentMethod: paymentInfo.paymentMethod
      };

      // Add order to store
      addOrder(order);

      // Clear the cart
      clearCart();

      // Navigate to order confirmation page
      navigate('/orderconfirm', { state: { order } });
    } catch (error) {
      console.error('Error placing order:', error);
      // Handle error appropriately
    }
  };

  const renderShippingForm = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
            First Name
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={shippingInfo.firstName}
            onChange={handleShippingChange}
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
              errors.firstName ? 'border-red-500' : 'border-gray-200'
            }`}
            required
          />
          {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
        </div>
        <div className="space-y-2">
          <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
            Last Name
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={shippingInfo.lastName}
            onChange={handleShippingChange}
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
              errors.lastName ? 'border-red-500' : 'border-gray-200'
            }`}
            required
          />
          {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
        </div>
        <div className="space-y-2">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={shippingInfo.email}
            onChange={handleShippingChange}
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
              errors.email ? 'border-red-500' : 'border-gray-200'
            }`}
            required
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
        </div>
        <div className="space-y-2">
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
            Phone
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={shippingInfo.phone}
            onChange={handleShippingChange}
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
              errors.phone ? 'border-red-500' : 'border-gray-200'
            }`}
            required
          />
          {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
        </div>
      </div>
      
      <div className="space-y-2">
        <label htmlFor="address" className="block text-sm font-medium text-gray-700">
          Address
        </label>
        <input
          type="text"
          id="address"
          name="address"
          value={shippingInfo.address}
          onChange={handleShippingChange}
          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
            errors.address ? 'border-red-500' : 'border-gray-200'
          }`}
          required
        />
        {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="space-y-2">
          <label htmlFor="city" className="block text-sm font-medium text-gray-700">
            City
          </label>
          <input
            type="text"
            id="city"
            name="city"
            value={shippingInfo.city}
            onChange={handleShippingChange}
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
              errors.city ? 'border-red-500' : 'border-gray-200'
            }`}
            required
          />
          {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
        </div>
        <div className="space-y-2">
          <label htmlFor="state" className="block text-sm font-medium text-gray-700">
            State
          </label>
          <input
            type="text"
            id="state"
            name="state"
            value={shippingInfo.state}
            onChange={handleShippingChange}
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
              errors.state ? 'border-red-500' : 'border-gray-200'
            }`}
            required
          />
          {errors.state && <p className="text-red-500 text-sm mt-1">{errors.state}</p>}
        </div>
        <div className="space-y-2">
          <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700">
            ZIP Code
          </label>
          <input
            type="text"
            id="zipCode"
            name="zipCode"
            value={shippingInfo.zipCode}
            onChange={handleShippingChange}
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
              errors.zipCode ? 'border-red-500' : 'border-gray-200'
            }`}
            required
          />
          {errors.zipCode && <p className="text-red-500 text-sm mt-1">{errors.zipCode}</p>}
        </div>
      </div>
    </div>
  );

  const renderPaymentForm = () => (
    <div className="space-y-6">
      <div className="space-y-4">
        <label className="block text-sm font-medium text-gray-700">Payment Method</label>
        <div className="flex space-x-4">
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="radio"
              name="paymentMethod"
              value="credit"
              checked={paymentInfo.paymentMethod === 'credit'}
              onChange={handlePaymentChange}
              className="w-4 h-4 text-indigo-600 focus:ring-indigo-500"
            />
            <span>Credit Card</span>
          </label>
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="radio"
              name="paymentMethod"
              value="debit"
              checked={paymentInfo.paymentMethod === 'debit'}
              onChange={handlePaymentChange}
              className="w-4 h-4 text-indigo-600 focus:ring-indigo-500"
            />
            <span>Debit Card</span>
          </label>
        </div>
      </div>
  
      <div className="space-y-2">
        <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700">
          Card Number
        </label>
        <input
          type="text"
          id="cardNumber"
          name="cardNumber"
          value={paymentInfo.cardNumber}
          onChange={handlePaymentChange}
          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
            errors.cardNumber ? 'border-red-500' : 'border-gray-200'
          }`}
          required
        />
        {errors.cardNumber && <p className="text-red-500 text-sm mt-1">{errors.cardNumber}</p>}
      </div>
  
      <div className="space-y-2">
        <label htmlFor="cardName" className="block text-sm font-medium text-gray-700">
          Name on Card
        </label>
        <input
          type="text"
          id="cardName"
          name="cardName"
          value={paymentInfo.cardName}
          onChange={handlePaymentChange}
          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
            errors.cardName ? 'border-red-500' : 'border-gray-200'
          }`}
          required
        />
        {errors.cardName && <p className="text-red-500 text-sm mt-1">{errors.cardName}</p>}
      </div>
  
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700">
            Expiry Date (MM/YY)
          </label>
          <input
            type="text"
            id="expiryDate"
            name="expiryDate"
            value={paymentInfo.expiryDate}
            onChange={handlePaymentChange}
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
              errors.expiryDate ? 'border-red-500' : 'border-gray-200'
            }`}
            required
          />
          {errors.expiryDate && <p className="text-red-500 text-sm mt-1">{errors.expiryDate}</p>}
        </div>
        <div className="space-y-2">
          <label htmlFor="cvv" className="block text-sm font-medium text-gray-700">
            CVV
          </label>
          <input
            type="text"
            id="cvv"
            name="cvv"
            value={paymentInfo.cvv}
            onChange={handlePaymentChange}
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
              errors.cvv ? 'border-red-500' : 'border-gray-200'
            }`}
            required
          />
          {errors.cvv && <p className="text-red-500 text-sm mt-1">{errors.cvv}</p>}
        </div>
      </div>
    </div>
  );
  

  const renderOrderSummary = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900">Order Summary</h3>
      <div className="space-y-3">
        {cartItems.map((item) => (
          <div key={item.id} className="flex justify-between items-center py-2 border-b border-gray-200">
            <div>
              <p className="font-medium">{item.name}</p>
              <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
            </div>
            <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
          </div>
        ))}
        <div className="flex justify-between pt-2">
          <span className="text-gray-600">Subtotal</span>
          <span className="font-medium">${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Shipping</span>
          <span className="text-green-600">Free</span>
        </div>
        <div className="border-t border-gray-200 pt-3">
          <div className="flex justify-between">
            <span className="text-lg font-semibold">Total</span>
            <span className="text-lg font-semibold">${subtotal.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 md:px-8 max-w-[1400px]">
        <div className="max-w-[1200px] mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Checkout</h1>
            <div className="mt-4">
              <div className="flex items-center">
                {['Shipping', 'Payment', 'Review'].map((step, index) => (
                  <React.Fragment key={step}>
                    <div className="flex items-center">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          index <= activeStep
                            ? 'bg-indigo-600 text-white'
                            : 'bg-gray-200 text-gray-600'
                        }`}
                      >
                        {index + 1}
                      </div>
                      <span className="ml-2 text-sm font-medium text-gray-900">{step}</span>
                    </div>
                    {index < 2 && (
                      <div className="flex-1 mx-4">
                        <div className={`h-1 ${index < activeStep ? 'bg-indigo-600' : 'bg-gray-200'}`} />
                      </div>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 md:p-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                {activeStep === 0 && renderShippingForm()}
                {activeStep === 1 && renderPaymentForm()}
                {activeStep === 2 && (
                  <div className="space-y-6">
                    <h3 className="text-lg font-semibold">Review Your Order</h3>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-medium mb-2">Shipping Information</h4>
                      <p className="text-sm text-gray-600">
                        {shippingInfo.firstName} {shippingInfo.lastName}<br />
                        {shippingInfo.address}<br />
                        {shippingInfo.city}, {shippingInfo.state} {shippingInfo.zipCode}<br />
                        Phone : {shippingInfo.phone}
                      </p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-medium mb-2">Payment Information</h4>
                      <p className="text-sm text-gray-600">
                        {paymentInfo.paymentMethod === 'credit' ? 'Credit' : 'Debit'} xxxx xxxx xxxx {paymentInfo.cardNumber.slice(-4)}
                      </p>
                    </div>
                  </div>
                )}
              </div>
              <div className="lg:col-span-1">
                <div className="bg-gray-50 rounded-lg p-6 sticky top-6">
                  {renderOrderSummary()}
                </div>
              </div>
            </div>

            <div className="mt-8 flex justify-between">
              <button
                onClick={handleBack}
                disabled={activeStep === 0}
                className={`px-6 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors ${
                  activeStep === 0 ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                Back
              </button>
              <button
                onClick={activeStep === 2 ? handleSubmit : handleNext}
                className="px-6 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition-colors"
              >
                {activeStep === 2 ? 'Place Order' : 'Continue'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
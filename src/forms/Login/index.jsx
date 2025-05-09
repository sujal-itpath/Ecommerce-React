import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllUsers } from '../../api/userApi';

const Login = ({ onClose, isModal = false }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleBackgroundClick = (e) => {
    if (isModal && e.target.id === 'modal-background' && onClose) {
      onClose();
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError(''); // Clear error when user types
  };

  const generateToken = (userId) => {
    // Create a simple token with user ID and expiration
    const tokenData = {
      userId,
      exp: Date.now() + (24 * 60 * 60 * 1000) // 24 hours from now
    };
    // Convert to base64 string
    return btoa(JSON.stringify(tokenData));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Get all users from the API
      const response = await getAllUsers();
      
      // Check if response has the correct structure
      if (!response.data || !response.data.users || !Array.isArray(response.data.users)) {
        throw new Error('Invalid response format from server');
      }

      // Find user with matching email and password
      const user = response.data.users.find(
        u => u.email === formData.email && u.password === formData.password
      );

      if (user) {
        // Generate token
        const token = generateToken(user.id);
        
        // Store token and user info in localStorage
        localStorage.setItem('authToken', token);
        localStorage.setItem('userId', user.id);
        localStorage.setItem('userEmail', user.email);
        localStorage.setItem('userName', `${user.name.firstname} ${user.name.lastname}`);

        // Handle navigation based on whether it's a modal or page
        if (isModal && onClose) {
          onClose();
        }
        navigate('/');
        
        // Optional: Refresh the page to update auth state
        window.location.reload();
      } else {
        setError('Invalid email or password');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError(err.message || 'An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const renderLoginForm = () => (
    <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-sm relative animate-fade-in-down">
      {isModal && (
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-gray-500 hover:text-red-500 text-xl"
        >
          &times;
        </button>
      )}

      <h2 className="text-2xl font-bold mb-6 text-center text-purple-700">Login</h2>

      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 text-sm text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="you@example.com"
            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
            required
          />
        </div>
        <div>
          <label className="block mb-1 text-sm text-gray-700">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="••••••••"
            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
            required
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className={`w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition ${
            loading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {loading ? 'Signing in...' : 'Sign In'}
        </button>
      </form>
    </div>
  );

  // If it's a modal, wrap the form in a modal container
  if (isModal) {
    return (
      <div
        id="modal-background"
        onClick={handleBackgroundClick}
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      >
        {renderLoginForm()}
      </div>
    );
  }

  // If it's a page, just return the form
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      {renderLoginForm()}
    </div>
  );
};

export default Login;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllUsers } from '../../api/userApi';

const Login = ({ onClose, isModal = false }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleBackgroundClick = (e) => {
    if (isModal && e.target.id === 'modal-background' && onClose) {
      onClose();
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const generateToken = (userId) => {
    const tokenData = {
      userId,
      exp: Date.now() + 24 * 60 * 60 * 1000
    };
    return btoa(JSON.stringify(tokenData));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await getAllUsers();

      if (!response.data || !Array.isArray(response.data.users)) {
        throw new Error('Invalid response format from server');
      }

      const user = response.data.users.find(
        u => u.email === formData.email && u.password === formData.password
      );

      if (user) {
        const token = generateToken(user.id);
        localStorage.setItem('authToken', token);
        localStorage.setItem('userId', user.id);
        localStorage.setItem('userEmail', user.email);
        localStorage.setItem('userName', `${user.name.firstname} ${user.name.lastname}`);
        if (isModal && onClose) onClose();
        navigate('/');
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
    <div className="bg-white rounded-2xl shadow-2xl p-10 w-full max-w-md relative animate-fade-in-down">
      {isModal && (
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-gray-400 hover:text-pink-500 text-2xl transition duration-200"
        >
          &times;
        </button>
      )}

      <h2 className="text-3xl font-extrabold text-center mb-6 text-pink-600 tracking-wide">
        Welcome Back
      </h2>

      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-300 text-red-700 rounded-lg">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="you@example.com"
            className="w-full border border-pink-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-500"
            required
          />
        </div>
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="••••••••"
            className="w-full border border-pink-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-500"
            required
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className={`w-full bg-pink-500 text-white py-3 rounded-lg font-semibold hover:bg-pink-600 transition-all duration-200 ${
            loading ? 'opacity-60 cursor-not-allowed' : ''
          }`}
        >
          {loading ? 'Signing in...' : 'Sign In'}
        </button>
      </form>
    </div>
  );

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

  return (
    <div className="min-h-screen flex items-center justify-center bg-pink-50 py-12 px-4 sm:px-6 lg:px-8">
      {renderLoginForm()}
    </div>
  );
};

export default Login;

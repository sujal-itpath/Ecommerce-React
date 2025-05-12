import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-pink-50 px-4">
      <div className="text-center">
        <h1 className="text-7xl font-extrabold text-pink-500 mb-4">404</h1>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Page Not Found</h2>
        <p className="text-gray-600 mb-6">Sorry, the page you're looking for doesn’t exist or has been moved.</p>
        
        <Link
          to="/"
          className="inline-block bg-pink-500 text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-pink-600 transition"
        >
          Go to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;

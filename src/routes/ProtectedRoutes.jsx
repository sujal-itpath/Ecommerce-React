import { Navigate, Outlet } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { AlertCircle, X } from 'lucide-react';

const ProtectedRoutes = () => {
  const [showNotification, setShowNotification] = useState(false);
  const [shouldRedirect, setShouldRedirect] = useState(false);

  const isAuthenticated = () => {
    const token = localStorage.getItem('authToken');
    return !!token; // Returns true if token exists, false otherwise
  };

  useEffect(() => {
    if (!isAuthenticated()) {
      setShowNotification(true);
      // Wait for 5 seconds before redirecting
      const redirectTimer = setTimeout(() => {
        setShouldRedirect(true);
      }, 5000);
      return () => clearTimeout(redirectTimer);
    }
  }, []);

  const handleClose = () => {
    setShowNotification(false);
    setShouldRedirect(true);
  };

  if (!isAuthenticated()) {
    return (
      <>
        {showNotification && (
          <div className="fixed top-4 right-4 z-50 animate-slide-in">
            <div className="bg-white rounded-lg shadow-lg border border-pink-200 p-4 flex items-center gap-3 relative">
              <button 
                onClick={handleClose}
                className="absolute -top-2 -right-2 bg-white rounded-full p-1 shadow-md hover:bg-gray-50 transition-colors"
              >
                <X size={16} className="text-gray-500" />
              </button>
              <AlertCircle className="text-pink-500" size={20} />
              <div>
                <p className="text-sm font-medium text-gray-900">Please login first</p>
                <p className="text-xs text-gray-500">You need to be logged in to Perform this action</p>
              </div>
            </div>
          </div>
        )}
        {shouldRedirect && <Navigate to="/login" replace />}
      </>
    );
  }

  return <Outlet />;
};

export default ProtectedRoutes;

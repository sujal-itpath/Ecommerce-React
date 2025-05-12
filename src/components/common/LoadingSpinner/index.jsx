import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <div className="relative">
        <div className="w-12 h-12 rounded-full absolute border-4 border-pink-200"></div>
        <div className="w-12 h-12 rounded-full animate-spin absolute border-4 border-pink-500 border-t-transparent"></div>
      </div>
    </div>
  );
};

export default LoadingSpinner; 
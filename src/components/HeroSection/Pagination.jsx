import React from 'react';

const Pagination = ({ totalSlides, currentIndex, onPageChange }) => {
  return (
    <div className="flex justify-center items-center space-x-2 mt-6">
      {Array.from({ length: totalSlides }).map((_, index) => (
        <button
          key={index}
          onClick={() => onPageChange(index)}
          className={`h-2.5 rounded-full transition-all duration-300 focus:outline-none ${
            currentIndex === index 
              ? 'w-8 bg-pink-500' 
              : 'w-2.5 bg-gray-300 hover:bg-pink-300'
          }`}
          aria-label={`Go to slide ${index + 1}`}
        />
      ))}
    </div>
  );
};

export default Pagination;

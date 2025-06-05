import React from 'react';

const SortOptions = ({ value, onChange }) => {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="appearance-none w-40 px-4 py-2 border-2 border-purple-400 rounded-lg bg-white text-sm text-purple-800 font-medium shadow-sm hover:border-purple-500 focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all"
      >
        <option>Most Popular</option>
        <option>Newest</option>
        <option>Price: Low to High</option>
        <option>Price: High to Low</option>
      </select>

      {/* Custom dropdown arrow */}
      <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center text-purple-500">
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </div>
  );
};

export default SortOptions;

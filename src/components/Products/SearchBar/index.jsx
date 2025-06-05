import React from 'react';
import { Search } from 'lucide-react';

const SearchBar = ({ value, onChange }) => {
  return (
    <div className="relative w-full">
      <input
        type="text"
        placeholder="Search products..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="pl-10 pr-4 py-2 w-full rounded-lg border-2 border-purple-400 focus:border-purple-500 focus:ring-2 focus:ring-blue-300 transition-all outline-none bg-white shadow-sm text-purple-800"
      />
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-purple-500 h-5 w-5" />
    </div>
  );
};

export default SearchBar;

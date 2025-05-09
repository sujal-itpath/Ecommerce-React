import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Tag, DollarSign, Star, Sliders } from 'lucide-react';

const SidebarFilters = ({ onFilterChange, allProducts = [], selectedFilters }) => {
  const [filters, setFilters] = useState(selectedFilters || {
    brand: [],
    discount: [],
    rating: [],
    category: [],
    price: [0, 1000],
    color: [],
  });

  const debounceTimeoutRef = useRef(null);

  // Memoize the unique values to prevent unnecessary recalculations
  const { brands, categories, colors } = useMemo(() => {
    const unique = (array, key) => {
      if (!Array.isArray(array)) return [];
      const values = array
        .map(item => item[key])
        .filter(Boolean)
        .map(value => value.toString().toLowerCase());
      return [...new Set(values)];
    };

    return {
      brands: unique(allProducts, 'brand'),
      categories: unique(allProducts, 'category'),
      colors: unique(allProducts, 'color'),
    };
  }, [allProducts]);

  // Update local filters when selectedFilters prop changes
  useEffect(() => {
    if (selectedFilters) {
      setFilters(selectedFilters);
    }
  }, [selectedFilters]);

  const handleCheck = (filterName, value) => {
    setFilters(prev => {
      const values = prev[filterName];
      const valueToCheck = value.toString().toLowerCase();
      const updated = values.includes(valueToCheck)
        ? values.filter(v => v !== valueToCheck)
        : [...values, valueToCheck];
      return { ...prev, [filterName]: updated };
    });
  };

  const handlePriceChange = (idx, val) => {
    setFilters(prev => {
      const newPrice = [...prev.price];
      newPrice[idx] = parseFloat(val);
      return { ...prev, price: newPrice };
    });
  };

  const updateFilters = () => {
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }
    debounceTimeoutRef.current = setTimeout(() => {
      onFilterChange(filters);
    }, 300); // Reduced debounce time for better responsiveness
  };

  useEffect(() => {
    updateFilters();
    return () => {
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }
    };
  }, [filters]);

  const renderCheckboxList = (filterName, options) =>
    options.map(option => {
      const optionValue = option.toString().toLowerCase();
      return (
        <label
          key={option}
          className="flex items-center gap-2 px-3 py-1 rounded hover:bg-gray-100 text-gray-600"
        >
          <input
            type="checkbox"
            checked={filters[filterName].includes(optionValue)}
            onChange={() => handleCheck(filterName, option)}
            className="text-blue-500 focus:ring-blue-500 rounded"
          />
          <span className="text-sm capitalize">{option}</span>
        </label>
      );
    });

  return (
    <div className="space-y-6 text-sm">
      {/* Brand */}
      <div>
        <div className="flex items-center gap-2 mb-3 text-gray-800">
          <Tag className="w-4 h-4" />
          <h4 className="font-medium">Brand</h4>
        </div>
        <div className="space-y-1 max-h-40 overflow-y-auto">
          {renderCheckboxList('brand', brands)}
        </div>
      </div>

      {/* Discount */}
      <div className="pt-4 border-t border-gray-100">
        <div className="flex items-center gap-2 mb-3 text-gray-800">
          <Sliders className="w-4 h-4" />
          <h4 className="font-medium">Discount Offer</h4>
        </div>
        {['10', '20', '30', '50'].map(d => (
          <label
            key={d}
            className="flex items-center gap-2 px-3 py-1 rounded hover:bg-gray-100 text-gray-600"
          >
            <input
              type="checkbox"
              checked={filters.discount.includes(d)}
              onChange={() => handleCheck('discount', d)}
              className="text-blue-500 rounded"
            />
            <span>{d}% & up</span>
          </label>
        ))}
      </div>

      {/* Rating */}
      <div className="pt-4 border-t border-gray-100">
        <div className="flex items-center gap-2 mb-3 text-gray-800">
          <Star className="w-4 h-4" />
          <h4 className="font-medium">Rating</h4>
        </div>
        {[1, 2, 3, 4, 5].map(r => (
          <label
            key={r}
            className="flex items-center gap-2 px-3 py-1 rounded hover:bg-gray-100 text-gray-600"
          >
            <input
              type="checkbox"
              checked={filters.rating.includes(String(r))}
              onChange={() => handleCheck('rating', String(r))}
              className="text-yellow-500 rounded"
            />
            <span>{r} Star</span>
          </label>
        ))}
      </div>

      {/* Category */}
      <div className="pt-4 border-t border-gray-100">
        <div className="flex items-center gap-2 mb-3 text-gray-800">
          <Tag className="w-4 h-4" />
          <h4 className="font-medium">Categories</h4>
        </div>
        <div className="space-y-1 max-h-40 overflow-y-auto">
          {renderCheckboxList('category', categories)}
        </div>
      </div>

      {/* Price */}
      <div className="pt-4 border-t border-gray-100">
        <div className="flex items-center gap-2 mb-3 text-gray-800">
          <DollarSign className="w-4 h-4" />
          <h4 className="font-medium">Price Range</h4>
        </div>
        <div className="space-y-2">
          <div className="flex justify-between text-xs text-gray-500 mb-1">
            <span>₹{filters.price[0]}</span>
            <span>₹{filters.price[1]}</span>
          </div>
          <input
            type="range"
            min="0"
            max="1000"
            value={filters.price[0]}
            onChange={e => handlePriceChange(0, e.target.value)}
            className="w-full accent-blue-500"
          />
          <input
            type="range"
            min="0"
            max="1000"
            value={filters.price[1]}
            onChange={e => handlePriceChange(1, e.target.value)}
            className="w-full accent-blue-500"
          />
        </div>
      </div>

      {/* Color */}
      <div className="pt-4 border-t border-gray-100">
        <div className="flex items-center gap-2 mb-3 text-gray-800">
          <Sliders className="w-4 h-4" />
          <h4 className="font-medium">Filter by Color</h4>
        </div>
        <div className="flex gap-3 flex-wrap">
          {colors.map(clr => (
            <button
              key={clr}
              onClick={() => handleCheck('color', clr)}
              className={`rounded-full w-6 h-6 border-2 transition-all duration-200 ${
                filters.color.includes(clr.toLowerCase()) ? 'ring-2 ring-offset-1 ring-black' : ''
              }`}
              style={{ backgroundColor: clr }}
              title={clr}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SidebarFilters;

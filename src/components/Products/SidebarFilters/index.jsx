import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Tag, DollarSign, Star, Sliders, Percent } from 'lucide-react';

// Maps user-friendly names to valid CSS colors
const colorMap = {
  "burgundy": "#800020",
  "steel blue": "steelblue",
  "smoky teal": "#5f9ea0",
  "deep purple": "#673ab7",
  "golden": "gold",
  "noir black": "#0a0a0a",
  "meteorite black": "#1c1c1c",
  "aqua green": "#00ffcc",
  "matte black": "#2b2b2b",
  "taupe": "#483c32",
  "dark steel silver": "#708090",
 "sand gold": "#cba135"
};

// Check if a color is valid CSS color
const isValidColor = (color) => {
  const s = new Option().style;
  s.color = '';
  s.color = color;
  return s.color !== '';
};

// Color button with fallback text
const ColorBadge = ({ color, selected, onClick }) => {
  const normalized = color.toLowerCase().trim();
  const renderColor = colorMap[normalized] || normalized;
  const isColorValid = isValidColor(renderColor);

  return (
    <button
      onClick={onClick}
      className={`flex items-center justify-center w-8 h-8 rounded-full border shadow-sm transition-all duration-200 ${
        selected ? 'ring-2 ring-offset-2 ring-blue-600 scale-110' : ''
      }`}
      title={color}
      style={isColorValid ? { backgroundColor: renderColor } : {}}
    >
      {!isColorValid && (
        <span className="text-[10px] text-gray-700 font-medium capitalize px-1">
          {color}
        </span>
      )}
    </button>
  );
};

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

  const { uniqueBrands, uniqueCategories, uniqueColors } = useMemo(() => {
    const unique = (array, key) => {
      if (!Array.isArray(array)) return [];
      const values = array
        .map(item => item[key])
        .filter(Boolean)
        .map(value => value.toString().toLowerCase());
      return [...new Set(values)];
    };

    return {
      uniqueBrands: unique(allProducts, 'brand'),
      uniqueCategories: unique(allProducts, 'category'),
      uniqueColors: unique(allProducts, 'color'),
    };
  }, [allProducts]);

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
    }, 300);
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
    <div className="space-y-6 text-sm p-4 bg-white rounded-lg shadow-md border">
      {/* Brand */}
      <div>
        <div className="flex items-center gap-2 mb-3 text-gray-800">
          <Tag className="w-4 h-4" />
          <h4 className="font-medium">Brand</h4>
        </div>
        <div className="space-y-1 max-h-40 overflow-y-auto">
          {renderCheckboxList('brand', uniqueBrands)}
        </div>
      </div>

      {/* Discount */}
      <div className="pt-4 border-t border-gray-100">
        <div className="flex items-center gap-2 mb-3 text-gray-800">
          <Percent className="w-4 h-4" />
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
          {renderCheckboxList('category', uniqueCategories)}
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
        <div className="flex gap-2 flex-wrap">
          {uniqueColors.map(color => {
            const normalizedColor = color.toLowerCase();
            return (
              <ColorBadge
                key={color}
                color={normalizedColor}
                selected={filters.color.includes(normalizedColor)}
                onClick={() => handleCheck('color', normalizedColor)}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SidebarFilters;

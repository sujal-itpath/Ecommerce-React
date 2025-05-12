import React from 'react';

export const NavLink = ({ href, children, isActive }) => {
  return (
    <a 
      href={href} 
      className={`relative font-medium transition-colors duration-200 
        ${isActive 
          ? 'text-pink-500' 
          : 'text-gray-800 hover:text-pink-500'
        }
      `}
    >
      {children}
      {isActive && (
        <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-pink-500 rounded-full"></span>
      )}
    </a>
  );
};

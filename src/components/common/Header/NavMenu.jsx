import React from "react";
import { NavLink } from "./NavLink";

export const NavMenu = ({ isMobile = false }) => {
  const baseStyle = isMobile ? "text-base" : "text-sm font-medium text-gray-700 hover:text-purple-600 transition";

  return (
    <>
      <NavLink href="/" className={baseStyle}>Home</NavLink>
      <NavLink href="/products" className={baseStyle}>Products</NavLink>
      <NavLink href="/about" className={baseStyle}>About</NavLink>
      <NavLink href="/orders" className={baseStyle}>Order</NavLink>
      <NavLink href="/faq" className={baseStyle}>FAQ</NavLink>
    </>
  );
};

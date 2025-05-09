import React, { useEffect, useState } from 'react';
import { useLocation, Link, useParams } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import axios from 'axios';
import { API_BASE_URL, PRODUCT_API_PATHS } from '../../constants/apiConstants';

const Breadcrumb = () => {
  const location = useLocation();
  const { id } = useParams();
  const [productTitle, setProductTitle] = useState('');
  const pathnames = location.pathname.split('/').filter((x) => x);

  // Fetch product title if we're on a product detail page
  useEffect(() => {
    const fetchProductTitle = async () => {
      if (location.pathname.includes('/products/') && id) {
        try {
          const response = await axios.get(`${API_BASE_URL}${PRODUCT_API_PATHS.all}/${id}`);
          setProductTitle(response.data.title || 'Product Details');
        } catch (error) {
          console.error('Error fetching product title:', error);
          setProductTitle('Product Details');
        }
      }
    };

    fetchProductTitle();
  }, [id, location.pathname]);

  // ⛔️ Don't show breadcrumb on homepage
  if (location.pathname === '/') return null;

  const currentPage = pathnames.length
    ? location.pathname.includes('/products/') && id
      ? productTitle
      : decodeURIComponent(pathnames[pathnames.length - 1].replace(/-/g, ' '))
    : '';

  const generateBreadcrumbs = () => {
    const crumbs = [
      <Link key="home" to="/" className="text-gray-600 hover:text-blue-600 font-medium">
        Home
      </Link>,
    ];

    pathnames.forEach((value, index) => {
      const to = `/${pathnames.slice(0, index + 1).join('/')}`;
      const isLast = index === pathnames.length - 1;
      let displayValue = value;

      // If this is the product ID in the URL, use the product title instead
      if (location.pathname.includes('/products/') && isLast && id) {
        displayValue = productTitle || 'Product Details';
      } else {
        displayValue = decodeURIComponent(value.replace(/-/g, ' '));
      }

      crumbs.push(
        <ChevronRight key={`icon-${to}`} className="w-4 h-4 text-gray-400 mx-1" />,
        isLast ? (
          <span key={to} className="text-blue-700 font-semibold capitalize">
            {displayValue}
          </span>
        ) : (
          <Link
            key={to}
            to={to}
            className="text-gray-600 hover:text-blue-600 capitalize font-medium"
          >
            {displayValue}
          </Link>
        )
      );
    });

    return crumbs;
  };

  return (
    <div className="bg-gradient-to-r from-[#f6f5fb] to-white py-6 border-b border-blue-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 flex flex-col gap-1">
        <h1 className="text-3xl font-bold text-slate-800 tracking-tight capitalize">
          {currentPage}
        </h1>
        <div className="flex items-center text-sm">{generateBreadcrumbs()}</div>
      </div>
    </div>
  );
};

export default Breadcrumb;

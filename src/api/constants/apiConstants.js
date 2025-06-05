// src/constants/apiConstants.js

export const API_BASE_URL = 'https://fakestoreapi.in/api';

export const PRODUCT_API_PATHS = {
  all: '/products',
  byId: (id) => `/products/${id}`,
  categories: '/products/category',
  byCategory: (categoryName) => `/products/category/${categoryName}`,
  paginated: (page, limit) => `/products?page=${page}&limit=${limit}`,
};

export const USER_API_PATHS = {
  all: '/users',
  byId: (id) => `/users/${id}`,
};

export const CART_API_PATHS = {
  all: '/carts',
  byId: (id) => `/carts/${id}`,
};

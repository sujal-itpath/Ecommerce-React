import axiosInstance from './axiosInstance';
import { PRODUCT_API_PATHS } from '../constants/apiConstants';

export const getAllProducts = () => axiosInstance.get(PRODUCT_API_PATHS.all);

export const getProductById = (id) => axiosInstance.get(PRODUCT_API_PATHS.byId(id));

export const getAllCategories = () => axiosInstance.get(PRODUCT_API_PATHS.categories);

export const getProductsByCategory = (category) =>
  axiosInstance.get(PRODUCT_API_PATHS.byCategory(category));

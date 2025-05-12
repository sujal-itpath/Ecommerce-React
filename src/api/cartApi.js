import axiosInstance from './axiosInstance';
import { CART_API_PATHS } from './constants/apiConstants';

export const getAllCarts = () => axiosInstance.get(CART_API_PATHS.all);

export const getCartById = (id) => axiosInstance.get(CART_API_PATHS.byId(id));

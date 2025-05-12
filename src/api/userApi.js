import axiosInstance from './axiosInstance';
import { USER_API_PATHS } from './constants/apiConstants';

export const getAllUsers = () => axiosInstance.get(USER_API_PATHS.all);

export const getUserById = (id) => axiosInstance.get(USER_API_PATHS.byId(id));

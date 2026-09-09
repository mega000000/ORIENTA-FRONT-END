import axiosInstance from './axiosInstance';

export const login = async (email, password) => {
  const response = await axiosInstance.post('/auth/login', { email, password });
  return response.data;
};

export const register = async (fullName, email, password, role) => {
  const response = await axiosInstance.post('/auth/register', { fullName, email, password, role });
  return response.data;
};
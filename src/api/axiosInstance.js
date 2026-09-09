import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8081/api',
});

axiosInstance.interceptors.request.use((config) => {
  const isAuthEndpoint = config.url.includes('/auth/login') || config.url.includes('/auth/register');

  if (!isAuthEndpoint) {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }

  return config;
});

export default axiosInstance;
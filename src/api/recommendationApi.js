import axiosInstance from './axiosInstance';

export const generateRecommendations = async (sessionId) => {
  const response = await axiosInstance.post(`/recommendations/generate/${sessionId}`);
  return response.data;
};

export const getLatestRecommendations = async () => {
  const response = await axiosInstance.get('/recommendations/latest');
  return response.data;
};
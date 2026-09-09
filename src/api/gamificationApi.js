import axiosInstance from './axiosInstance';

export const getMyGamification = async () => {
  const response = await axiosInstance.get('/gamification/me');
  return response.data;
};

export const startUserPath = async (pathId) => {
  const response = await axiosInstance.post(`/user-paths/${pathId}`);
  return response.data;
};

export const completeUserStep = async (userPathId, stepId) => {
  const response = await axiosInstance.patch(`/user-paths/${userPathId}/steps/${stepId}`);
  return response.data;
};
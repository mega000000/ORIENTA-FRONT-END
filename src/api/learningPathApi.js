import axiosInstance from './axiosInstance';

export const getLearningPathsBySpecialty = async (specialtyId) => {
  const response = await axiosInstance.get(`/specialties/${specialtyId}/learning-paths`);
  return response.data;
};

export const getLearningPathById = async (pathId) => {
  const response = await axiosInstance.get(`/learning-paths/${pathId}`);
  return response.data;
};
import axiosInstance from './axiosInstance';

export const getUserSpecialty = async () => {
  const response = await axiosInstance.get('/user/specialty');
  return response.data;
};

export const getAllSpecialties = async () => {
  const response = await axiosInstance.get('/specialties');
  return response.data;
};

export const searchSpecialties = async (keyword) => {
  const response = await axiosInstance.get('/specialties/search', {
    params: { keyword },
  });
  return response.data;
};

export const getSpecialtyById = async (id) => {
  const response = await axiosInstance.get(`/specialties/${id}`);
  return response.data;
};

export const assignUserSpecialty = async (specialtyId) => {
  const response = await axiosInstance.post(`/user/specialty/${specialtyId}`);
  return response.data;
};
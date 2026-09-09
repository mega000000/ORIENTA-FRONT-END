import axiosInstance from './axiosInstance';

export const submitOnboarding = async (studyLevel, weeklyAvailableHours, objective) => {
  const response = await axiosInstance.post('/onboarding', {
    studyLevel,
    weeklyAvailableHours,
    objective,
  });
  return response.data;
};
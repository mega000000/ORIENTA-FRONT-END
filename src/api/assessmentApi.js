import axiosInstance from './axiosInstance';

export const getQuestionnaire = async (type) => {
  const response = await axiosInstance.get(`/questionnaire/${type}`);
  return response.data;
};

export const startSession = async (type) => {
  const response = await axiosInstance.post(`/assessments/start/${type}`);
  return response.data;
};

export const submitAnswers = async (sessionId, answers) => {
  const response = await axiosInstance.post(`/assessments/${sessionId}/submit`, answers);
  return response.data;
};

export const getResult = async (sessionId) => {
  const response = await axiosInstance.get(`/assessments/${sessionId}/result`);
  return response.data;
};
import axiosClient from '../services/axiosAPIClient';

// Configure params
const apiVersionUrl = '/api/v1';

export const getAllExperiences = async () => {
  const url = `${apiVersionUrl}/experiences`;
  return await axiosClient.get(url);
};

export const getAllExperiencesForHostAndAdmin = async ({hosted = ''}) => {
  const {token} = JSON.parse(localStorage.getItem('userInfo'));
  const headers = {Authorization: `Bearer ${token}`};

  const url = `${apiVersionUrl}/experiences/?hosted=${hosted}`;
  return await axiosClient.get(url, {headers});
};

export const getDetailsExperienceById = async (experienceId) => {
  const {token} = JSON.parse(localStorage.getItem('userInfo'));
  const headers = {Authorization: `Bearer ${token}`};

  const url = `${apiVersionUrl}/experiences/${experienceId}`;
  return await axiosClient.get(url, {headers});
};

export const createExperience = async (experience) => {
  const {token} = JSON.parse(localStorage.getItem('userInfo'));
  const headers = {Authorization: `Bearer ${token}`};

  const url = `${apiVersionUrl}/experiences/create`;
  return await axiosClient.post(url, experience, {headers});
};

export const updateExperience = async (experience) => {
  const {token} = JSON.parse(localStorage.getItem('userInfo'));
  const headers = {Authorization: `Bearer ${token}`};

  const url = `${apiVersionUrl}/experiences/update`;
  return await axiosClient.post(url, experience, {headers});
};

export const deleteExperience = async (experienceId) => {
  const {token} = JSON.parse(localStorage.getItem('userInfo'));
  const headers = {Authorization: `Bearer ${token}`};

  const url = `${apiVersionUrl}/experiences/delete/${experienceId}`;
  return await axiosClient.delete(url, {headers});
};

export const getCategoriesListExperience = () => {
  return 'detailsExperience';
};

export const createReviewExperience = () => {
  return 'detailsExperience';
};

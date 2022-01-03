import axiosClient from '../services/axiosAPIClient';

// Configure params
const apiVersionUrl = '/api/v1';

export const uploadFileProfile = async (file) => {
  console.log('file', file);
  const {token} = JSON.parse(localStorage.getItem('userInfo'));
  const headers = {Authorization: `Bearer ${token}`};

  const url = `${apiVersionUrl}/upload/file-profile`;
  const data = await axiosClient.post(url, file, {headers});

  return data;
};

export const uploadFile = async (file) => {
  const {token} = JSON.parse(localStorage.getItem('userInfo'));
  const headers = {Authorization: `Bearer ${token}`};

  const url = `${apiVersionUrl}/upload/file`;
  const data = await axiosClient.post(url, file, {headers});

  return data;
};

// Configure params
const apiVersionUrl = '/api/v1';

export const signUpUser = async (firstName, lastName, email, password) => {
  const url = `${apiVersionUrl}/users/signup`;
  const data = await axiosClient.post(url, {firstName, lastName, email, password});

  //Save local storage
  // localStorage.setItem('userInfo', JSON.stringify(data.result));
  return data;
};

export const signInUser = async (email, password, remenberme) => {
  const url = `${apiVersionUrl}/users/signin`;
  const data = await axiosClient.post(url, {email, password});

  //Save local storage
  // localStorage.setItem('userInfo', JSON.stringify(data.userInfo));
  return data;
};

export const getAllUsers = async () => {
  const {token} = JSON.parse(localStorage.getItem('userInfo'));
  const headers = {Authorization: `Bearer ${token}`};

  const url = `${apiVersionUrl}/users`;
  return await axiosClient.get(url, {headers});
};

export const getOneUserForId = async (userId) => {
  console.log('GetOneUserForId: ', userId);
  const {token} = JSON.parse(localStorage.getItem('userInfo'));
  const headers = {Authorization: `Bearer ${token}`};

  const url = `${apiVersionUrl}/users/${userId}`;
  return await axiosClient.get(url);
};

export const updateHostProfileFromUser = async (user) => {
  const {token} = JSON.parse(localStorage.getItem('userInfo'));
  const headers = {Authorization: `Bearer ${token}`};

  const url = `${apiVersionUrl}/users/update/profile/host/${user._id}`;
  const {userInfo} = await axiosClient.put(url, user, {headers});
  return userInfo;
};

export const updateUserProfileFromUser = async (user) => {
  const {token} = JSON.parse(localStorage.getItem('userInfo'));
  const headers = {Authorization: `Bearer ${token}`};

  const url = `${apiVersionUrl}/users/update/profile/${user._id}`;
  const {userInfo} = await axiosClient.put(url, user, {headers});

  localStorage.setItem('userInfo', JSON.stringify(userInfo));

  return userInfo;
};

export const updateUser = async (user) => {
  const {token} = JSON.parse(localStorage.getItem('userInfo'));
  const headers = {Authorization: `Bearer ${token}`};

  const url = `${apiVersionUrl}/users/update/${user._id}`;
  return await axiosClient.put(url, user, {headers});
};

export const deleteUser = async (userId) => {
  const {token} = JSON.parse(localStorage.getItem('userInfo'));
  const headers = {Authorization: `Bearer ${token}`};

  const url = `${apiVersionUrl}/users/delete/${userId}`;
  return await axiosClient.delete(url, {headers});
};

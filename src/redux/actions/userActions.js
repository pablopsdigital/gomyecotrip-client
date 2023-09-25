import Axios from 'axios';

import {
  USER_CREATE_FAIL,
  USER_CREATE_REQUEST,
  USER_CREATE_SUCCESS,
  USER_DELETE_FAIL,
  USER_DELETE_REQUEST,
  USER_DELETE_SUCCESS,
  USER_DETAILS_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_LIST_FAIL,
  USER_LIST_REQUEST,
  USER_LIST_SUCCESS,
  USER_SIGNIN_FAIL,
  USER_SIGNIN_REQUEST,
  USER_SIGNIN_SUCCESS,
  USER_SIGNOUT,
  USER_SIGNUP_FAIL,
  USER_SIGNUP_REQUEST,
  USER_SIGNUP_SUCCESS,
  USER_UPDATE_FAIL,
  USER_UPDATE_PROFILE_FAIL,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_SUCCESS,
  USER_UPDATE_SUCCESS
} from '../constants/userConstants';

export const signup = (firstName, lastName, email, password) => async (dispatch) => {
  dispatch({type: USER_SIGNUP_REQUEST, payload: {email, password}});
  try {
    const {data} = await Axios.post('/api/v1/users/signup', {
      firstName,
      lastName,
      email,
      password
    });
    //Save in local storage
    localStorage.setItem('userInfo', JSON.stringify(data.result));
    //Dispatch
    dispatch({type: USER_SIGNUP_SUCCESS, payload: data.result});
  } catch (error) {
    dispatch({
      type: USER_SIGNUP_FAIL,
      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message
    });
  }
};

export const signin = (email, password) => async (dispatch) => {
  dispatch({type: USER_SIGNIN_REQUEST, payload: {email, password}});
  try {
    const {data} = await Axios.post('/api/v1/users/signin', {
      email,
      password
    });
    //Save local storage
    localStorage.setItem('userInfo', JSON.stringify(data));
    //Dispatch
    dispatch({type: USER_SIGNIN_SUCCESS, payload: data});
  } catch (error) {
    dispatch({
      type: USER_SIGNIN_FAIL,
      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message
    });
  }
};

export const signout = () => (dispatch) => {
  localStorage.removeItem('userInfo');
  dispatch({type: USER_SIGNOUT});
  document.location.href = '/signin';
};

export const detailsUser = (userId) => async (dispatch, getState) => {
  dispatch({type: USER_DETAILS_REQUEST, payload: userId});
  const {
    userSignin: {userInfo}
  } = getState();

  try {
    const {data} = await Axios.get(`/api/v1/users/${userId}`, {
      headers: {Authorization: `Bearer ${userInfo.token}`}
    });
    dispatch({type: USER_DETAILS_SUCCESS, payload: data});
  } catch (error) {
    const message =
      error.response && error.response.data.message ? error.response.data.message : error.message;
    dispatch({type: USER_DETAILS_FAIL, payload: message});
  }
};

export const updateUserProfile = (user) => async (dispatch, getState) => {
  dispatch({type: USER_UPDATE_PROFILE_REQUEST, payload: user});
  const {
    userSignin: {userInfo}
  } = getState();
  try {
    const {data} = await Axios.put(`/api/v1/users/profile`, user, {
      headers: {Authorization: `Bearer ${userInfo.token}`}
    });
    dispatch({type: USER_UPDATE_PROFILE_SUCCESS, payload: data});
    dispatch({type: USER_SIGNIN_SUCCESS, payload: data});
    localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (error) {
    const message =
      error.response && error.response.data.message ? error.response.data.message : error.message;
    dispatch({type: USER_UPDATE_PROFILE_FAIL, payload: message});
  }
};

export const updateUser = (user) => async (dispatch, getState) => {
  dispatch({type: USER_UPDATE_PROFILE_REQUEST, payload: user});
  const {
    userSignin: {userInfo}
  } = getState();
  try {
    const {data} = await Axios.put(`/api/v1/users/${user._id}`, user, {
      headers: {Authorization: `Bearer ${userInfo.token}`}
    });
    dispatch({type: USER_UPDATE_SUCCESS, payload: data});
  } catch (error) {
    const message =
      error.response && error.response.data.message ? error.response.data.message : error.message;
    dispatch({type: USER_UPDATE_FAIL, payload: message});
  }
};

export const listUsers = () => async (dispatch, getState) => {
  dispatch({type: USER_LIST_REQUEST});
  try {
    const {
      userSignin: {userInfo}
    } = getState();
    const {data} = await Axios.get('/api/v1/users', {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    });
    dispatch({type: USER_LIST_SUCCESS, payload: data});
  } catch (error) {
    const message =
      error.response && error.response.data.message ? error.response.data.message : error.message;
    dispatch({type: USER_LIST_FAIL, payload: message});
  }
};

export const deleteUser = (userId) => async (dispatch, getState) => {
  dispatch({type: USER_DELETE_REQUEST, payload: userId});
  const {
    userSignin: {userInfo}
  } = getState();
  try {
    const {data} = await Axios.delete(`/api/v1/users/${userId}`, {
      headers: {Authorization: `Bearer ${userInfo.token}`}
    });
    dispatch({type: USER_DELETE_SUCCESS, payload: data});
  } catch (error) {
    const message =
      error.response && error.response.data.message ? error.response.data.message : error.message;
    dispatch({type: USER_DELETE_FAIL, payload: message});
  }
};

export const createUser = () => async (dispatch, getState) => {
  dispatch({type: USER_CREATE_REQUEST});
  const {
    userSignin: {userInfo}
  } = getState();
  try {
    const {data} = await Axios.post(
      '/api/v1/users',
      {},
      {
        headers: {Authorization: `Bearer ${userInfo.token}`}
      }
    );
    dispatch({
      type: USER_CREATE_SUCCESS,
      payload: data.user
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message ? error.response.data.message : error.message;
    dispatch({type: USER_CREATE_FAIL, payload: message});
  }
};

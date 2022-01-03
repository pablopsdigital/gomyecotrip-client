import Axios from 'axios';
import {
  EXPERIENCE_LIST_FAIL,
  EXPERIENCE_LIST_REQUEST,
  EXPERIENCE_LIST_SUCCESS,
  EXPERIENCE_DETAILS_REQUEST,
  EXPERIENCE_DETAILS_SUCCESS,
  EXPERIENCE_DETAILS_FAIL,
  EXPERIENCE_CREATE_FAIL,
  EXPERIENCE_CREATE_REQUEST,
  EXPERIENCE_CREATE_SUCCESS,
  EXPERIENCE_UPDATE_REQUEST,
  EXPERIENCE_UPDATE_SUCCESS,
  EXPERIENCE_UPDATE_FAIL,
  EXPERIENCE_DELETE_REQUEST,
  EXPERIENCE_DELETE_FAIL,
  EXPERIENCE_DELETE_SUCCESS,
  EXPERIENCE_CATEGORY_LIST_SUCCESS,
  EXPERIENCE_CATEGORY_LIST_REQUEST,
  EXPERIENCE_CATEGORY_LIST_FAIL,
} from '../constants/experienceConstants';

//EXPERIENCE LIST
export const getListExperiences =
  ({ hosted = '', name = '', category = '' }) =>
  async (dispatch) => {
    dispatch({
      type: EXPERIENCE_LIST_REQUEST,
    });
    try {
      const { data } = await Axios.get(
        `/api/v1/experiences?hosted=${hosted}&name=${name}&category=${category}`
      );
      dispatch({ type: EXPERIENCE_LIST_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: EXPERIENCE_LIST_FAIL, payload: error.message });
    }
  };

//EXPERIENCE DETAILS
export const detailsExperience = (experienceId) => async (dispatch) => {
  dispatch({ type: EXPERIENCE_DETAILS_REQUEST, payload: experienceId });
  try {
    const { data } = await Axios.get(`/api/v1/experiences/${experienceId}`);
    dispatch({ type: EXPERIENCE_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: EXPERIENCE_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createExperience = () => async (dispatch, getState) => {
  dispatch({ type: EXPERIENCE_CREATE_REQUEST });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.post(
      '/api/v1/experiences',
      {},
      {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      }
    );
    dispatch({
      type: EXPERIENCE_CREATE_SUCCESS,
      payload: data.experience,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: EXPERIENCE_CREATE_FAIL, payload: message });
  }
};

export const updateExperience = (experience) => async (dispatch, getState) => {
  dispatch({ type: EXPERIENCE_UPDATE_REQUEST, payload: experience });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.put(
      `/api/v1/experiences/${experience._id}`,
      experience,
      {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      }
    );
    dispatch({ type: EXPERIENCE_UPDATE_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: EXPERIENCE_UPDATE_FAIL, error: message });
  }
};

export const deleteExperience =
  (experienceId) => async (dispatch, getState) => {
    dispatch({ type: EXPERIENCE_DELETE_REQUEST, payload: experienceId });
    const {
      userSignin: { userInfo },
    } = getState();
    try {
      const { data } = Axios.delete(`/api/v1/experiences/${experienceId}`, {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      });
      dispatch({ type: EXPERIENCE_DELETE_SUCCESS });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({ type: EXPERIENCE_DELETE_FAIL, payload: message });
    }
  };

export const listExperienceCategories = () => async (dispatch) => {
  dispatch({
    type: EXPERIENCE_CATEGORY_LIST_REQUEST,
  });
  try {
    const { data } = await Axios.get(`/api/v1/experiences/categories`);
    dispatch({ type: EXPERIENCE_CATEGORY_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: EXPERIENCE_CATEGORY_LIST_FAIL, payload: error.message });
  }
};

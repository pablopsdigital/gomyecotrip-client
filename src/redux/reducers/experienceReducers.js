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
  EXPERIENCE_CREATE_RESET,
  EXPERIENCE_UPDATE_REQUEST,
  EXPERIENCE_UPDATE_SUCCESS,
  EXPERIENCE_UPDATE_FAIL,
  EXPERIENCE_UPDATE_RESET,
  EXPERIENCE_DELETE_REQUEST,
  EXPERIENCE_DELETE_FAIL,
  EXPERIENCE_DELETE_SUCCESS,
  EXPERIENCE_DELETE_RESET,
  EXPERIENCE_CATEGORY_LIST_REQUEST,
  EXPERIENCE_CATEGORY_LIST_SUCCESS,
  EXPERIENCE_CATEGORY_LIST_FAIL,
} from '../constants/experienceConstants';

export const experienceListReducer = (
  state = { loading: true, experiences: [] },
  action
) => {
  switch (action.type) {
    case EXPERIENCE_LIST_REQUEST:
      return { loading: true };
    case EXPERIENCE_LIST_SUCCESS:
      return { loading: false, experiences: action.payload };
    case EXPERIENCE_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const experienceDetailsReducer = (state = { loading: true }, action) => {
  switch (action.type) {
    case EXPERIENCE_DETAILS_REQUEST:
      return { loading: true };
    case EXPERIENCE_DETAILS_SUCCESS:
      return { loading: false, experience: action.payload };
    case EXPERIENCE_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const experienceCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case EXPERIENCE_CREATE_REQUEST:
      return { loading: true };
    case EXPERIENCE_CREATE_SUCCESS:
      return { loading: false, success: true, experience: action.payload };
    case EXPERIENCE_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case EXPERIENCE_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const experienceUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case EXPERIENCE_UPDATE_REQUEST:
      return { loading: true };
    case EXPERIENCE_UPDATE_SUCCESS:
      return { loading: false, success: true };
    case EXPERIENCE_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case EXPERIENCE_UPDATE_RESET:
      return {};
    default:
      return state;
  }
};

export const experienceDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case EXPERIENCE_DELETE_REQUEST:
      return { loading: true };
    case EXPERIENCE_DELETE_SUCCESS:
      return { loading: false, success: true };
    case EXPERIENCE_DELETE_FAIL:
      return { loading: false, error: action.payload };
    case EXPERIENCE_DELETE_RESET:
      return {};
    default:
      return state;
  }
};

export const experienceCategoryListReducer = (
  state = { loading: true, experiences: [] },
  action
) => {
  switch (action.type) {
    case EXPERIENCE_CATEGORY_LIST_REQUEST:
      return { loading: true };
    case EXPERIENCE_CATEGORY_LIST_SUCCESS:
      return { loading: false, categories: action.payload };
    case EXPERIENCE_CATEGORY_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

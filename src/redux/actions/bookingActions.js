import Axios from 'axios';
import { CHECKOUT_EMPTY } from '../constants/checkoutConstants';
import {
  BOOKING_CREATE_FAIL,
  BOOKING_CREATE_REQUEST,
  BOOKING_CREATE_SUCCESS,
  BOOKING_DETAILS_FAIL,
  BOOKING_DETAILS_REQUEST,
  BOOKING_DETAILS_SUCCESS,
  BOOKING_PAY_REQUEST,
  BOOKING_PAY_SUCCESS,
  BOOKING_PAY_FAIL,
  BOOKING_MINE_LIST_REQUEST,
  BOOKING_MINE_LIST_FAIL,
  BOOKING_MINE_LIST_SUCCESS,
  BOOKING_LIST_REQUEST,
  BOOKING_LIST_SUCCESS,
  BOOKING_LIST_FAIL,
  BOOKING_DELETE_REQUEST,
  BOOKING_DELETE_SUCCESS,
  BOOKING_DELETE_FAIL,
  BOOKING_DELIVER_REQUEST,
  BOOKING_DELIVER_SUCCESS,
  BOOKING_DELIVER_FAIL,
} from '../constants/bookingConstants';

export const createBooking = (booking) => async (dispatch, getState) => {
  dispatch({ type: BOOKING_CREATE_REQUEST, payload: booking });
  try {
    const {
      userSignin: { userInfo },
    } = getState();
    const { data } = await Axios.post('/api/v1/bookings', booking, {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });
    dispatch({ type: BOOKING_CREATE_SUCCESS, payload: data.booking });
    dispatch({ type: CHECKOUT_EMPTY });
    localStorage.removeItem('cartItems');
  } catch (error) {
    dispatch({
      type: BOOKING_CREATE_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

export const detailsBooking = (bookingId) => async (dispatch, getState) => {
  dispatch({ type: BOOKING_DETAILS_REQUEST, payload: bookingId });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.get(`/api/v1/bookings/${bookingId}`, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: BOOKING_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    const message = error.response && error.response.data.message ? error.response.data.message : error.message;
    dispatch({ type: BOOKING_DETAILS_FAIL, payload: message });
  }
};

export const payBooking = (booking, paymentResult) => async (dispatch, getState) => {
  dispatch({
    type: BOOKING_PAY_REQUEST,
    payload: { booking, paymentResult },
  });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = Axios.put(`/api/v1/bookings/${booking._id}/pay`, paymentResult, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: BOOKING_PAY_SUCCESS, payload: data });
  } catch (error) {
    const message = error.response && error.response.data.message ? error.response.data.message : error.message;
    dispatch({ type: BOOKING_PAY_FAIL, payload: message });
  }
};

export const listBookingMine = () => async (dispatch, getState) => {
  dispatch({ type: BOOKING_MINE_LIST_REQUEST });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.get('/api/v1/bookings/user', {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });
    dispatch({ type: BOOKING_MINE_LIST_SUCCESS, payload: data.bookings });
  } catch (error) {
    const message = error.response && error.response.data.message ? error.response.data.message : error.message;
    dispatch({ type: BOOKING_MINE_LIST_FAIL, payload: message });
  }
};

export const listBookings =
  ({ hosted = '' }) =>
  async (dispatch, getState) => {
    dispatch({ type: BOOKING_LIST_REQUEST });
    const {
      userSignin: { userInfo },
    } = getState();
    try {
      const { data } = await Axios.get(`/api/v1/bookings?hosted=${hosted}`, {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      });
      console.log(data);
      dispatch({ type: BOOKING_LIST_SUCCESS, payload: data });
    } catch (error) {
      const message = error.response && error.response.data.message ? error.response.data.message : error.message;
      dispatch({ type: BOOKING_LIST_FAIL, payload: message });
    }
  };

export const deleteBooking = (bookingId) => async (dispatch, getState) => {
  dispatch({ type: BOOKING_DELETE_REQUEST, payload: bookingId });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = Axios.delete(`/api/v1/bookings/${bookingId}`, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: BOOKING_DELETE_SUCCESS, payload: data });
  } catch (error) {
    const message = error.response && error.response.data.message ? error.response.data.message : error.message;
    dispatch({ type: BOOKING_DELETE_FAIL, payload: message });
  }
};

export const deliverBooking = (bookingId) => async (dispatch, getState) => {
  dispatch({ type: BOOKING_DELIVER_REQUEST, payload: bookingId });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = Axios.put(
      `/api/v1/bookings/${bookingId}/deliver`,
      {},
      {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      }
    );
    dispatch({ type: BOOKING_DELIVER_SUCCESS, payload: data });
  } catch (error) {
    const message = error.response && error.response.data.message ? error.response.data.message : error.message;
    dispatch({ type: BOOKING_DELIVER_FAIL, payload: message });
  }
};

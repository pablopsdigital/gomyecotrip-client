import axiosClient from '../services/axiosAPIClient';

// Configure params
const apiVersionUrl = '/api/v1';

// export const getAllBookingsForUser = async () => {
//   const url = `${apiVersionUrl}/bookings/user`;
//   return await axiosClient.get(url);
// };

export const getAllBookingsForUser = async () => {
  const {token} = JSON.parse(localStorage.getItem('userInfo'));
  const headers = {Authorization: `Bearer ${token}`};

  const url = `${apiVersionUrl}/bookings/user`;
  return await axiosClient.get(url, {headers});
};

export const getAllBookings = async ({hosted = ''}) => {
  const {token} = JSON.parse(localStorage.getItem('userInfo'));
  const headers = {Authorization: `Bearer ${token}`};

  const url = `${apiVersionUrl}/bookings/hosted?hosted=${hosted}`;
  return await axiosClient.get(url, {headers});
};

export const changeBookingState = async (booking, bookingState) => {
  const {token} = JSON.parse(localStorage.getItem('userInfo'));
  const headers = {Authorization: `Bearer ${token}`};

  const url = `${apiVersionUrl}/bookings/state`;
  return await axiosClient.put(url, {id: booking, state: bookingState}, {headers});
};

export const getOneBookingForId = async (bookingId) => {
  const {token} = JSON.parse(localStorage.getItem('userInfo'));
  const headers = {Authorization: `Bearer ${token}`};

  const url = `${apiVersionUrl}/bookings/${bookingId}`;
  return await axiosClient.get(url, {headers});
};

export const payStripe = async (queryData) => {
  const {token} = JSON.parse(localStorage.getItem('userInfo'));
  const headers = {Authorization: `Bearer ${token}`};

  const url = `${apiVersionUrl}/payments/session-id`;
  return await axiosClient.post(url, queryData, {headers});
};

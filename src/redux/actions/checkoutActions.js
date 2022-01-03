import Axios from 'axios';
import {
  CHECKOUT_UPDATE_DETAILS,
  CHECKOUT_SAVE_SHIPPING_ADDRESS,
  CHECKOUT_SAVE_PAYMENT_METHOD,
} from '../constants/checkoutConstants';

// export const saveDetailsCheckout =
//   (experienceId, preBookingInfo) => async (dispatch, getState) => {
//     const { data } = await Axios.get(`/api/v1/experiences/${experienceId}`);

//     dispatch({
//       type: CHECKOUT_UPDATE_DETAILS,
//       payload: {
//         name: data.name,
//         featuredImage: data.featuredImage,
//         experienceId: data._id,
//         hosted: data.hosted,
//         preBookingInfo,
//       },
//     }),
//       localStorage.setItem(
//         'preBookingInfo',
//         JSON.stringify(getState().checkout.preBookingInfo)
//       );
//   };

export const saveShippingAddress = (data) => (dispatch) => {
  dispatch({ type: CHECKOUT_SAVE_SHIPPING_ADDRESS, payload: data });
  localStorage.setItem('shippingAddress', JSON.stringify(data));
};

export const savePaymentMethod = (data) => (dispatch) => {
  dispatch({ type: CHECKOUT_SAVE_PAYMENT_METHOD, payload: data });
  localStorage.setItem('paymentMethod', JSON.stringify(data));
};

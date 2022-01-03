import {
  CHECKOUT_UPDATE_DETAILS,
  CHECKOUT_SAVE_SHIPPING_ADDRESS,
  CHECKOUT_SAVE_PAYMENT_METHOD,
  CHECKOUT_EMPTY,
} from '../constants/checkoutConstants';

export const checkoutReducer = (state = { preBookingInfo: [] }, action) => {
  switch (action.type) {
    case CHECKOUT_UPDATE_DETAILS:
      return { ...state, error: '', preBookingInfo: action.payload };
    case CHECKOUT_SAVE_SHIPPING_ADDRESS:
      return { ...state, error: '', shippingAddress: action.payload };
    case CHECKOUT_SAVE_PAYMENT_METHOD:
      return { ...state, paymentMethod: action.payload };
    default:
      return state;
  }
};

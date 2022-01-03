import { createStore, compose, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { checkoutReducer } from './reducers/checkoutReducers';

import {
  experienceCategoryListReducer,
  experienceCreateReducer,
  experienceDeleteReducer,
  experienceDetailsReducer,
  experienceListReducer,
  experienceUpdateReducer,
} from './reducers/experienceReducers';
import {
  userCreateReducer,
  userDeleteReducer,
  userDetailsReducer,
  userListReducer,
  userSignupReducer,
  userSigninReducer,
  userUpdateProfileReducer,
  userUpdateReducer,
} from './reducers/userReducers';
import {
  bookingCreateReducer,
  bookingDeleteReducer,
  bookingDeliverReducer,
  bookingDetailsReducer,
  bookingListReducer,
  bookingMineListReducer,
  bookingPayReducer,
} from './reducers/bookingReducers';

const initialState = {
  userSignin: {
    userInfo: localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null,
  },
  checkout: {
    preBookingInfo: localStorage.getItem('preBookingInfo') ? JSON.parse(localStorage.getItem('preBookingInfo')) : {},
    shippingAddress: localStorage.getItem('shippingAddress') ? JSON.parse(localStorage.getItem('shippingAddress')) : {},
    paymentMethod: localStorage.getItem('paymentMethod') ? JSON.parse(localStorage.getItem('paymentMethod')) : {},
  },
};
const reducer = combineReducers({
  experienceList: experienceListReducer,
  experienceDetails: experienceDetailsReducer,
  checkout: checkoutReducer,
  userSignin: userSigninReducer,
  userSignup: userSignupReducer,
  bookingCreate: bookingCreateReducer,
  bookingDetails: bookingDetailsReducer,
  bookingPay: bookingPayReducer,
  bookingMineList: bookingMineListReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  experienceCreate: experienceCreateReducer,
  experienceUpdate: experienceUpdateReducer,
  experienceDelete: experienceDeleteReducer,
  bookingList: bookingListReducer,
  bookingDelete: bookingDeleteReducer,
  bookingDeliver: bookingDeliverReducer,
  userList: userListReducer,
  userDelete: userDeleteReducer,
  userUpdate: userUpdateReducer,
  userCreate: userCreateReducer,
  experienceCategoryList: experienceCategoryListReducer,
});
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, initialState, composeEnhancer(applyMiddleware(thunk)));

console.log(store);

export default store;

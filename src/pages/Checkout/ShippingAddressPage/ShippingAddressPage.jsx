import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {saveShippingAddress} from '../../../redux/actions/checkoutActions';
import './ShippingAddressPage.css';

export default function ShippingAddressPage(props) {
  const userSignin = useSelector((state) => state.userSignin);
  const {userInfo} = userSignin;

  const checkout = useSelector((state) => state.checkout);
  console.log('data', checkout);
  // const { shippingAddress } = checkout;
  const shippingAddress = {
    fullName: 'pablo',
    address: 'Pontevedra',
    city: 'Sanxnexo',
    postalCode: '45667',
    country: 'España'
  };

  //=======================================================================
  //Hooks campos formulario
  //=======================================================================
  const [fullName, setFullName] = useState(shippingAddress.fullName);
  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
  const [country, setCountry] = useState(shippingAddress.country);
  const dispatch = useDispatch();

  //Controlador envio formulario, se actualiza el estado en el storage
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({fullName, address, city, postalCode, country}));
  };

  //=======================================================================
  //Return
  //=======================================================================
  return (
    <div className="shipping-address-page">
      {/* <CheckoutSteps step1 step2></CheckoutSteps> */}
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>Shipping Address</h1>
        </div>
        <div>
          <label htmlFor="fullName">Full Name</label>
          <input
            type="text"
            id="fullName"
            placeholder="Enter full name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          ></input>
        </div>
        <div>
          <label htmlFor="address">Address</label>
          <input
            type="text"
            id="address"
            placeholder="Enter address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          ></input>
        </div>
        <div>
          <label htmlFor="city">City</label>
          <input
            type="text"
            id="city"
            placeholder="Enter city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          ></input>
        </div>
        <div>
          <label htmlFor="postalCode">Postal Code</label>
          <input
            type="text"
            id="postalCode"
            placeholder="Enter postal code"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
            required
          ></input>
        </div>
        <div>
          <label htmlFor="country">Country</label>
          <input
            type="text"
            id="country"
            placeholder="Enter country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            required
          ></input>
        </div>
        <div>
          <label />
          <button className="primary" type="submit">
            Continue
          </button>
        </div>
      </form>
    </div>
  );
}

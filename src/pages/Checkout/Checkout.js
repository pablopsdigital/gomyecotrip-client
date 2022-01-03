/* eslint-disable no-undef */
import React, {useEffect, useState} from 'react';
import './Checkout.css';
import {useDispatch, useSelector} from 'react-redux';
import {createBooking} from '../../redux/actions/bookingActions';
import {Link} from 'react-router-dom';
import {BOOKING_CREATE_RESET} from '../../redux/constants/bookingConstants';
import LoadingBox from '../../components/LoadingBox/LoadingBox';
import MessageBox from '../../components/MessageBox/MessageBox';
import Layout from '../../components/Layout/Layout';
import {Button} from '../../components/Button';
import ReviewStartCount from '../../components/ReviewStartAndCount/ReviewStartAndCount';
import {BsArrowLeft} from 'react-icons/bs';
import ShippingAddressPage from './ShippingAddressPage/ShippingAddressPage';
import PaymentMethodPage from './PaymentMethodPage/PaymentMethodPage';
import PayPal from './PayPal/PayPal';
import StripeCheckoutForm from './StripeCheckoutForm/StripeCheckoutForm';
import {loadStripe} from '@stripe/stripe-js';
import {
  Elements,
  CardElement,
  useStripe,
  PaymentElement,
  StripeProvider,
  useElements
} from '@stripe/react-stripe-js';
import {useNavigate} from 'react-router-dom';

export default function Checkout({match, ...props}) {
  const navigate = useNavigate();
  const {userInfo} = useAuthUserContext();

  //Si el usuario no está registrado
  if (!userInfo) {
    navigate('/signin');
  }

  const experienceId = match.params.experienceId;
  //Mock data
  const experienceMock = dataExperiences.experiences[0];

  const checkout = useSelector((state) => state.checkout);
  const preBookingInfo = checkout.preBookingInfo.preBookingInfo;

  //=======================================================================
  //Stripe
  //=======================================================================
  const bookingStripeHandler = async (event) => {
    event.preventDefault();

    try {
      setLoading(true);

      //If the user is not logged in then login
      if (!userInfo) {
        navigate('/signin');
      }

      const queryData = {experienceId: experience._id};

      //Solicitate backend id transacction
      const response = await axios.post(`/api/v1/payments/session-id`, queryData);
      setLoading(false);

      console.log(response.data);

      const stripe = await loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);
      stripe.redirectToCheckout({
        sessionId: response.data.sessionId
      });
    } catch (error) {
      console.error(error.message);
    }
  };

  //Style
  const appearance = {
    theme: 'stripe',
    labels: 'floating',
    variables: {
      colorPrimary: '#0570de',
      colorBackground: '#ffffff',
      colorText: '#30313d',
      colorDanger: '#df1b41',
      fontFamily: 'Ideal Sans, system-ui, sans-serif',
      spacingUnit: '2px',
      borderRadius: '4px'
    },
    rules: {
      '.Tab': {
        border: '1px solid #E0E6EB',
        boxShadow: '0px 1px 1px rgba(0, 0, 0, 0.03), 0px 3px 6px rgba(18, 42, 66, 0.02)'
      },

      '.Tab:hover': {
        color: 'var(--colorText)'
      },

      '.Tab--selected': {
        borderColor: '#E0E6EB',
        boxShadow:
          '0px 1px 1px rgba(0, 0, 0, 0.03), 0px 3px 6px rgba(18, 42, 66, 0.02), 0 0 0 2px var(--colorPrimary)'
      },

      '.Input--invalid': {
        boxShadow: '0 1px 1px 0 rgba(0, 0, 0, 0.07), 0 0 0 2px var(--colorDanger)'
      }
    }
  };

  const options = {
    appearance
  };

  //=======================================================================
  //Create booking
  //=======================================================================

  //=======================================================================
  //Return
  //=======================================================================
  return (
    <Layout>
      <h1>{experienceId}</h1>
      <div className="place-booking-page container">
        <div className="place-booking-header">
          <div className="icon">
            <Link to="">
              <BsArrowLeft />
            </Link>
          </div>
          <h1>Confirma y paga</h1>
        </div>
        <div className="columns">
          {/* Column Left */}
          <div className="col-8">
            <div className="card-colum">
              {/* Section booking experience */}
              <section className="info-person-booking">
                <div className="title-section">
                  <h3>Información reserva cantidad adultos niños fechas</h3>
                </div>
                <div className="content-section"></div>
              </section>

              {/* Sectión User data */}
              <section className="info-person-booking">
                <div className="title-section">
                  <h3>Información personal</h3>
                </div>
                <div className="content-section">
                  <ShippingAddressPage />
                </div>
              </section>

              {/* Payment Card */}
              <section className="info-person-booking">
                <div className="title-section">
                  <h3>Método de pago</h3>
                </div>
                <div className="content-section">
                  <PaymentMethodPage />
                </div>
              </section>

              {/* Payment Card */}
              <section className="info-person-booking">
                <div className="title-section">
                  <h3>Método de pago</h3>
                </div>
                <div></div>
                <div className="content-section">
                  {/* <PayPal bookingId={props.match.params.id} /> */}
                </div>
              </section>
            </div>
          </div>

          {/* Column Right */}
          <div className="col-4">
            <div className="sticky-outer">
              <div className="sticky-wrapper">
                <div className="sticky-wrapper-inner">
                  <div className="card-colum">
                    <div className="booking-resume">
                      {/* Experience info */}
                      <div className="resume-card">
                        <div className="resume-image">
                          <img src="https://dummyimage.com/1920x1080" alt="" />
                        </div>
                        <div className="info">
                          <p>Vendedor * duración</p>
                          <h4>Titulo experienecia sdfsdfsdf sdfsdfsdfd</h4>
                          <div className="review-container">
                            <ReviewStartCount
                              reviewCount={experienceMock.reviewCount}
                              reviewStart={experienceMock.reviewStart}
                            />
                          </div>
                        </div>
                      </div>
                      {/* Header breakdown */}
                      <div className="head">
                        <span>Detalles del precio</span>
                      </div>

                      {/*Price breakdown*/}
                      <div className="price-breakdown">
                        <div className="price-breakdown-line">
                          <span>{`$10*${preBookingInfo.adultos}`} adultos</span> <span>$57</span>
                        </div>
                        <div className="price-breakdown-line">
                          <span>$10*{preBookingInfo.kids} kids</span> <span>$57</span>
                        </div>
                        <div className="price-breakdown-line">
                          <span>$10*{preBookingInfo.babies} Babies</span> <span>$57</span>
                        </div>
                        <div className="price-breakdown-line">
                          <span>Service charge</span> <span>$0</span>
                        </div>
                        <div className="price-breakdown-line-total">
                          <span>
                            Total <small>(+iva 21%)</small>
                          </span>{' '}
                          <span>199€</span>
                        </div>
                      </div>

                      {/* Footer */}
                      <div className="footer-booking-card">
                        <div>Reserve</div>
                        <div>
                          {clientSecret && (
                            <Elements options={options} stripe={stripePromise}>
                              <StripeCheckoutForm />
                            </Elements>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

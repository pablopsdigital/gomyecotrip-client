import {loadStripe} from '@stripe/stripe-js';
import React, {useEffect, useRef, useState} from 'react';
import {BiMinus, BiPlus, BiUserPlus} from 'react-icons/bi';
import {FiCalendar} from 'react-icons/fi';
import {Button} from '../../../components/Button';
import './BookingForm.scss';

import DateFnsUtils from '@date-io/date-fns';
import {KeyboardDatePicker, MuiPickersUtilsProvider} from '@material-ui/pickers';
import 'date-fns';
import moment from 'moment';
import {useNavigate, useParams} from 'react-router-dom';
import {payStripe} from '../../../actions/bookingsActions';
import useAuthUserContext from '../../../hooks/useAuthUser';

export default function BookingForm({experience, ...props}) {
  //===========================================================================
  //Read data and props
  //===========================================================================
  const {userInfo} = useAuthUserContext();
  const navigate = useNavigate();

  const params = useParams();
  const {place, date, hour, id} = params;
  const experienceId = experience._id;

  //===========================================================================
  //Config modals calendar and persons
  //===========================================================================
  const [inputPeopleActive, setInputPeopleState] = useState(false);

  const refContainerPeopleModal = useRef();
  const [isModalOpenPeople, setModalOpenPeople] = useState(false);
  useOnClickOutside(refContainerPeopleModal, () => setModalOpenPeople(false));

  const refDivDatesModal = useRef();
  const [isModalDatesOpen, setModalDatesOpen] = useState(false);
  useOnClickOutside(refDivDatesModal, () => setModalDatesOpen(false));

  // Hook
  function useOnClickOutside(ref, handler) {
    useEffect(() => {
      const listener = (event) => {
        if (!ref.current || ref.current.contains(event.target)) {
          return;
        }
        handler(event);
      };
      document.addEventListener('mousedown', listener);
      document.addEventListener('touchstart', listener);
      return () => {
        document.removeEventListener('mousedown', listener);
        document.removeEventListener('touchstart', listener);
      };
    }, [ref, handler]);
  }

  //===================================================================
  // Calendar modal
  //===================================================================
  const [dateModal, setDateModal] = useState(new Date());
  const [hourModal, setHourModal] = useState('10:00');

  const handleDates = (newDate) => {
    setDateModal(moment(newDate).format('DD-MM-YYYY'));
    // setModalDatesOpen(false);
  };

  const handleHour = (event) => {
    event.preventDefault();
    setHourModal(event.target.value);
  };

  //===================================================================
  // Calculate amount pay and controls persons modal
  //===================================================================
  //Quantitys persons
  const [adultsQuantity, setAdultsQuantity] = useState(1);
  const [kidsQuantity, setKidsQuantity] = useState(0);
  const [babiesQuantity, setBabiesQuantity] = useState(0);
  const [totalQuantityPeople, setTotalQuantityPeople] = useState(0);

  //Total Amound pay for type person
  const [totalPayAdults, setTotalPayAdults] = useState(experience.ratesForPerson.adults);
  const [totalPayKids, setTotalPayKids] = useState(0);
  const [totalPayBabies, setTotalPayBabies] = useState(0);

  const [totalPayAmount, setTotalPayAmount] = useState(experience.ratesForPerson.adults);

  const calculateTotalPayAmountHandler = () => {
    setModalOpenPeople(false);
    setTotalPayAdults(adultsQuantity * experience.ratesForPerson.adults);
    setTotalPayKids(kidsQuantity * experience.ratesForPerson.kids);
    setTotalPayBabies(babiesQuantity * experience.ratesForPerson.babies);
  };

  useEffect(() => {
    setTotalPayAmount(totalPayAdults + totalPayKids + totalPayBabies);
    setTotalQuantityPeople(adultsQuantity + kidsQuantity + babiesQuantity);
  }, [totalPayAdults, totalPayKids, totalPayBabies]);

  //=========================================================================
  //Stripe configuration
  //=========================================================================
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [sessioneStripeId, setSessionStripeId] = useState(null);

  const bookingStripeHandler = async (event) => {
    event.preventDefault();

    //If the user is not logged in then login
    if (!userInfo) {
      navigate('/signin');
    }

    const bookingDetails = {
      experience: experience._id,
      user: userInfo._id,
      hosted: experience.hosted,

      location: JSON.stringify(location),
      date: dateModal,
      hour: hourModal,

      priceAdults: experience.ratesForPerson.adults,
      quantityAdults: adultsQuantity,
      priceKids: experience.ratesForPerson.kids,
      quantityKids: kidsQuantity,
      priceBabies: experience.ratesForPerson.babies,
      quantityBabies: babiesQuantity,
      totalPayAmount: totalPayAmount,

      paymentMethod: 'Stripe',
      state: 'booked'
    };

    try {
      setLoading(true);

      const queryData = {
        userId: userInfo._id,
        experienceId: experience._id,
        bookingDetails: bookingDetails
      };

      //Request id pay transaction intent backend
      const response = await payStripe(queryData);
      // console.log('res', response);
      setLoading(false);

      //Send stripe
      const stripe = await loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);
      const payIntent = stripe.redirectToCheckout({
        sessionId: response.sessionId
      });
    } catch (error) {
      setError(error.message);
    }
  };

  //=========================================================================
  //Render
  //=========================================================================
  return (
    <div className="experience-page-booking-card">
      {/* Header card */}
      <div className="head">
        <span>
          From {experience.ratesForPerson.adults} € <small>/per person</small>
        </span>
      </div>
      {/* Inputs row */}
      <div className="inputs-date-people-container">
        <div onClick={() => setModalDatesOpen(true)} className="box">
          <FiCalendar className="icon" />
          <div>
            <label>Dates</label>
            <p>
              {dateModal !== '' || hourModal !== ''
                ? `${moment(dateModal).format('DD-MM-YYYY')} - ${hourModal}`
                : 'Pick a date'}
            </p>
          </div>
        </div>
        <div onClick={() => setModalOpenPeople(true)} className="box">
          <BiUserPlus className="icon" />
          <div>
            <label>People</label>
            <p>
              {adultsQuantity + kidsQuantity + babiesQuantity}{' '}
              {totalQuantityPeople > 1 ? 'participants' : 'participant'}
            </p>
          </div>
        </div>
      </div>

      {/*Price breakdown*/}
      <div className="price-breakdown">
        <div className="price-breakdown-line">
          <div>
            {`${adultsQuantity} x ${experience.ratesForPerson.adults}`} €<span>/ for adult</span>
          </div>
          <div>{totalPayAdults} €</div>
        </div>

        <div className="price-breakdown-line">
          <div>
            {`${kidsQuantity} x ${experience.ratesForPerson.kids}`} € <span>/ for kid</span>
          </div>
          <div>{totalPayKids} €</div>
        </div>

        <div className="price-breakdown-line">
          <div>
            {`${babiesQuantity} x ${experience.ratesForPerson.babies}`} € <span>/ for babie</span>
          </div>
          <div>{totalPayBabies} €</div>
        </div>

        <div className="price-breakdown-line-total">
          <span>
            Total <small>(+iva 21%)</small>
          </span>{' '}
          <span>{totalPayAmount} €</span>
        </div>
      </div>

      {/* Footer */}
      <div className="footer-booking-card">
        <Button contained full onClick={bookingStripeHandler}>
          {loading ? 'Loading...' : 'Reserve'}
        </Button>
      </div>

      {/* ====================================================================================
        Picker participants
        ==================================================================================== */}
      {isModalOpenPeople && (
        <div ref={refContainerPeopleModal} className="modal-people-container">
          <div className="modal-people-panel">
            <div className="modal-people-panel-inner">
              {/* Adults */}
              <div className="type-block">
                <div className="info">
                  <span>Adults</span>
                  <span>18 years +</span>
                </div>
                <div className="action">
                  <div className="spinner">
                    <button>
                      <BiMinus
                        className="minus"
                        onClick={() =>
                          setAdultsQuantity(adultsQuantity <= 0 ? 0 : adultsQuantity - 1)
                        }
                      />
                    </button>
                    <input value={adultsQuantity} readOnly />
                    <button>
                      <BiPlus
                        className="minus"
                        onClick={() => setAdultsQuantity(adultsQuantity + 1)}
                      />
                    </button>
                  </div>
                </div>
              </div>

              {/* Kids */}
              <div className="type-block">
                <div className="info">
                  <span>Kids</span>
                  <span>From 2 to 18 years</span>
                </div>
                <div className="action">
                  <div className="spinner">
                    <button>
                      <BiMinus
                        className="minus"
                        onClick={() => setKidsQuantity(kidsQuantity <= 0 ? 0 : kidsQuantity - 1)}
                      />
                    </button>
                    <input value={kidsQuantity} readOnly />
                    <button>
                      <BiPlus className="minus" onClick={() => setKidsQuantity(kidsQuantity + 1)} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Babies */}
              <div className="type-block">
                <div className="info">
                  <span>Babies</span>
                  <span>less than 2 years</span>
                </div>
                <div className="action">
                  <div className="spinner">
                    <button>
                      <BiMinus
                        className="minus"
                        onClick={() =>
                          setBabiesQuantity(babiesQuantity <= 0 ? 0 : babiesQuantity - 1)
                        }
                      />
                    </button>
                    <input value={babiesQuantity} readOnly />
                    <button>
                      <BiPlus
                        className="minus"
                        onClick={() => setBabiesQuantity(babiesQuantity + 1)}
                      />
                    </button>
                  </div>
                </div>
              </div>
              {/* footer */}
              <div className="footer">
                <Button onClick={calculateTotalPayAmountHandler}>Save Changes</Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ====================================================================================
        Picker Dates
        ==================================================================================== */}
      {isModalDatesOpen && (
        <div ref={refDivDatesModal} className="modal-dates-container">
          <div className="modal-dates-panel">
            <div className="modal-dates-panel-inner">
              <h4 className="dual-picker-panel-title">Add some dates</h4>
              {/* <!--Calendars--> */}
              <div className="booking-calendars">
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker
                    disableToolbar
                    variant="static"
                    formt="MM/dd/yyy"
                    minDate={new Date()}
                    margin="normal"
                    id="date-picker"
                    label="Date Picker"
                    value={dateModal ? new Date(dateModal) : null}
                    onChange={(date) => setDateModal(date)}
                    KeyboardButtonProps={{
                      'aria-label': 'change date'
                    }}
                  />
                </MuiPickersUtilsProvider>

                <div className="container-input">
                  <label htmlFor="">Hour</label>
                  <select
                    name="hour"
                    required
                    onChange={(event) => setHourModal(event.target.value)}
                  >
                    <option defaultValue="Choose a hour" disabled>
                      Choose a hour
                    </option>
                    <option value="10:00">10:00</option>
                    <option value="11:00">11:00</option>
                    <option value="12:00">12:00</option>
                    <option value="13:00">13:00</option>
                    <option value="14:00">14:00</option>
                    <option value="15:00">15:00</option>
                    <option value="16:00">16:00</option>
                    <option value="17:00">17:00</option>
                    <option value="18:00">18:00</option>
                    <option value="19:00">19:00</option>
                    <option value="20:00">20:00</option>
                  </select>
                </div>
                <div className="footer">
                  <Button variant="contained" onClick={() => setModalDatesOpen(false)}>
                    save
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

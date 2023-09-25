import {Modal} from '@mui/material';
import moment from 'moment';
import React, {useEffect, useState} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import {changeBookingState, getAllBookings} from '../../../actions/bookingsActions';
import {Button} from '../../../components/Button';
import LoadingBox from '../../../components/LoadingBox/LoadingBox';
import MessageBox from '../../../components/MessageBox/MessageBox';
import NoResultsFound from '../../../components/NoResultsFound/NoResultsFound';
import useAuthUserContext from '../../../hooks/useAuthUser';
import LayoutAdmin from '../Dashboard/LayoutAdmin';
import './BookingList.scss';

export default function BookingList(props) {
  //UserInfo
  const {userInfo} = useAuthUserContext();

  //Route
  const navigate = useNavigate();

  //If url search param hosted
  const {pathname} = useLocation();
  const hostedMode = pathname.indexOf('/hosted') >= 0;

  //Data
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [update, setUpdate] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await getAllBookings({hosted: hostedMode ? userInfo._id : ''});
        setBookings(data.bookings);

        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
      setLoading(false);
    };
    fetchData();
  }, [hostedMode, update]);

  //==================================================================
  //Modal
  //==================================================================
  const [modal, setModal] = useState(false);
  const [bookingSelect, setBookingSelect] = useState('');
  const [bookingState, setBookingState] = useState('');

  const openCloseModal = () => {
    setModal(!modal);
  };

  const selectBooking = (booking) => {
    setBookingSelect(booking);
    openCloseModal();
  };

  const handleRadioBookingState = async (event) => {
    console.log('Booking', event.target.value);
    setBookingState({state: event.target.value});
  };

  //Change booking state
  const handlerChangeBookingState = async (event) => {
    console.log(event);
    try {
      setLoading(true);
      const data = await changeBookingState(bookingSelect._id, bookingState);
      if (data) {
        setUpdate(update + 1);
        openCloseModal();
      }
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
    setLoading(false);
  };

  //View modal
  const modalDetailsBooking = (
    <div id="modal">
      <div className="modal">
        <div>
          <h3>Edit Boking estate</h3>
        </div>
        <div className="modal-body" onChange={handleRadioBookingState}>
          <div className="input-container">
            <input type="radio" value="completed" name="bookingState" />
            <label>Completed</label>
          </div>

          <div className="input-container">
            <input type="radio" value="booked" name="bookingState" />
            <label>Booked</label>
          </div>

          <div className="input-container">
            <input type="radio" value="cancel" name="bookingState" />
            <label>Cancel</label>
          </div>
        </div>
        <div className="modal-footer">
          <Button outline onClick={openCloseModal}>
            Cancel
          </Button>
          <Button onClick={() => handlerChangeBookingState(event.target.value)}>
            Change State
          </Button>
        </div>
      </div>
    </div>
  );

  //==================================================================
  // Actions
  //==================================================================
  const changeStateBookingHandler = (booking) => {
    if (window.confirm('Are you sure to delete?')) {
      const response = changeBookingState(booking._id);
      console.log('Response:', response);
      setBookingState(response);
    }
  };

  return (
    <LayoutAdmin>
      <div className="container profile-container">
        <div className="header-admin-page">
          <h2 className="title">Booking list</h2>
        </div>
        <div className="profile-content">
          {!loading ? (
            <>
              <div className="container-table">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Id</th>
                      <th>User</th>
                      <th>Event day</th>
                      <th>Participants</th>
                      <th>Total</th>
                      <th>State</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookings.map((booking) => (
                      <tr key={booking.experience + booking._id}>
                        <td className="col-1">
                          <div>
                            <img className="image" src={booking.experience.featuredImage} />
                          </div>
                          <div>
                            <p>{booking.experience.name}</p>
                            <p>Code: {booking._id}</p>
                            <p>{moment(booking.createdAt).format('MMMM Do YYYY, h:mm:ss a')}</p>
                          </div>
                        </td>
                        <td>
                          <p>Hosted: {booking.hosted} </p>
                          <p>{booking.user.firstName} </p>
                          <p>{booking.user.email}</p>
                        </td>
                        <td>
                          <p>{booking.date}</p>
                          <p>{booking.hour}</p>
                        </td>
                        <td>
                          <p>{booking.quantityAdults} Adults</p>
                          <p>{booking.quantityKids} Kids</p>
                          <p>{booking.quantityBabies} Babies</p>
                        </td>
                        <td>{booking.totalPayAmount} €</td>
                        <td>
                          {booking.state == 'booked' && (
                            <Button onClick={() => selectBooking(booking)} className="booked">
                              {booking.state}
                            </Button>
                          )}
                          {booking.state == 'cancel' && (
                            <Button onClick={() => selectBooking(booking)} className="cancel">
                              {booking.state}
                            </Button>
                          )}
                          {booking.state == 'completed' && (
                            <Button className="completed">{booking.state}</Button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="footer">
                  <div> {bookings ? `Showing: ${bookings.length} bookings` : ''}</div>
                </div>
              </div>
              {/* Modal */}
              <Modal open={modal} onClose={openCloseModal}>
                {modalDetailsBooking}
              </Modal>
            </>
          ) : (
            !loading && <NoResultsFound />
          )}
        </div>
        {/*Loading and errors */}
        {loading && <LoadingBox />}
        {error && <MessageBox variant="error">{error}</MessageBox>}
      </div>
    </LayoutAdmin>
  );
}

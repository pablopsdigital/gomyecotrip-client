import React, {useState, useEffect} from 'react';
import {Button} from '../../../components/Button';
import './PaySuccess.scss';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import {Link, useNavigate} from 'react-router-dom';
import {getAllBookingsForUser} from '../../../actions/bookingsActions';
import Brand from '../../../resources/svg/gomyecotrip-brand-black.svg';
import moment from 'moment';

export default function PaySuccess() {
  const [booking, setBooking] = useState({
    createdAt: '',
    paymentMethod: '',
    totalPayAmount: '',
    experience: {name: ''}
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const getDataBookings = async () => {
    try {
      setLoading(true);
      const data = await getAllBookingsForUser();
      console.log(data[0]);
      setBooking(data[0]);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
    setLoading(false);
  };

  //UseEffect
  useEffect(() => {
    getDataBookings();
  }, []);

  const navigate = useNavigate();
  return (
    <div id="pay-success">
      <div className="pay-success">
        <div className="header">
          <Link to="/" className="brand">
            <img src={Brand} alt="" />
          </Link>{' '}
          <h2>Payment successfull!</h2>
          <CheckCircleOutlineIcon className="icon" />
        </div>

        <div className="body">
          <p>
            <span>Booking made: </span>
            {moment(booking.createAt).format('DD-MM-YYYY')}
          </p>
          <p>
            <span>Pay method: </span>
            {booking.paymentMethod}
          </p>
          <p>
            <span>Total amound: </span>
            {booking.totalPayAmount} €
          </p>
          <p>
            <span>Experience:</span> {booking.experience.name}
          </p>
          <p className="thanks">Thank you for your trust</p>
        </div>
        <div className="footer">
          <Button outline onClick={() => alert('Print')}>
            Print
          </Button>
          <Button contained onClick={() => navigate('/')}>
            Close
          </Button>
        </div>
      </div>
    </div>
  );
}

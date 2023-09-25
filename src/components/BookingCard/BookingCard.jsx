import React from 'react';
import './BookingCard.scss';
import FeedIcon from '@mui/icons-material/Feed';
import {Button} from '../Button';
import VisibilityIcon from '@mui/icons-material/Visibility';

export default function BookingCard({setBookingSelect, booking, ...props}) {
  return (
    <div id="booking-card">
      <div className="booking-card">
        <div className="col-1">
          <img src={booking.experience.featuredImage} />
        </div>
        <div className="col-2">
          <h4>{booking.experience.name}</h4>
          <p>Booking date: {booking.updatedAt}</p>
          <p>Hosted: {booking.user.hosted.name}</p>
        </div>
        <div className="col-3">
          <h4>Date Activity</h4>
          <p>Date: {booking.date}</p>
          <p>Hour: {booking.hour}</p>
        </div>
        <div className="col-4">
          <h4>Participants</h4>
          <p>Adults: {booking.quantityAdults}</p>
          <p>Kids: {booking.quantityKids}</p>
          <p>Babies: {booking.quantityBabies}</p>
        </div>
        <div className="col-5">
          <h4>Breakdown</h4>
          <p>
            Adults: {booking.quantityAdults}* {booking.priceAdults} €
          </p>
          <p>
            Kids: {booking.quantityKids}*{booking.priceKids} €
          </p>
          <p>
            Babies: {booking.quantityBabies}*{booking.priceBabies} €
          </p>
        </div>
        <div className="col-6">
          <h4>Total Amount</h4>
          <p>{booking.totalPayAmount} €</p>
        </div>
        <div className="col-7">
          <h4>Current status</h4>
          {booking.state == 'booked' && (
            <Button onClick={() => setBookingSelect(booking)} className="booked">
              {booking.state}
            </Button>
          )}
          {booking.state == 'completed' && <Button className="completed">{booking.state}</Button>}
          {booking.state == 'cancel' && (
            <Button onClick={() => setBookingSelect(booking)} className="cancel">
              {booking.state}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

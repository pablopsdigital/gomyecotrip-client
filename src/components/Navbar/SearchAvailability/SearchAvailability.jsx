import moment from 'moment';
import React, {useState} from 'react';
import Autocomplete from 'react-google-autocomplete';
import './SearchAvailability.scss';

// Icons
import DateFnsUtils from '@date-io/date-fns';
import {KeyboardDatePicker, MuiPickersUtilsProvider} from '@material-ui/pickers';
import SearchIcon from '@mui/icons-material/Search';
import 'date-fns';
import {useNavigate} from 'react-router-dom';

export default function SearchAvailability() {
  //Control Date
  const [dateModal, setDateModal] = useState(new Date());
  const [hourModal, setHourModal] = useState('10:00');
  const [placeModal, setPlaceModal] = useState('Barcelona');

  const handleLocation = async (place) => {
    setPlaceModal(place);
  };

  //Navigate
  const navigate = useNavigate();
  const searchHandler = (event) => {
    event.preventDefault();
    navigate({
      pathname: '/experiences',
      search: `?place=${placeModal.place_id}&date=${moment(dateModal).format(
        'DD-MM-YYYY'
      )}&hour=${hourModal}`
    });
  };
  //==================================================================
  //Return
  //==================================================================
  return (
    <div id="search_availability" className="search_availability">
      {/* <p>{moment(dateModal).format('DD-MM-YYYY')}</p>
      <p>{hourModal}</p>
      <p>{placeModal}</p> */}
      <form>
        <div className="container-input">
          <label htmlFor="">Where you want to go</label>
          <Autocomplete
            apiKey={import.meta.env.VITE_GOOGLE_KEY}
            onPlaceSelected={(place) => {
              handleLocation(place);
            }}
            options={{
              types: ['(regions)'],
              componentRestrictions: {country: 'es'}
            }}
            defaultValue="Barcelona"
          />
        </div>

        <div className="container-input">
          <label htmlFor="">Date</label>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              disableToolbar
              variant="inline"
              format="MM-dd-yyy"
              placeholder="10/10/2018"
              minDate={new Date()}
              margin="normal"
              id="date-picker"
              value={dateModal ? new Date(dateModal) : null}
              onChange={(date) => setDateModal(date)}
              KeyboardButtonProps={{
                'aria-label': 'change date'
              }}
            />
          </MuiPickersUtilsProvider>
        </div>

        <div className="container-input">
          <label htmlFor="">Hour</label>
          <select name="hour" required onChange={(event) => setHourModal(event.target.value)}>
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
        <button className="button-search">
          <SearchIcon className="search-icon" onClick={searchHandler} />
        </button>
      </form>
    </div>
  );
}

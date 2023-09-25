import React, {useEffect, useState, useRef} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import './LayoutAdmin.scss';
import Brand from '../../../resources/svg/gomyecotrip-symbol.svg';
import {signout} from '../../../redux/actions/userActions';

// Icons
import {getOneUserForId} from '../../../actions/userActions';
import useAuthUserContext from '../../../hooks/useAuthUser';
import HomeIcon from '@mui/icons-material/Home';

export default function LayoutAdmin({children, ...props}) {
  //User Info
  const {userInfo} = useAuthUserContext();

  //Route
  const navigate = useNavigate();

  const [user, setUser] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const data = await getOneUserForId(userInfo._id);
      setUser(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const signoutHandler = () => {
    signout();
  };

  return (
    <div id="layout-admin">
      <div className="layout-admin">
        <aside className="col-sidebar">
          <nav className="fixed">
            <Link className="logo" to="/">
              <img src={Brand} alt="brand-gomyecotrip" />
              Gomyecotrip
            </Link>

            {/* ishosted ============ */}
            {userInfo && userInfo.isHosted && (
              <>
                <hr />
                <h3>Hosted Panel</h3>
                {/* <Link to="/dashboard">Dashboard</Link> */}
                <Link to="/host-profile">Hosted Profile</Link>
                <Link to="/experiencelist/hosted">Experiences</Link>
                <Link to="/bookinglist/hosted">Bookings</Link>
              </>
            )}

            {/* isAdmin ============ */}
            {userInfo && userInfo.isAdmin && (
              <>
                <hr />
                <h3>Admin Panel</h3>
                {/* <Link to="/dashboard">Dashboard</Link> */}
                <Link to="/experiencelist">Experiences</Link>
                <Link to="/bookinglist">Bookings</Link>
                <Link to="/userlist">Users</Link>
              </>
            )}
            <hr />
            <Link to="/support">Support</Link>
          </nav>
        </aside>

        <div className="col-content">
          <div className="header">
            <header>
              <div>
                <h2>Hello, {userInfo.firstName}</h2>
              </div>
              <div>
                <Link to="/" className="return-home">
                  <HomeIcon />
                  Return Home
                </Link>
              </div>
            </header>
          </div>
          <div className="content">{children}</div>
        </div>
      </div>
    </div>
  );
}

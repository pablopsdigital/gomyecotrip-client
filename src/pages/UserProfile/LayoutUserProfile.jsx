import React from 'react';
import './LayoutUserProfile.scss';
import {NavLink} from 'react-router-dom';
import Layout from '../../components/Layout/Layout';
import useAuthUserContext from '../../hooks/useAuthUser';

export default function LayoutUserProfile({children, ...props}) {
  const {signin, isAuth, userInfo} = useAuthUserContext();

  return (
    <Layout>
      <div id="user-profile">
        <div className="head-tabs">
          <div className="tabs container">
            <NavLink
              className={`navlink ${({isActive}) => (isActive ? 'active' : 'deactive')}`}
              to="/profile"
            >
              Account Info
            </NavLink>

            <NavLink
              className={`navlink ${({isActive}) => (isActive ? 'active' : 'deactive')}`}
              to="/booking-history"
            >
              Your Bookings
            </NavLink>
            <NavLink
              className={`navlink ${({isActive}) => (isActive ? 'active' : 'deactive')}`}
              to="/save-experiences"
            >
              Save experiences
            </NavLink>
          </div>
        </div>
        {children}
      </div>
    </Layout>
  );
}

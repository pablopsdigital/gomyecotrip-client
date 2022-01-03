import React from 'react';
import {Navigate, Redirect, Route} from 'react-router-dom';
import useAuthUserContext from '../../hooks/useAuthUser';

const HostedRoute = (props) => {
  const {children} = props;
  const {userInfo, isAuth} = useAuthUserContext();
  return userInfo && userInfo.isHosted ? children : <Navigate to="/signin" />;
};

export default HostedRoute;

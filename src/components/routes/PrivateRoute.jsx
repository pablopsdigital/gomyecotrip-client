import React, {Component} from 'react';
import {Navigate, Route} from 'react-router-dom';
import useAuthUserContext from '../../hooks/useAuthUser';

const PrivateRoute = (props) => {
  const {children} = props;
  const {userInfo, isAuth} = useAuthUserContext();

  return userInfo ? children : <Navigate to="/signin" />;
};

export default PrivateRoute;

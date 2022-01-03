import React, {Component} from 'react';
import {Navigate, Route, Outlet} from 'react-router-dom';
import useAuthUserContext from '../../hooks/useAuthUser';

const PublicRoute = (props) => {
  const {children} = props;
  const {userInfo, isAuth} = useAuthUserContext();

  // if (!userInfo) {
  //   return <Navigate to="/" />;
  // }

  // if (!isAuth) {
  //   return <Navigate to="/" />;
  // }

  return children;
};

export default PublicRoute;

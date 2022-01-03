import React from 'react';
import {useSelector} from 'react-redux';
import {Navigate, Redirect, Route} from 'react-router-dom';
import useAuthUserContext from '../../hooks/useAuthUser';

const AdminRoute = (props) => {
  const {children} = props;
  const {userInfo, isAuth} = useAuthUserContext();

  return userInfo && userInfo.isAdmin ? children : <Navigate to="/signin" />;
};

export default AdminRoute;

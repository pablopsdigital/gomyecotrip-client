import React from 'react';
import {Navigate} from 'react-router-dom';
import useAuthUserContext from '../../hooks/useAuthUser';

const AdminRoute = (props) => {
  const {children} = props;
  const {userInfo, isAuth} = useAuthUserContext();

  return userInfo && userInfo.isAdmin ? children : <Navigate to="/signin" />;
};

export default AdminRoute;

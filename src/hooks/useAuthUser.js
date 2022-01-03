import React, {useContext} from 'react';
import {AuthUserContext} from '../contexts/AuthUserContext';

export default function useAuthUserContext() {
  const userInfo = useContext(AuthUserContext);
  return userInfo;
}

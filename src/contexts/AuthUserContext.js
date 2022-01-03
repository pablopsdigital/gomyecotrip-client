import React, {useState, createContext, useMemo, useEffect, useCallback} from 'react';
import {Navigate} from 'react-router-dom';
import {setAuthorizationHeader} from '../services/axiosAPIClient';
import {localStorageManager} from '../services/localStorageManager';

export const AuthUserContext = createContext();

export default function AuthUserContextProvider({children}) {
  //================================================================
  //Load Data
  //================================================================
  const [userInfo, setUserInfo] = useState(localStorageManager.getItem('userInfo'));
  const [isAuth, setIsAuth] = useState(localStorageManager.getItem('isAuth'));

  //================================================================
  //Signin
  //================================================================
  const signin = useCallback((data) => {
    setUserInfo(data.userInfo);
    setIsAuth(true);
    // setAuthorizationHeader(data.userInfo); //Header axios
    localStorageManager.setItem('userInfo', data.userInfo);
    localStorageManager.setItem('isAuth', true);
    // document.location.href = '/';
    // Navigate('/');
  }, []);

  //================================================================
  //SingOut
  //================================================================
  const signout = () => {
    localStorageManager.removeItem('userInfo');
    localStorageManager.removeItem('isAuth');
    localStorageManager.removeItem('userWishlist');
    // resetHeaderApiClient();//Remove header axios
    // Navigate('/signin');
    document.location.href = '/';
  };

  //================================================================
  //Object value
  //================================================================
  const value = useMemo(
    () => ({
      signin,
      signout,
      isAuth,
      userInfo
    }),
    [signin, signout, isAuth, userInfo]
  );

  return <AuthUserContext.Provider value={value}>{children}</AuthUserContext.Provider>;
}

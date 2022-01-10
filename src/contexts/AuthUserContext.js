import React, {useState, createContext, useMemo, useEffect, useCallback} from 'react';
import {Navigate} from 'react-router-dom';
import {setAuthorizationHeader} from '../services/axiosAPIClient';
import {localStorageManager} from '../services/localStorageManager';

export const AuthUserContext = createContext();

export default function AuthUserContextProvider({children}) {
  localStorageManager.setItem('favorites', []);

  //================================================================
  //Load Data
  //================================================================
  const [userInfo, setUserInfo] = useState(localStorageManager.getItem('userInfo'));
  const [isAuth, setIsAuth] = useState(localStorageManager.getItem('isAuth'));
  const [favorites, setFavorites] = useState(localStorageManager.getItem('favorites'));

  //================================================================
  //Signin
  //================================================================
  const signin = useCallback((data) => {
    setUserInfo(data.userInfo);
    setIsAuth(true);
    localStorageManager.setItem('userInfo', data.userInfo);
    localStorageManager.setItem('isAuth', true);
  }, []);

  //================================================================
  //SingOut
  //================================================================
  const signout = () => {
    localStorageManager.removeItem('userInfo');
    localStorageManager.removeItem('isAuth');
    localStorageManager.removeItem('userWishlist');
    document.location.href = '/';
  };

  //================================================================
  //Add or delete favorites items
  //================================================================
  const addFavorites = useCallback((experience) => {
    let array = favorites;
    let addArray = true;
    array.map((item, index) => {
      if (item === experience._id) {
        array.splice(index, 1); //delete item array
        addArray = false;
      }
    });
    if (addArray) {
      array.push(experience._id);
    }
    setFavorites([...array]);

    localStorageManager.setItem('favorites', array);
  }, []);

  //================================================================
  //Object value
  //================================================================
  const value = useMemo(
    () => ({
      signin,
      signout,
      addFavorites,
      favorites,
      isAuth,
      userInfo
    }),
    [signin, signout, addFavorites, favorites, isAuth, userInfo]
  );

  return <AuthUserContext.Provider value={value}>{children}</AuthUserContext.Provider>;
}

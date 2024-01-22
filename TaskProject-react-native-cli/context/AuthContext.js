import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, {createContext, useEffect, useState} from 'react';
import {BASE_URL} from '../config/config';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [userInfo, setUserInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [splashLoading, setSplashLoading] = useState(false);
  const [token, setToken] = useState('');

  const [errorMessage, setErrorMessage] = useState('');

  const register = (email, password) => {
    setIsLoading(true);

    axios
      .post(
        `${BASE_URL}/api/user/signup`,
        {
          email,
          password,
        },
        {
          headers: {'Content-Type': 'application/json'},
        },
      )
      .then(res => {
        let userInfo = res.data;
        setUserInfo(userInfo);
        AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
        setIsLoading(false);
        console.log(userInfo);
        setErrorMessage('');
      })
      .catch(e => {
        console.log(`register error ${e}`);
        setIsLoading(false);
        setErrorMessage(e.response.data);
      });
  };

  const login = (email, password) => {
    setIsLoading(true);
    axios
      .post(
        `${BASE_URL}/api/user/login`,
        {
          email,
          password,
        },
        {
          headers: {'Content-Type': 'application/json'},
        },
      )
      .then(res => {
        let userInfo = res.data;
        console.log(userInfo);
        setUserInfo(userInfo);
        AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
        setIsLoading(false);
        setErrorMessage('');
      })
      .catch(e => {
        console.log(`login error ${e} `);
        setErrorMessage(e.response.data);
        setIsLoading(false);
      });
  };

  const logout = () => {
    setIsLoading(true);

    AsyncStorage.removeItem('userInfo');
    setUserInfo(null);
    setIsLoading(false);

    /*axios
      .post(
        `${BASE_URL}/logout`,
        {},
        {
          headers: {Authorization: `Bearer ${userInfo.access_token}`},
        },
      )
      .then(res => {
        console.log(res.data);
        AsyncStorage.removeItem('userInfo');
        setUserInfo({});
        setIsLoading(false);
      })
      .catch(e => {
        console.log(`logout error ${e}`);
        setIsLoading(false);
      });*/
  };

  const isLoggedIn = async () => {
    try {
      setSplashLoading(true);

      let userInfo = await AsyncStorage.getItem('userInfo');

      if (userInfo) {
        userInfo = JSON.parse(userInfo);
        setUserInfo(userInfo);
        console.log(userInfo.token);
        setToken(userInfo.token);
      }

      setSplashLoading(false);
    } catch (e) {
      setSplashLoading(false);
      console.log(`is logged in error ${e}`);
    }
  };

  useEffect(() => {
    console.log(`************************************`);
    isLoggedIn();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        errorMessage,
        isLoading,
        userInfo,
        splashLoading,
        register,
        login,
        logout,
        token,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

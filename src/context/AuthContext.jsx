import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react'
import { BASE_URL } from '../config';
import { Alert, ToastAndroid } from 'react-native';
import CustomToast from '../components/CustomToast';

export const AuthContext = createContext();


export const AuthProvider = ({ children }) => {

  const [isLoading, setIsLoading] = useState(false)
  const [user, setUser] = useState(null);
  const [signupSuccess, setSignupSuccess] = useState(null);
  const [loginSuccess, setLoginSuccess] = useState(null);
  const [otpSuccess, setOtpSuccess] = useState(false);
  const [drawerUser, setDrawerUser] = useState(null);
  const [forgotPassSuccess, setForgotPassSuccess] = useState(null)

  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  console.log("User ", user);

  const setUserAfterOtpVerification = (user) => {
    if (user) {
      setDrawerUser(user);
    } else if (user === null) {
      setDrawerUser(null)
    }
    AsyncStorage.setItem('user', JSON.stringify(user));
  };


  useEffect(() => {
    const checkUser = async () => {
      try {
        const storedUser = await AsyncStorage.getItem('user');
        if (storedUser) {
          setUser(JSON.parse(storedUser))
          setDrawerUser(JSON.parse(storedUser))
        }
      } catch (error) {
        console.error('Error checking user in AsyncStorage:', error)
      }
    };
    checkUser();
  }, []);

  const signup = async ({ name, gender, mobile, email_id, address, password, ip_address }) => {
    try {
      setIsLoading(true);
      const url = `${BASE_URL}?reqAction=signup&name=${name}&gender=${gender}&mobile=${mobile}&email_id=${email_id}&address=${address}&password=${password}&ip_address=${ip_address}`;
      const response = await axios.get(url);
      console.log(response.data);

      if (response.data && response.data.requestStatus === 'Success') {
        setToastMessage('Signup successful!', response.data.msg);
        setToastVisible(true);
        // Alert.alert('Signup Successful', response.data.msg);
        setSignupSuccess(true);
      } else {
        setToastMessage('Signup failed. Please try again.');
        setToastVisible(true);
        setSignupSuccess(false);
      }
    } catch (error) {
      console.error('Error signing up:', error);
      setSignupSuccess(false);
      // console.log('signup success false');
      setToastMessage('Error', 'Something went wrong during signup.');
      setSignupSuccess(true);
    } finally {
      setIsLoading(false);
    }
  };


  const login = async ({ email, password }) => {
    try {
      setIsLoading(true)

      const url = `${BASE_URL}?reqAction=login&userregid=${email}&email=${email}&pass=${password}`;
      const response = await axios.get(url);
      if (response.data && response.data.requestStatus === 'Success') {
        const userData = { ...response.data.Content[0], verified: false };
        console.log(userData);
        setUser(userData);
        await AsyncStorage.setItem('user', JSON.stringify(userData));
        <CustomToast message={`'Login Successful', ${response.data.msg}`} />
        // Alert.alert('Login Successful', response.data.msg);
        setLoginSuccess(true)
      } else {
        <CustomToast message={`${response.data.message} || 'Invalid credentials.`} visible={true} />

        setLoginSuccess(false)
      }
    } catch (error) {
      console.log(`Login error: ${error}`);
      if (error.response) {
        Alert.alert('Error', error.response.data.msg || 'Something went wrong.');
      } else {
        Alert.alert('Error', 'Network error or server unreachable.');
      }

      setLoginSuccess(false)
    } finally {
      setIsLoading(false)
    }
  }

  const forgotPassword = async ({ email }) => {
    try {
      setIsLoading(true);
      const url = `${BASE_URL}?reqAction=forgotpwd&email=${email}`;
      const response = await axios.get(url);

      if (response.data?.requestStatus === 'Success') {
        Alert.alert('Success', response.data.msg);
        setForgotPassSuccess(true); // Updated to `true` for success
      } else {
        Alert.alert('Error', response.data?.msg || 'Something went wrong');
        setForgotPassSuccess(false);
      }
    } catch (error) {
      Alert.alert('Error', error.message || 'Network error occurred');
      setForgotPassSuccess(false);
    } finally {
      setIsLoading(false);
    }
  };



  const verifyOtp = async ({ otp }) => {
    try {
      setIsLoading(true);
      const url = `${BASE_URL}?reqAction=userchkotp&userregid=${user?.userregid}&otp=${otp}`;
      console.log(`OTP Verification URL: ${url}`);

      const response = await fetch(url);
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data?.msg || 'Failed to verify OTP.');
      }
      const otpNumber = Number(otp);
      if (user?.otp === otpNumber) {
        const updatedUser = { ...user };
        setUser(updatedUser);
        await AsyncStorage.setItem('user', JSON.stringify(updatedUser));
        setOtpSuccess(true);
      } else {
        setOtpSuccess(false);
      }
    } catch (error) {
      console.error('Error verifying OTP:', error);
      if (error.response) {
        Alert.alert('Error', error.response.data.msg || 'Something went wrong.');
      } else {
        Alert.alert('Error', 'Network error or server unreachable.');
      }
      setOtpSuccess(false);
    } finally {
      setIsLoading(false);
    }
  };


  const logout = async () => {
    setIsLoading(true)
    try {
      await AsyncStorage.removeItem('user')
      setUser(null)
      setDrawerUser(null);
    } catch (error) {
      console.log(`Logout error: ${error}`);
    } finally {
      setIsLoading(false)
    }
  }

  <CustomToast
    message={toastMessage}
    visible={toastVisible}
    onHide={() => setToastVisible(false)}
  />

  return (
    <AuthContext.Provider value={{
      user,
      drawerUser,
      setUserAfterOtpVerification,
      isLoading,
      signup,
      signupSuccess,
      login,
      loginSuccess,
      verifyOtp,
      otpSuccess,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  )
}
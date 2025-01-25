import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react'
import { BASE_URL } from '../config';
import { Alert } from 'react-native';

export const AuthContext = createContext();


export const AuthProvider = ({ children }) => {

  const [isLoading, setIsLoading] = useState(false)
  const [user, setUser] = useState(null);
  const [signupSuccess, setSignupSuccess] = useState(null);
  const [loginSuccess, setLoginSuccess] = useState(null);
  const [otpSuccess, setOtpSuccess] = useState(false);

  console.log("User ", user);



  useEffect(() => {
    const checkUser = async () => {
      try {
        const storedUser = await AsyncStorage.getItem('user');
        if (storedUser) {
          setUser(JSON.parse(storedUser))
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
        Alert.alert('Signup Successful', response.data.msg);
        setSignupSuccess(true);
      } else {
        Alert.alert('Signup Failed', response.data.msg || 'An error occurred.');
        setSignupSuccess(false);
      }
    } catch (error) {
      console.error('Error signing up:', error);
      setSignupSuccess(false);
      console.log('signup success false');
      Alert.alert('Error', 'Something went wrong during signup.');
    } finally {
      setIsLoading(false);
    }
  };


  const login = async ({ email, password }) => {
    try {
      setIsLoading(true)

      const url = `${BASE_URL}?reqAction=login&userregid=${email}&email=${email}&pass=${password}`;

      const response = await axios.get(url);
      // console.log("Response Data ", response.data);

      // console.log("Response status ", response.data.requestStatus);

      if (response.data && response.data.requestStatus === 'Success') {
        const userData = response.data.Content[0];
        console.log(userData);
        setUser(userData);
        await AsyncStorage.setItem('user', JSON.stringify(userData));
        Alert.alert('Login Successful', response.data.msg);
        setLoginSuccess(true)
      } else {
        Alert.alert('Login Failed', response.data.message || 'Invalid credentials.');
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

  // const verifyOtp = async ({ otp }) => {
  //   try {
  //     setIsLoading(true);
  //     const url = `${BASE_URL}?reqAction=userchkotp&userregid=${user?.userregid}&otp=${otp}`;
  //     console.log(`OTP Verification URL: ${url}`);

  //     const otpNumber = Number(otp);

  //     if (user?.otp === otpNumber) {
  //       const updatedUser = { ...user, verified: true };
  //       setUser(updatedUser);
  //       await AsyncStorage.setItem('user', JSON.stringify(updatedUser));
  //       setOtpSuccess(true);
  //     } else {
  //       response.data.requestStatus === 'Failed'
  //       setOtpSuccess(false);
  //     }
  //   } catch (error) {
  //     console.error('Error verifying OTP:', error);
  //     if (error.response) {
  //       Alert.alert('Error', error.response.data.msg || 'Something went wrong.');
  //     } else {
  //       Alert.alert('Error', 'Network error or server unreachable.');
  //     }
  //     setOtpSuccess(false);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

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
        const updatedUser = { ...user, verified: true };
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
    } catch (error) {
      console.log(`Logout error: ${error}`);
    } finally {
      setIsLoading(false)
    }
  }


  return (
    <AuthContext.Provider value={{ user, isLoading, signup, signupSuccess, login, loginSuccess, verifyOtp, otpSuccess, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react'
import { BASE_URL } from '../config';
import { Alert } from 'react-native';
import CustomToast from '../components/CustomToast';

export const AuthContext = createContext();


export const AuthProvider = ({ children }) => {

  const [isLoading, setIsLoading] = useState(false)
  const [user, setUser] = useState(null);
  const [otpUser, setOtpUser] = useState(null)
  const [signupSuccess, setSignupSuccess] = useState(null);
  const [loginSuccess, setLoginSuccess] = useState(null);
  const [otpSuccess, setOtpSuccess] = useState(null);
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [forgotPassSuccess, setForgotPassSuccess] = useState(null)

  console.log("User ", user);
  console.log("OTP User ", otpUser);

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


  const login = async ({ email, password }, navigation) => {
    try {
      setIsLoading(true)

      const url = `${BASE_URL}?reqAction=login&userregid=${email}&email=${email}&pass=${password}`;

      const response = await axios.get(url);

      if (response.data && response.data.requestStatus === 'Success') {
        const userData = response.data.Content[0];
        // console.log("User data ", userData);
        setUser(userData);
        await AsyncStorage.setItem('user', JSON.stringify(userData));
        if (userData?.status === '0') {
          setToastMessage('Login successful, navigating to OTP screen...');
          setToastVisible(true);
          navigation.navigate('OtpScreen');
        } else if (userData?.status === '1') {
          setToastMessage('Login successful, navigating to home screen...');
          setToastVisible(true);
          navigation.navigate('DrawerNav');
        } else {
          setToastMessage('Something went wrong');
          setToastVisible(true)
        }
        setLoginSuccess(true)
      } else {
        // Alert.alert('Login Failed', response.data.message || 'Invalid credentials.');
        setLoginSuccess(false)
        setToastVisible(false)
      }
    } catch ({ error, stack }) {
      console.log(`Login error: ${error}`);
      console.log(`Login stack: ${stack}`);
      if (error.response) {
        Alert.alert('Error', error.response.data.msg || 'Something went wrong.');
      } else {
        Alert.alert(error);
      }

      setLoginSuccess(false)
    } finally {
      setIsLoading(false)
    }
  }

  const verifyOtp = async ({ userregid, otp }) => {
    try {
      setIsLoading(true);
      const url = `${BASE_URL}?reqAction=userchkotp&userregid=${encodeURIComponent(userregid)}&otp=${encodeURIComponent(otp)}`;

      console.log('OTP Verification URL:', url);

      const response = await axios.get(url);
      console.log('OTP Verification Response:', response.data);

      if (response.data?.requestStatus === 'Success') {
        const updatedUser = { ...otpUser };
        setOtpUser(updatedUser);
        await AsyncStorage.setItem('user', JSON.stringify(updatedUser));
        setOtpSuccess(true);
      } else {
        console.log('OTP Verification Failed:', response.data);
        Alert.alert('Error', response.data?.msg || 'Invalid OTP. Please try again.');
        setOtpSuccess(false);
      }
    } catch (error) {
      console.error('OTP Verification Error:', error.message);
      Alert.alert('Error', 'Something went wrong during OTP verification.');
      setOtpSuccess(false);
    } finally {
      setIsLoading(false);
    }
  };

  const forgotPassword = async ({ email }, navigation) => {
    console.log("Forgot Navigation ", navigation);

    try {
      setIsLoading(true);
      const url = `${BASE_URL}?reqAction=forgotpwd&email=${email}`;
      const response = await axios.get(url);
      console.log("Response: ", response);

      if (response.data?.requestStatus === 'Success') {
        const userData = response.data.Content[0];
        setOtpUser(userData);
        setToastMessage(response.data.msg);
        setToastVisible(true);
        setForgotPassSuccess(true);
        if (forgotPassSuccess === true) {
          console.log("Success navigate forgot otp");
          navigation.navigate('ForgotOtp');
        } else if (forgotPassSuccess === false) {
          setToastMessage('Failed to send OTP');
          setToastVisible(true);
        }
      } else {
        setToastMessage(`Error: ${response.data?.msg || 'Something went wrong'}`);
        setToastVisible(true);
        setForgotPassSuccess(false);
      }
    } catch (error) {
      setToastMessage(`Error: ${error.message || 'Network error occurred'}`);
      setToastVisible(true);
      setForgotPassSuccess(false);
    } finally {
      setIsLoading(false);
    }
  };

  // API call to change the password
  const changePassword = async ({ userregid, newPassword, confirmPassword }, navigation) => {
    try {
      setIsLoading(true)
      const url = `${BASE_URL}?reqAction=changepwd&userregid=${userregid}&newpwd=${newPassword}&confirmpwd=${confirmPassword}`;
      console.log("Change password url ", url);

      const response = await axios.get(url);
      console.log("Response:", response.data);

      if (response.data?.requestStatus === 'Success') {
        navigation.navigate('LogIn');
        return {
          success: true,
          message: response.data.msg,
        };
      } else {
        setIsLoading(false)
        throw new Error(response.data?.msg || "Something went wrong");
      }
    } catch (error) {
      return {
        success: false,
        message: error.message || "Network error occurred",
      };
    }
    finally {
      setIsLoading(false);
    }
  };

  const logout = async (navigation) => {
    setIsLoading(true);
    try {
      await AsyncStorage.removeItem('user');
      setUser(null);
      setOtpUser(null);
      navigation.reset({
        index: 0,
        routes: [{ name: 'FirstScreen' }],
      });
    } catch (error) {
      console.log(`Logout error: ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteAccount = async ({ user }, navigation) => {
    if (!user?.userregid) {
      console.log('No user data available');
      return; // Exit if user data is not available
    }

    setIsLoading(true);
    try {
      const url = `${BASE_URL}?reqAction=userdelete&userregid=${user.userregid}`;
      console.log("Delete account URL:", url);

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        console.log('Account deleted successfully');
        navigation.navigate('First');
      } else {
        console.log('Failed to delete account');
      }
    } catch (error) {
      console.error('Error deleting account:', error);
    } finally {
      setIsLoading(false);
    }
  };



  <CustomToast
    message={toastMessage}
    visible={toastVisible}
    onHide={() => setToastVisible(false)}
  />

  return (
    <AuthContext.Provider value={{
      user,
      isLoading,
      signup,
      signupSuccess,
      login,
      loginSuccess,
      verifyOtp,
      otpSuccess,
      logout,
      otpUser,
      forgotPassword,
      forgotPassSuccess,
      changePassword,
      deleteAccount
    }}>
      {children}
    </AuthContext.Provider>
  )
}
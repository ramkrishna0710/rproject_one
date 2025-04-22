import { ImageBackground, SafeAreaView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import CustomButton from '../../components/CustomButton'
import { AuthContext } from '../../context/AuthContext'
import LoadingModal from '../../components/LoadingModal'
import CustomToast from '../../components/CustomToast'
import { deviceWidth, hp } from '../../helpers/common'
import CustomStatusbar from '../../components/CustomStatusbar'

const LogIn = ({ navigation }) => {

  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState('');


  const { user, login, isLoading, loginSuccess } = useContext(AuthContext);

  // console.log("Login log ", user);


  // useEffect(() => {
  //   if (loginSuccess) {
  //     if (user?.status === '0') {
  //       setToastMessage('Login successful, navigating to OTP screen...');
  //       setToastVisible(true);
  //       navigation.navigate('OtpScreen');
  //     } else if (user?.status === '1') {
  //       setToastMessage('Login successful, navigating to home screen...');
  //       setToastVisible(true);
  //       navigation.navigate('DrawerNav');
  //     }
  //   } else if (loginSuccess === false) {
  //     setToastMessage('Login Failed. Please try again.');
  //     setToastVisible(true);
  //   }
  // }, [loginSuccess, navigation, user]);


  const handleLogin = () => {
    const isValidEmail = (email) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    };

    if (!email) {
      setToastMessage('Email cannot be empty!');
      setToastVisible(true);
      return;
    } else if (!isValidEmail(email)) {
      setToastMessage('Please enter a valid email address!');
      setToastVisible(true);
      return;
    }

    if (!password) {
      setToastMessage('Password cannot be empty!');
      setToastVisible(true);
      return;
    }
    login({ email, password }, navigation);

  };


  return (
    <SafeAreaView style={{ flex: 1 }}>
      <CustomStatusbar />
      <ImageBackground
        source={require('../../assets/login_back.png')}
        style={styles.container}
      >
        <View style={styles.txtContainer}>
          <Text style={styles.firstTxt}>HYDROGEN</Text>
          <Text style={styles.lastTxt}>FOR LIFE</Text>
        </View>

        <TextInput
          placeholder='Please enter your registered email'
          value={email}
          style={styles.emailInput}
          keyboardType='email-address'
          placeholderTextColor="#fff"
          onChangeText={text => setEmail(text)}
          autoCapitalize='none'
        />

        <TextInput
          placeholder='Please enter your register password'
          value={password}
          style={styles.passInput}
          secureTextEntry
          placeholderTextColor="#fff"
          onChangeText={text => setPassword(text)}
        />

        <TouchableOpacity
          onPress={() => { navigation.navigate('ForgotPassword') }}
          style={styles.forgotPasswordContainer}
        >
          <Text style={styles.forgotPasswordTxt}>Forgot Password?</Text>
        </TouchableOpacity>

        {isLoading ? (
          <LoadingModal loading={isLoading} />
        ) : (
          <CustomButton
            style={styles.logInContainer}
            buttonName="Log in"
            onPress={handleLogin}
          />
        )}
      </ImageBackground>

      <CustomToast
        message={toastMessage}
        visible={toastVisible}
        onHide={() => setToastVisible(false)}
      />

    </SafeAreaView>
  )
}

export default LogIn

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    resizeMode: 'cover'
  },
  txtContainer: {
    alignItems: 'center'
  },
  firstTxt: {
    fontSize: hp(5.7),
    letterSpacing: 4.5,
    fontWeight: 'bold',
    color: 'white'
  },
  lastTxt: {
    fontSize: hp(3.5),
    letterSpacing: 8,
    color: 'white'
  },
  logInContainer: {
    height: deviceWidth * 0.16,
    width: deviceWidth * 0.85,
    borderRadius: 40,
    shadowColor: '#249646',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 4,
    backgroundColor: 'white',
    marginTop: deviceWidth * 1.15,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute'
  },
  logInTxt: {
    fontSize: hp(2.3),
    alignSelf: 'center',
    color: 'Black',
    fontWeight: 'bold'
  },
  emailInput: {
    height: deviceWidth * 0.15,
    width: deviceWidth * 0.85,
    borderRadius: 15,
    borderColor: 'white',
    borderWidth: 1,
    backgroundColor: 'transparent',
    marginTop: 40,
    paddingHorizontal: 20,
    color: 'white',
    fontSize: 13,
    fontWeight: 'bold'
  },
  passInput: {
    height: deviceWidth * 0.15,
    width: deviceWidth * 0.85,
    borderRadius: 15,
    borderColor: 'white',
    borderWidth: 1,
    backgroundColor: 'transparent',
    marginTop: 20,
    paddingHorizontal: 20,
    color: 'white',
    fontSize: 13,
    fontWeight: 'bold'
  },
  forgotPasswordContainer: {
    alignSelf: 'flex-end',
    marginEnd: 15,
    marginTop: 20,
  },
  forgotPasswordTxt: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: hp(1.8)
  }
})
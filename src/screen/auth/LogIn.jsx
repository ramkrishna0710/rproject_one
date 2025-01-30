import { ImageBackground, SafeAreaView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import CustomButton from '../../components/CustomButton'
import { AuthContext } from '../../context/AuthContext'
import LoadingModal from '../../components/LoadingModal'
import CustomToast from '../../components/CustomToast'

const LogIn = ({ navigation }) => {

  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState('');


  const { user, login, isLoading, loginSuccess } = useContext(AuthContext);

  console.log("Login log ", user);


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
    if (!email) {
      setToastMessage('Email cannot be empty!');
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
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
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
    fontSize: 45,
    letterSpacing: 4.5,
    fontWeight: 'bold',
    color: 'white'
  },
  lastTxt: {
    fontSize: 28,
    letterSpacing: 8,
    color: 'white'
  },
  logInContainer: {
    height: '8%',
    width: '85%',
    borderRadius: 40,
    shadowColor: '#249646',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    elevation: 3,
    backgroundColor: 'white',
    marginTop: 30,
    justifyContent: 'center',
    alignItems: 'center'
  },
  logInTxt: {
    fontSize: 16,
    alignSelf: 'center',
    color: 'Black',
    fontWeight: 'bold'
  },
  emailInput: {
    height: 50,
    width: '85%',
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
    height: 50,
    width: '85%',
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
    fontSize: 14
  }
})
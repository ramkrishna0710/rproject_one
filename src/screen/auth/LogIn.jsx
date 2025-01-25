import { ActivityIndicator, Alert, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import LinearGradient from 'react-native-linear-gradient'
import CustomButton from '../../components/CustomButton'
import { AuthContext } from '../../context/AuthContext'

const LogIn = ({ navigation }) => {

  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  const { user, login, isLoading, loginSuccess} = useContext(AuthContext);

  useEffect(() => {
    if(loginSuccess === true  && user !== null) {
      console.log('Login successful, navigate to otp screen');
      navigation.navigate('OtpScreen');
    } else if(loginSuccess === false) {
      Alert.alert('Login Failed', 'Please try again.');
    }
  }, [loginSuccess, navigation]);

  const handleLogin = () => {
    login({ email, password });
  };


  return (
    <SafeAreaView style={{ flex: 1 }}>

      <LinearGradient colors={['#27974b', '#4ab24f', '#72d054']} style={styles.container}>
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

        <TouchableOpacity onPress={() => { }}
          style={styles.forgotPasswordContainer}
        >
          <Text style={styles.forgotPasswordTxt}>Forgot Password?</Text>
        </TouchableOpacity>

        {isLoading ? (
          <ActivityIndicator size="large" color="#fff" />
        ) : (
          <CustomButton
            style={styles.logInContainer}
            buttonName="Log in"
            onPress={handleLogin}
          />
        )}
      </LinearGradient>
    </SafeAreaView>
  )
}

export default LogIn

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
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
    marginTop: 40,
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
    borderRadius: 40,
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
    borderRadius: 40,
    borderColor: 'white',
    borderWidth: 1,
    backgroundColor: 'transparent',
    marginTop: 40,
    paddingHorizontal: 20,
    color: 'white',
    fontSize: 13,
    fontWeight: 'bold'
  },
  forgotPasswordContainer: {
    alignSelf: 'flex-end',
    marginEnd: 15,
    marginTop: 15,
  },
  forgotPasswordTxt: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14
  }
})
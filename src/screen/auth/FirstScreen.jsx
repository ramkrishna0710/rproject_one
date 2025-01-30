import { ImageBackground, SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CustomButton from '../../components/CustomButton'

const FirstScreen = ({ navigation }) => {
  console.warn("");
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

        <CustomButton style={styles.logInContainer} buttonName="Log in" onPress={() => {
          navigation.navigate('LogIn')
        }} />
        <CustomButton style={styles.registerContainer} buttonName="Register Now" onPress={() => {
          navigation.navigate('SignUp')
        }} />

      </ImageBackground>
    </SafeAreaView>
  )
}

export default FirstScreen

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
    backgroundColor: '#fff',
    marginTop: 40,
    justifyContent: 'center',
    alignItems: 'center'
  },
  logInTxt: {
    fontSize: 16,
    alignSelf: 'center',
    color: 'black',
    fontWeight: 'bold'
  },
  registerContainer: {
    height: '8%',
    width: '85%',
    borderRadius: 40,
    shadowColor: '#249646',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    elevation: 3,
    backgroundColor: '#fff',
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  registerTxt: {
    fontSize: 16,
    alignSelf: 'center',
    color: 'black',
    fontWeight: 'bold'
  },
})
import { SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useContext, useState } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import CustomToast from '../components/CustomToast';
import CustomButton from '../components/CustomButton';
import LoadingModal from '../components/LoadingModal';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';

const ChangePassword = ({ navigation }) => {
  const { user, changePassword, isLoading } = useContext(AuthContext);
  const [password, setPassword] = useState('');
  const [reEnterPass, setReEnterPass] = useState('');
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const handleChangePassword = async () => {
    if (!password) {
      setToastMessage('Password cannot be empty!');
      setToastVisible(true);
      return;
    }
    if (!reEnterPass) {
      setToastMessage('Re-enter password cannot be empty!');
      setToastVisible(true);
      return;
    }
    if (password !== reEnterPass) {
      setToastMessage('Passwords do not match!');
      setToastVisible(true);
      return;
    }

    const { success, message } = await changePassword({
      userregid: user?.userregid,
      newPassword: password,
      confirmPassword: reEnterPass,
    });

    setToastMessage(message);
    setToastVisible(true);

    if (success) {
      navigation.navigate('LogIn');
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <LinearGradient colors={['#27974b', '#4ab24f', '#72d054']} style={styles.container}>
        <View style={styles.txtContainer}>
          <Text style={styles.firstTxt}>HYDROGEN</Text>
          <Text style={styles.lastTxt}>FOR LIFE</Text>
        </View>

        <TextInput
          placeholder='Please set your password'
          value={password}
          style={styles.emailInput}
          secureTextEntry
          placeholderTextColor="#fff"
          onChangeText={text => setPassword(text)}
        />

        <TextInput
          placeholder='Please re-enter your password'
          value={reEnterPass}
          style={styles.passInput}
          secureTextEntry
          placeholderTextColor="#fff"
          onChangeText={text => setReEnterPass(text)}
        />

        {isLoading ? (
          <LoadingModal loading={isLoading} />
        ) : (
          <CustomButton
            style={styles.logInContainer}
            buttonName="Submit"
            onPress={handleChangePassword}
          />
        )}
      </LinearGradient>

      <CustomToast
        message={toastMessage}
        visible={toastVisible}
        onHide={() => setToastVisible(false)}
      />
    </SafeAreaView>
  );
};

export default ChangePassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtContainer: {
    alignItems: 'center',
  },
  firstTxt: {
    fontSize: 45,
    letterSpacing: 4.5,
    fontWeight: 'bold',
    color: 'white',
  },
  lastTxt: {
    fontSize: 28,
    letterSpacing: 8,
    color: 'white',
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
    alignItems: 'center',
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
    fontWeight: 'bold',
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
    fontWeight: 'bold',
  },
});

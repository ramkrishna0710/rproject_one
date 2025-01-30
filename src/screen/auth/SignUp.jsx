import React, { useContext, useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, Text, Alert, ActivityIndicator, ImageBackground, StatusBar } from 'react-native';
import CustomTextInput from '../../components/CustomTextInput';
import CustomButton from '../../components/CustomButton';
import { AuthContext } from '../../context/AuthContext';
import CustomToast from '../../components/CustomToast';
import LoadingModal from '../../components/LoadingModal';

const SignUp = ({ navigation }) => {
  const [name, setName] = useState('');
  const [gender, setGender] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [password, setPassword] = useState('');
  const [reEnterPassword, setReEnterPassword] = useState('');
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const { isLoading, signup, signupSuccess } = useContext(AuthContext);

  useEffect(() => {
    if (signupSuccess === true) {
      setToastMessage('Signup successful!');
      setToastVisible(true);
      navigation.navigate('OtpScreen')
    } else if (signupSuccess === false) {
      setToastMessage('Signup failed. Please try again.');
      setToastVisible(true);
    }
  }, [signupSuccess, navigation]);

  const showToast = (message) => {
    setToastMessage(message);
    setToastVisible(true);
  };

  const handleSignUp = () => {
    if (!name || name.length < 4) {
      showToast('Name cannot be empty.');
      return;
    }

    if (!gender || gender.length < 4) {
      showToast('Gender cannot be empty.');
      return;
    }

    if (!mobile || mobile.length < 10) {
      showToast('Enter a valid mobile number.');
      return;
    }

    if (!email || !email.includes('@')) {
      showToast('Enter a valid email address.');
      return;
    }

    if (!address) {
      showToast('Address cannot be empty.');
      return;
    }

    if (!password || password.length < 6) {
      showToast('Password must be at least 6 characters long.');
      return;
    }

    if (password !== reEnterPassword) {
      showToast('Passwords do not match.');
      return;
    }

    signup({
      name,
      gender,
      mobile,
      email_id: email,
      address,
      password,
      ip_address: '127.0.0.1',
    });
  };

  return (
    <ImageBackground
      source={require('../../assets/login_back.png')}
      style={styles.container}
    >
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
      <Text style={styles.headerTxt}>Enter your details to register</Text>

      <CustomTextInput placeholderText="Enter name" value={name} onChangeText={setName} />
      <CustomTextInput placeholderText="Enter gender" value={gender} onChangeText={setGender} />
      <CustomTextInput placeholderText="Enter mobile" keyboardType='number-pad' value={mobile} onChangeText={setMobile} />
      <CustomTextInput placeholderText="Address" value={address} onChangeText={setAddress} />
      <CustomTextInput placeholderText="Email address" keyboardType={'email-address'} value={email} onChangeText={setEmail} />
      <CustomTextInput placeholderText="Create password" value={password} onChangeText={setPassword} secureTextEntry />
      <CustomTextInput placeholderText="Re-enter password" value={reEnterPassword} onChangeText={setReEnterPassword} secureTextEntry />

      {isLoading ? (
        <LoadingModal loading={isLoading} />
      ) : (
        <CustomButton buttonName="Submit" onPress={handleSignUp} />
      )}
      <CustomToast
        message={toastMessage}
        visible={toastVisible}
        onHide={() => setToastVisible(false)}
      />
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    resizeMode: 'cover'
  },
  headerTxt: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    padding: 20,
    textAlign: 'center',
  },
});

export default SignUp;

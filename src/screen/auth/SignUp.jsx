import React, { useContext, useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, Text, Alert, ActivityIndicator } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import CustomTextInput from '../../components/CustomTextInput';
import CustomButton from '../../components/CustomButton';
import { AuthContext } from '../../context/AuthContext';

const SignUp = ({ navigation }) => {
  const [name, setName] = useState('');
  const [gender, setGender] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [password, setPassword] = useState('');
  const [reEnterPassword, setReEnterPassword] = useState('');

  const { signup, signupSuccess, isLoading } = useContext(AuthContext);

  useEffect(() => {    
    if (signupSuccess === true) {
      console.log('Signup successful, navigating to Login');
      navigation.navigate('LogIn');
    } else if (signupSuccess === false) {
      Alert.alert('Signup Failed', 'Please try again.');
    }
  }, [signupSuccess, navigation]);

  const handleSignUp = () => {
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
    <SafeAreaView style={{ flex: 1 }}>
      <LinearGradient colors={['#27974b', '#4ab24f', '#72d054']} style={styles.container}>
        <Text style={styles.headerTxt}>Enter your details to register</Text>

        <CustomTextInput placeholderText="Enter name" value={name} onChangeText={setName} />
        <CustomTextInput placeholderText="Enter gender" value={gender} onChangeText={setGender} />
        <CustomTextInput placeholderText="Enter mobile" keyboardType='number-pad' value={mobile} onChangeText={setMobile} />
        <CustomTextInput placeholderText="Address" value={address} onChangeText={setAddress} />
        <CustomTextInput placeholderText="Email address" keyboardType={'email-address'} value={email} onChangeText={setEmail} />
        <CustomTextInput placeholderText="Create password" value={password} onChangeText={setPassword} secureTextEntry />
        <CustomTextInput placeholderText="Re-enter password" value={reEnterPassword} onChangeText={setReEnterPassword} secureTextEntry />

        {isLoading ? (
          <ActivityIndicator size="large" color="#ffffff" />
        ) : (
          <CustomButton buttonName="Submit" onPress={handleSignUp} />
        )}
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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

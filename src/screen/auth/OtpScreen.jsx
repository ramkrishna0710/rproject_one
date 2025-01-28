import { ActivityIndicator, Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import CustomTextInput from '../../components/CustomTextInput'
import CustomButton from '../../components/CustomButton';
import LinearGradient from 'react-native-linear-gradient';
import { AuthContext } from '../../context/AuthContext';
import { theme } from '../../constants/theme';
import LoadingModal from '../../components/LoadingModal';
import CustomToast from '../../components/CustomToast';

const OtpScreen = ({ navigation }) => {

  const [otp, setOtp] = useState(null);
  const [timeLeft, setTimeLeft] = useState(59);
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const { user, isLoading, verifyOtp, otpSuccess } = useContext(AuthContext);

  useEffect(() => {
    if (otpSuccess === true) {
      setToastMessage('OTP Verified Successfully!');
      setToastVisible(true);
      navigation.navigate('LogIn');
    } else if (otpSuccess === false) {
      setToastMessage('Invalid OTP. Please try again.');
      setToastVisible(true);
    }
  }, [otpSuccess, navigation, user]);
  

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [timeLeft]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
  };

  const handleOtpVerification = async () => {
    if (!otp || otp.trim() === '') {
      return;
    }
    await verifyOtp({ otp })
  }

  return (
    <LinearGradient colors={['#27974b', '#4ab24f', '#72d054']} style={styles.container}>
      <View style={styles.txtContainer}>
        <Text style={styles.firstTxt}>HYDROGEN</Text>
        <Text style={styles.lastTxt}>FOR LIFE</Text>
      </View>

      <Text style={styles.txt}>Enter the ont-time password sent to your registerd email address</Text>

      <CustomTextInput
        placeholderText="Enter OTP"
        placeholderColor="white"
        keyboardType='number-pad'
        value={otp}
        secureTextEntry={false}
        onChangeText={(text) => { setOtp(text) }}
      />

      <View style={styles.resendOtpContainer}>
        {timeLeft === 0 ? (
          <>
            <Text style={{ fontSize: 14, color: theme.colors.white }}>
              Haven't received OTP yet?{' '}
            </Text>
            <TouchableOpacity onPress={() => setTimeLeft(59)}>
              <Text style={styles.resendTxt}>Resend email</Text>
            </TouchableOpacity>
          </>
        ) : (
          // You can optionally hide the resend message or just show a countdown here.
          <View style={styles.timerContainer}>
            <Text style={styles.timerText}>00:{formatTime(timeLeft)}</Text>
          </View>
        )}
      </View>


      {isLoading ? (
        <LoadingModal loading={isLoading} />
      ) : (
        <CustomButton buttonName="Verify" onPress={handleOtpVerification} />
      )}

      <CustomToast
        message={toastMessage}
        visible={toastVisible}
        onHide={() => setToastVisible(false)}
      />
    </LinearGradient>
  )
}

export default OtpScreen

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
  txt: {
    padding: 12,
    fontWeight: 'bold',
    fontSize: 14,
    color: theme.colors.white,
    textAlign: 'center',
  },
  resendOtpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20
  },
  resendTxt: {
    fontWeight: 'bold',
    fontSize: 16,
    color: theme.colors.white
  },
  otpContainer: {
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
    alignItems: 'center',
  },
  timerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10
  },
  timerText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: theme.colors.white
  }
})
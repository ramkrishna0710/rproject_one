import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useContext, useState } from 'react'
import { theme } from '../constants/theme'
import { hp } from '../helpers/common'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { AuthContext } from '../context/AuthContext'
import SuccessModal from '../components/SuccessModal'

const QandA = ({ navigation }) => {

  const [question, setQuestion] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const { loading, user } = useContext(AuthContext);

  const handleSubmit = async () => {
    if (!question.trim()) {
      Alert.alert('Error', 'Please enter a question before submitting.');
      return;
    }

    const payload = {
      user_id: user?.userregid,
      session_id: 1,
      event_id: 1,
      question: question.trim(),
    };

    try {
      const response = await fetch('https://runtimeeventapp.com/hforlife/api/question', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      // console.log('Response status:', response.status);

      const text = await response.text();
      console.log('Raw response text:', text);

      try {
        const data = JSON.parse(text);
        if (response.ok) {
          setModalVisible(true);
          // Alert.alert('Success', 'Your question has been submitted!');
          setQuestion('');
        } else {
          Alert.alert('Error', data.message || 'Submission failed.');
        }
      } catch (jsonError) {
        console.error('Failed to parse JSON:', jsonError);
        Alert.alert('Error', 'Unexpected response from the server.');
      }
    } catch (error) {
      console.error('Error occurred:', error);
      Alert.alert('Error', 'Something went wrong. Please try again.');
    }
  };




  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => { navigation.goBack() }}>
          <AntDesign name='left' size={hp(3)} style={styles.arrowLeft} />
        </TouchableOpacity>
        <Text style={styles.headerText}>Q&A</Text>
      </View>
      {
        loading ? (
          <LoadingModal loading={loading} />
        ) : (
          <>
            <Text style={styles.textContainer}>Plaease submit your questions to the panellists and keynote speakers here:</Text>
            <TextInput
              placeholder='Write your question here 500 characters max'
              style={styles.textInputContainer}
              multiline
              value={question}
              onChangeText={setQuestion}
            />

            <TouchableOpacity
              style={styles.btnStyle}
              onPress={handleSubmit}
            >
              <Text style={styles.btnText}>Submit</Text>
            </TouchableOpacity>

            <SuccessModal
              modalVisible={modalVisible}
              onClose={() => setModalVisible(false)}
            />
          </>
        )}
    </View>
  )
}

export default QandA

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.white,
  },
  header: {
    padding: 16,
    backgroundColor: theme.colors.white,
    flexDirection: 'row',
    alignItems: 'center'
  },
  arrowLeft: {
    color: theme.colors.primary
  },
  headerText: {
    fontSize: hp(3.2),
    fontWeight: theme.fonts.bold,
    color: theme.colors.primary,
    textAlign: 'center',
    flex: 1
  },
  textContainer: {
    alignItems: 'center',
    alignSelf: 'center',
    fontSize: hp(2.2),
    color: theme.colors.textLight,
    padding: theme.padding.xxl
  },
  textInputContainer: {
    width: '90%',
    height: hp(30),
    borderWidth: 1.5,
    borderColor: theme.colors.primary,
    borderRadius: theme.radius.md,
    alignSelf: 'center',
    padding: theme.padding.sm,
    fontSize: hp(2),
    color: theme.colors.black,
    backgroundColor: theme.colors.white,
    textAlignVertical: 'top'
  },
  btnStyle: {
    width: '50%',
    backgroundColor: theme.colors.primary,
    borderRadius: theme.radius.sm,
    alignSelf: 'center',
    marginTop: hp(3),
    paddingVertical: hp(1.5),
    alignItems: 'center',
  },
  btnText: {
    fontSize: hp(2.2),
    color: theme.colors.white,
    fontWeight: theme.fonts.bold,
  },

})
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

const CustomButton = ({ buttonName, onPress, isLoading = false }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.logInContainer}>
      {isLoading ? 
        <ActivityIndicator size={'small'} color={'black'} /> :
        <Text style={styles.logInTxt}>{buttonName}</Text>
      }
    </TouchableOpacity>
  )
}

export default CustomButton

const styles = StyleSheet.create({
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
    color: 'black',
    fontWeight: 'bold'
  },
})
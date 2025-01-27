import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { theme } from '../constants/theme'
import LoadingModal from './LoadingModal'

const CustomButton = ({ buttonName, onPress, isLoading = false, style, borderColor, backgroundColor = theme.colors.white, color = theme.colors.black }) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.logInContainer, { backgroundColor, borderColor }, style]}>
      {isLoading ? 
        <LoadingModal loading={isLoading}/> :
        <Text style={[styles.logInTxt, {color}]}>{buttonName}</Text>
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
    elevation: 5,
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1
  },
  logInTxt: {
    fontSize: 16,
    alignSelf: 'center',
    fontWeight: 'bold'
  },
})
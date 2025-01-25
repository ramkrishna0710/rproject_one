import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { theme } from '../constants/theme';

const ModalButton = ({ buttonName, onPress, isLoading = false, borderColor = 'black', backgroundColor = 'white', txtColor= 'black' }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.logInContainer, { borderColor: borderColor, backgroundColor: backgroundColor }]}
    >
      {isLoading ? (
        <ActivityIndicator size="small" color="black" />
      ) : (
        <Text style={[styles.logInTxt, { color: txtColor}]}>{buttonName}</Text>
      )}
    </TouchableOpacity>
  );
};

export default ModalButton;

const styles = StyleSheet.create({
  logInContainer: {
    borderRadius: 40,
    shadowColor: '#249646',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 3,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: theme.padding.sm,
    paddingHorizontal: theme.padding.xxl,
    marginHorizontal: theme.padding.md, 
  },
  logInTxt: {
    fontSize: 16,
    alignSelf: 'center',
    fontWeight: 'bold',
  },
});

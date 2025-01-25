import { StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'

const CustomTextInput = ({placeholderText, placeholderColor, value, onChangeText, secureTextEntry=false, keyboardType}) => {
    return (
        <View style={styles.container}>
            <TextInput
                placeholder={placeholderText}
                style={styles.emailInput}
                placeholderTextColor={placeholderColor}
                value={value}
                onChangeText={onChangeText}
                secureTextEntry={secureTextEntry}
                keyboardType={keyboardType}
            />
        </View>
    )
}

export default CustomTextInput

const styles = StyleSheet.create({
    container: {
    width: '100%',
    alignItems: 'center',
  },
    emailInput: {
    height: 50,
    width: '85%',
    borderRadius: 40,
    borderColor: 'white',
    borderWidth: 1,
    backgroundColor: 'transparent',
    marginTop: 20,
    paddingHorizontal: 20,
    color: 'white',
    fontSize: 14,
    fontWeight: '500'
  },
})
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { theme } from '../constants/theme';
import { hp } from '../helpers/common';
import Feather from 'react-native-vector-icons/Feather'
import AntDesign from 'react-native-vector-icons/AntDesign'


const DetailsCard = ({ imageUri, title, description, buttons }) => {
  return (
    <View style={styles.container}>

      {/* Header Image */}
      <Image source={{ uri: imageUri }} style={styles.image} />
      <AntDesign name='left' size={hp(3)} style={styles.arrowLeft} />

      {/* Title and Description */}
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>

      {/* Buttons Section */}
      <View style={styles.buttonsContainer}>
        {buttons.map((button, index) => (
          <TouchableOpacity
            key={index}
            style={styles.button}
            onPress={button.onPress}
          >
            <Feather name={button.iconName} size={hp(2.7)} style={styles.buttonIcon} />
            <Text style={styles.buttonText}>{button.text}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

export default DetailsCard

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  arrowLeft: {
    marginRight: theme.padding.sm,
    position: 'absolute',
    color: theme.colors.white,
    margin: theme.radius.sm
  },
  image: {
    width: '100%',
    height: hp(40),
    resizeMode: 'cover',
    position: 'absolute'
  },
  textContainer: {
    padding: theme.radius.xl,
    margin: theme.radius.sm,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: theme.colors.gray,
    elevation: 2,
    marginTop: hp(34),
    backgroundColor: theme.colors.white
  },
  title: {
    fontSize: hp(2.5),
    fontWeight: theme.fonts.bold,
    color: theme.colors.textDark,
    marginBottom: hp(2.5),
  },
  description: {
    fontSize: hp(2),
    color: theme.colors.textLight,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: hp(1),
    margin: theme.radius.lg
  },
  button: {
    flex: 1,
    flexDirection: 'row',
    marginHorizontal: 8,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: theme.colors.gray,
    elevation: 2,
    justifyContent: 'center'
  },
  buttonText: {
    fontSize: hp(2.4),
    fontWeight: theme.fonts.bold,
    color: theme.colors.textLight,
  },
  buttonIcon: {
    color: theme.colors.primary,
    marginLeft: hp(1),
    marginRight: hp(1)
  }
});
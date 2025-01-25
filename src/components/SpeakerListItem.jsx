import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { hp, wp } from '../helpers/common';
import { theme } from '../constants/theme';

const SpeakerListItem = ({ imageUri, name, title }) => {
  return (
    <View style={styles.container}>
      <Image source={{ uri: imageUri }} style={styles.image} />
      <View style={styles.textContainer}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.title}>{title}</Text>
      </View>
    </View>
  );
};

export default SpeakerListItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: theme.padding.sm,
    marginVertical: 6,
    marginHorizontal: theme.radius.sm,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    shadowColor: theme.colors.gray,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  image: {
    width: wp(21),
    height: hp(10),
    backgroundColor: '#E0E0E0',
    borderRadius: theme.radius.sm
  },
  textContainer: {
    marginLeft: hp(1.5),
    flex: 1,
  },
  name: {
    fontSize: hp(2.5),
    fontWeight: theme.fonts.bold,
    color: theme.colors.text,
  },
  title: {
    fontSize: hp(1.8),
    color: theme.colors.textLight,
  },
});

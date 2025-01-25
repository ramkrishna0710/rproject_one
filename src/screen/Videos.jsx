import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { useNavigation } from '@react-navigation/native';
import { theme } from '../constants/theme';
import { hp } from '../helpers/common';
import VideoSlider from '../components/VideoSlider';


const Videos = ({ navigation, route }) => {
  const videosItem = route?.params?.data || [];
  // console.warn("Videos Section", videosItem);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.arrowLeft} onPress={() => { navigation.goBack() }}>
          <AntDesign name='left' size={hp(3)} color={theme.colors.primary} />
        </TouchableOpacity>
        <Text style={styles.headerText}>Videos</Text>
      </View>
      <VideoSlider videosData={videosItem} horizontal={false} />
    </View>
  )
}

export default Videos

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.white,
    marginBottom: theme.padding.sm
  },
  header: {
    padding: theme.radius.md,
    backgroundColor: theme.colors.white,
    flexDirection: 'row',
    alignItems: 'center'
  },
  arrowLeft: {
    // marginRight: theme.padding.sm
  },
  headerText: {
    fontSize: hp(3.2),
    fontWeight: theme.fonts.bold,
    color: theme.colors.primary,
    textAlign: 'center',
    flex: 1
  },
})
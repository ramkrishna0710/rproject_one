import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { hp } from '../helpers/common'
import { theme } from '../constants/theme'
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { useNavigation } from '@react-navigation/native';

const Maps = () => {

  const navigation = useNavigation();
  
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={{ padding: theme.padding.xxs, position: 'absolute' }}
      >
        <AntDesign name="left" size={hp(3.2)} color={theme.colors.primary} />
      </TouchableOpacity>
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <View style={styles.mapContainer}></View>
        <View style={styles.contentContainer}>
          <View style={styles.detailsLocation}>
            <Image source={require('./../assets/image.png')} style={styles.imgContainer} />
            <Text style={styles.txtMain}>The Oval Cricket Ground</Text>
            <View style={styles.locationContainer}>
              {/* Icon and Link */}
              <Text style={styles.locationText}>The Oval Cricket Ground London, Kennington Oval, London SE11 5SS, United Kingdom.</Text>
              <TouchableOpacity onPress={() => { }} style={styles.linkContainer}>
                <Ionicons name="globe-outline" size={hp(3)} color={theme.colors.primary} />
                <Text style={styles.url}>www.kiaoval.com/</Text>
                <Ionicons name="share-outline" size={hp(3)} color={theme.colors.primary} />
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity style={styles.directionContainer}>
            <FontAwesome5 name="map-marked-alt" size={hp(3)} color={theme.colors.primary} />
            <Text style={styles.directionText}>Click here for directions</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  )
}

export default Maps

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollViewContainer: {
    paddingBottom: theme.padding.lg,
  },
  mapContainer: {
    width: '100%',
    height: hp(45),
  },
  contentContainer: {
    marginTop: hp(2),
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    width: '94%',
  },
  detailsLocation: {
    width: '100%',
    borderRadius: theme.radius.xs,
    shadowColor: theme.colors.lightGrey,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
    padding: theme.padding.xxs,
    backgroundColor: 'white',
    marginBottom: theme.padding.xs,
  },
  imgContainer: {
    height: hp(32),
    width: '100%',
    borderRadius: theme.radius.xs,
    resizeMode: 'cover',
    marginBottom: theme.padding.xxs,
  },
  txtMain: {
    fontSize: hp(2.5),
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: theme.padding.xxs,
    color: theme.colors.primary
  },
  locationContainer: {
    marginTop: theme.padding.xs,
    alignItems: 'flex-start',
    paddingHorizontal: theme.padding.xs,
  },
  locationText: {
    fontSize: hp(2),
    color: theme.colors.lightGrey,
    fontWeight: theme.fonts.bold,
    marginBottom: theme.padding.xxs,
  },
  linkContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: theme.padding.xxs,
  },
  url: {
    fontSize: hp(2),
    color: theme.colors.lightGrey,
    fontWeight: theme.fonts.bold,
    marginHorizontal: 8,
    flexShrink: 1,
  },
  directionContainer: {
    marginTop: theme.padding.xxs,
    borderRadius: theme.radius.xs,
    width: '98%',
    alignItems: 'center',
    flexDirection: 'row',
    shadowColor: theme.colors.lightGrey,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
    padding: theme.padding.xl,
    backgroundColor: 'white',
  },
  directionText: {
    color: theme.colors.lightGrey,
    fontSize: hp(2.2),
    fontWeight: 'bold',
    paddingHorizontal: theme.padding.xl
  },
})

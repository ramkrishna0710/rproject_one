import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native'
import React from 'react'
import LinearGradient from 'react-native-linear-gradient'
import Entypo from 'react-native-vector-icons/Entypo';
import { hp } from '../helpers/common';
import { theme } from '../constants/theme';

const MyProfile = () => {
  return (
    <View style={{ flex: 1 }}>
      <LinearGradient
        colors={['#7fdb56', '#5bbe51', '#2c9c4a']}
        style={styles.gradientStyle}
      >
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Entypo name="chevron-left" size={35} color={theme.colors.white} />
        </TouchableOpacity>
        <Text style={styles.headerTxt}>My Profile</Text>
      </LinearGradient>

      <Image
        source={require('../assets/image.png')}
        style={styles.eventImg}
      />

      <Text style={styles.sessionTxt}>Session Remainder</Text>
      <View style={styles.sessionContainer}>
        <View style={styles.verDivider} />
        <View style={{
          justifyContent: 'center',
          alignItems: 'center',
          alignSelf: 'center',
          padding: theme.padding.xxs
        }}>
          <View style={styles.sessionNameContainer}>
            <Text style={styles.nameTxt}>Session Name : </Text>
            <Text style={styles.regTxt} numberOfLines={5}>Registration desks open</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.sessionDateTimeContainer}>
            <View style={styles.dateContainer}>
              <Text style={styles.dateTxt}>Date : </Text>
              <Text style={styles.date}>25-06-2025</Text>
            </View>
            <View style={styles.timeContainer}>
              <Text style={styles.timeTxt}>Time : </Text>
              <Text style={styles.time}>09:00 AM</Text>
            </View>
          </View>
        </View>
      </View>

    </View>
  )
}

export default MyProfile

const styles = StyleSheet.create({
  gradientStyle: {
    height: hp(25),
    borderBottomLeftRadius: theme.radius.xxl,
    borderBottomRightRadius: theme.radius.xxl,
  },
  headerTxt: {
    color: theme.colors.white,
    fontSize: hp(3.5),
    fontWeight: theme.fonts.bold,
    alignItems: 'center',
    alignSelf: 'center',
    paddingVertical: theme.padding.xxl
  },
  eventImg: {
    height: hp(26),
    width: '90%',
    position: 'absolute',
    resizeMode: 'cover',
    borderRadius: theme.radius.xxl,
    marginTop: hp(15),
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    shadowColor: theme.colors.gray,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.6,
    shadowRadius: 4,
    elevation: 8,
  },
  sessionTxt: {
    fontSize: hp(2.4),
    fontWeight: theme.fonts.bold,
    color: theme.colors.lightGrey,
    paddingHorizontal: theme.padding.md,
    marginTop: hp(19.2),
  },
  verDivider: {
    width: 1,
    position: 'absolute',
    backgroundColor: theme.colors.primary,
    height: "90%",
    marginVertical: theme.padding.xxs,
    justifyContent: 'center',
    alignItems: 'center',
    margin: theme.padding.xxs
  },
  sessionContainer: {
    width: '95%',
    marginTop: theme.padding.lg,
    borderRadius: theme.radius.xxl,
    justifyContent: 'center',
    alignSelf: 'center',
    shadowColor: theme.colors.gray,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    elevation: 3,
    padding: theme.padding.xxs
  },
  sessionNameContainer: {
    flexDirection: 'row',
    padding: theme.padding.xxs,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  nameTxt: {
    fontSize: hp(2),
    fontWeight: theme.fonts.bold,
    color: theme.colors.lightGrey,
  },
  regTxt: {
    color: theme.colors.primary,
    fontSize: hp(2),
    width: "60%"
  },
  divider: {
    width: '95%',
    height: 1,
    backgroundColor: theme.colors.primary,
    position: 'absolute',
    marginTop: theme.padding.xl
  },
  sessionDateTimeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  },
  dateContainer: {
    flexDirection: 'row',
    padding: theme.padding.xxs
  },
  dateTxt: {
    fontSize: hp(2),
    fontWeight: theme.fonts.bold,
    color: theme.colors.lightGrey,
  },
  date: {
    fontSize: hp(2),
  },
  timeContainer: {
    flexDirection: 'row',
    padding: theme.padding.xxs
  },
  timeTxt: {
    fontSize: hp(2),
    fontWeight: theme.fonts.bold,
    color: theme.colors.lightGrey,
  },
  time: {
    fontSize: hp(2),
  }
})
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { theme } from '../constants/theme'
import { hp, wp } from '../helpers/common'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Entypo from 'react-native-vector-icons/Entypo'
import { useNavigation } from '@react-navigation/native'

const Speakers = ({ route }) => {

  const speakersItem = route?.params?.data || [];
  // console.log("Received speakersItem:", speakersItem);

  const navigation = useNavigation();

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.speakerContainer} onPress={() => navigation.navigate('SpeakersDetailsMain', { speakersItem: item })}>
      <Image
        source={{
          uri: item.profile_pic
            ? `https://runtimeeventapp.com/hforlife/${item.profile_pic}`
            : 'https://via.placeholder.com/100',
        }}
        style={styles.speakerImg}
      />
      <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
        <View style={styles.desContainer}>
          <Text style={styles.speakerName}>{item.name}</Text>
          <Text style={styles.speakerDescription} numberOfLines={1}>{item.company_name}</Text>
        </View>
        <Entypo name='chevron-right' size={25} color={theme.colors.primary} style={{ marginRight: 10, alignSelf: 'center' }} />
      </View>
    </TouchableOpacity>
  )
  return (
    <View style={styles.container}>

      <View style={styles.header}>
        <TouchableOpacity style={styles.arrowLeft} onPress={() => { navigation.goBack() }}>
          <AntDesign name='left' size={hp(3)} color={theme.colors.primary} />
        </TouchableOpacity>
        <Text style={styles.headerText}>Speakers</Text>
      </View>
      <FlatList
        data={speakersItem}
        keyExtractor={(item, index) => item.toString()}
        renderItem={renderItem}
      />
    </View>
  )
}

export default Speakers

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
    // marginRight: theme.padding.sm,
    color: theme.colors.primary
  },
  headerText: {
    fontSize: hp(3.2),
    fontWeight: theme.fonts.bold,
    color: theme.colors.primary,
    textAlign: 'center',
    flex: 1
  },
  speakerContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: theme.padding.xxs,
    borderRadius: theme.radius.xxs,
    shadowColor: theme.colors.gray,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    elevation: 2,
    margin: theme.radius.xs
  },
  speakerName: {
    fontSize: theme.fontSize.md,
    fontWeight: theme.fonts.bold,
    color: theme.colors.dark
  },
  speakerDescription: {
    fontSize: theme.fontSize.sm,
    flexShrink: 1,
    overflow: 'hidden',
    maxWidth: wp(60),
  },
  speakerImg: {
    height: hp(8.5),
    width: wp(18),
    borderRadius: theme.radius.xxs,
    shadowColor: theme.colors.gray,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 3,
  },
  desContainer: {
    paddingHorizontal: theme.padding.xxs,
    justifyContent: 'flex-start'

  }
})
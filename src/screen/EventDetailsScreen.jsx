import { Image, StatusBar, StyleSheet, Text, TouchableOpacity, View, ScrollView, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import Entypo from 'react-native-vector-icons/Entypo';
import { hp, wp } from '../helpers/common';
import { theme } from '../constants/theme';
import { fetchEventDetailsID } from '../helpers/api';

const data = [
  { id: "1", title: "H4Life 2024", description: "Now in its fourth year, H4Life is the must-attend industry event dedicated to the key issues shaping the future of the hydrogen economy in the UK and around the world.", image: require('../assets/image.png') },
  { id: "2", title: "Arrival", description: "Details about the arrival at the event.", image: require('../assets/image.png') },
  { id: "3", title: "Venue", description: "Information about the event venue.", image: require('../assets/image.png') },
];

const EventDetails = ({ navigation, route }) => {

  const { eventId } = route.params || {};
  // console.log("Route params:", route.params);
  console.log("eventId in EventDetails screen:", eventId);
  const [selectedTab, setSelectedTab] = useState(data[0]);
  const [loading, setLoading] = useState(false)

  const [eventDetalis, setEventDetails] = useState({});
  console.log("Event Details data main :", eventDetalis?.[0]);

  const itemData = eventDetalis?.eventtabsData;
  // console.log("Event Details data:", itemData?.[0]);

  const itemDataImage = eventDetalis?.eventtabImages;
  // console.log("Event Details data Image :", itemDataImage?.[1]);


  useEffect(() => {
    loadEventDetails();
  }, []);

  const loadEventDetails = async () => {
    try {
      setLoading(true);
      const data = await fetchEventDetailsID({ id: eventId });
      setEventDetails(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  const renderItem = ({ item }) => {
    return (
      <Image
        source={selectedTab.image}
        style={styles.speakerImg}
      />
    )
  }
  return (
    <ScrollView>
      <StatusBar barStyle={'light-content'} backgroundColor="#7fdb56" />
      <LinearGradient
        colors={['#7fdb56', '#5bbe51', '#2c9c4a']}
        style={styles.gradientStyle}
      >
        <TouchableOpacity onPress={() => {
          navigation.goBack();
        }}>
          <Entypo name="chevron-left" size={35} color={theme.colors.white} />
        </TouchableOpacity>
        <Text style={styles.headerTxt}>Event Details</Text>
      </LinearGradient>

      <Image
        source={selectedTab.image}
        style={styles.eventImg}
      />

      <View style={styles.tabBar}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {data.map(tab => (
            <TouchableOpacity
              key={tab.id}
              style={[
                styles.tabBarStyle,
                selectedTab.id === tab.id && styles.activeTabStyle
              ]}
              onPress={() => setSelectedTab(tab)}
            >
              <Text style={[styles.tabBarText, selectedTab.id === tab.id && { color: theme.colors.white }]}>
                {tab.title}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>


      <View style={styles.tabContent}>
        <Text style={styles.description}>{selectedTab.description}</Text>
      </View>

      <Text style={styles.galleryTxt}>Gallery</Text>
      <View style={styles.galleryContainer}>
        <FlatList
          data={data}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItem}
        />
      </View>
    </ScrollView>
  );
}

export default EventDetails;

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
  },
  eventImg: {
    height: hp(26),
    width: '90%',
    position: 'absolute',
    resizeMode: 'cover',
    borderRadius: theme.radius.xxl,
    marginTop: hp(11),
    marginLeft: theme.padding.md,
    marginRight: theme.padding.md,
  },
  tabBar: {
    flexDirection: 'row',
    marginTop: hp(13.5),
    marginLeft: hp(1.5),
    justifyContent: 'space-around',
    marginRight: hp(1.5)
  },
  tabBarStyle: {
    fontSize: hp(2.2),
    fontWeight: theme.fonts.bold,
    paddingVertical: wp(2),
    paddingHorizontal: wp(5),
    borderRadius: theme.radius.xl,
  },
  activeTabStyle: {
    backgroundColor: theme.colors.primary,
  },
  tabContent: {
    marginTop: hp(3),
    paddingHorizontal: theme.padding.md,
  },
  description: {
    fontSize: hp(2.3),
    color: theme.colors.textLight,
    alignItems: 'center',
    padding: theme.padding.xl,
    borderRadius: theme.radius.md,
    shadowColor: theme.colors.gray,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    elevation: 2,
  },
  tabBarText: {
    color: theme.colors.text,
    fontSize: hp(2.2),
    fontWeight: theme.fonts.bold,
    color: theme.colors.primary,
    padding: theme.radius.xxs,
  },
  galleryContainer: {
    flex: 1
  },
  speakerImg: {
    height: hp(23),
    width: hp(40),
    resizeMode: 'cover',
    borderRadius: theme.radius.xxl,
    margin: theme.radius.xxs
  },
  galleryTxt: {
    fontWeight: theme.fonts.extrabold,
    fontSize: theme.fontSize.xl,
    color: theme.colors.lightGrey,
    padding: theme.padding.xs
  }
});

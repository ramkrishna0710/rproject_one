import { ActivityIndicator, Image, Linking, Pressable, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { theme } from '../constants/theme'
import Icon from 'react-native-vector-icons/MaterialIcons';
import { hp, wp } from '../helpers/common';
import Dashboard from '../components/Dashboard';
import Entypo from 'react-native-vector-icons/Entypo'
import VideoSlider from '../components/VideoSlider';
import { fetchAgenda, fetchEventDetails, fetchSpeakers, fetchVideos } from '../helpers/api';
import LoadingModal from '../components/LoadingModal';
import { useDrawerStatus } from '@react-navigation/drawer';
import Header from '../components/Header';
import Animated, { Extrapolation, interpolate, useAnimatedStyle, useDerivedValue, useSharedValue, withSpring, withTiming } from 'react-native-reanimated';
import Overlay from '../components/Overlay';
import Drawer from '../components/Drawer';


const HomeScreen = ({ navigation }) => {

  const [eventDetalis, setEventDetails] = useState([]);
  const [speakers, setSpeakers] = useState([]);
  const [agenda, setAgenda] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [eventId, setEventId] = useState(null)
  const [video, setVideo] = useState(null)
  const [links, setLinks] = useState([]);

  const active = useSharedValue(false)
  const progress = useDerivedValue(() => {
    return withTiming(active.value ? 1 : 0);
  })

  const drawerStatus = useDrawerStatus();

  useEffect(() => {
    loadSpeakers();
  }, []);

  useEffect(() => {
    loadAgendas();
  }, []);

  useEffect(() => {
    loadEventDetails();
  }, []);

  useEffect(() => {
    loadVideos();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://runtimeeventapp.com/hforlife/webservices.php?reqAction=dashboardlink');
        const data = await response.json();

        if (data.requestStatus === 'Success') {
          const activeLinks = data.Content.filter(item => item.status === true); // Filter links with `status: true`
          setLinks(activeLinks);
        } else {
          console.error('Error fetching data:', data.Error);
        }
      } catch (error) {
        console.error('API fetch error:', error);
      }
    };

    fetchData();
  }, []);


  const loadEventDetails = async () => {
    try {
      setLoading(true);
      const data = await fetchEventDetails();
      setEventDetails(data[0]);

      const event_id = data[0].event_id;
      if (event_id) {
        setEventId(event_id)
      }
      // console.warn("event_id ", eventId);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const loadAgendas = async () => {
    try {
      setLoading(true);
      const data = await fetchAgenda();
      // console.log("Agenda data:", data);
      setAgenda(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const loadSpeakers = async () => {
    try {
      setLoading(true);
      const data = await fetchSpeakers();
      setSpeakers(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const loadVideos = async () => {
    try {
      setLoading(true)
      const data = await fetchVideos();
      setVideo(data)
    } catch (error) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  const animatedStyle = useAnimatedStyle(() => {
    const rotateY = interpolate(
      progress.value,
      [0, 1],
      [0, -20],
      Extrapolation.CLAMP,
    )
    return {

      transform: [
        { perspective: 1000 },
        { scale: active.value ? withTiming(0.8) : withTiming(1) }, {
          translateX: active.value ? withSpring(240) : withTiming(0)
        },
      ],
      borderRadius: active.value ? withTiming(20) : withTiming(0)
    }
  })

  const firstSpeaker = speakers[0];

  return (
    <>
    <Drawer active={active}/>
      <Animated.View style={[styles.container, animatedStyle]}>
        <StatusBar backgroundColor={theme.colors.primary} />

        {
          loading ? (
            <LoadingModal loading={loading} />
          ) : (
            <>
              <Header active={active} navigation={navigation} />

              <View style={styles.divider} />
              <ScrollView>

                {/* Header */}
                <View style={styles.headerContainer}>
                  <Text style={styles.headerTextStyle}>{eventDetalis.event_title}</Text>
                  <View style={styles.headerDivider} />
                  <View style={styles.dateLocationContainer}>
                    <View style={styles.dateAndLocation}>
                      <Text style={styles.locationDateTxt}>{eventDetalis.event_date}</Text>
                      <Text style={styles.locationDateTxt}>{eventDetalis.event_location}</Text>
                    </View>
                    <Pressable
                      onPress={() => {
                        // console.log("Navigate with id ", eventId),
                        navigation.navigate('DetailsEventsTab', { eventId: eventId })
                      }
                      }
                      style={styles.eventDetailsBtn}
                    >
                      <Text style={styles.eventTxt}>Event Details</Text>
                    </Pressable>
                  </View>
                </View>

                {/* Dashboard */}
                <View>
                  <Text style={styles.dashBoardTxt}>Dashboard</Text>
                  <Dashboard speakersData={speakers} agendasData={agenda} videosData={video} navigation={navigation} />
                </View>

                {/* Event register */}
                <View>
                  {links.map((item, index) => (
                    <View key={index} style={styles.eventRegister}>
                      <TouchableOpacity
                        onPress={() => Linking.openURL(item.link)}
                        style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingHorizontal: theme.padding.xs }}
                      >
                        <Text
                          style={styles.eventRegTxt}
                          numberOfLines={2}
                          ellipsizeMode="tail"
                        >
                          {item.name}
                        </Text>
                        <Entypo
                          name='chevron-right'
                          size={25}
                          color={theme.colors.primary}
                          style={styles.icon}
                        />
                      </TouchableOpacity>
                    </View>
                  ))}
                </View>

                {/* Videos */}
                <Text style={styles.videosTxt}>Videos</Text>
                <View style={styles.videoContainer}>
                  <VideoSlider videosData={video} horizontal={true} />
                </View>

                {/* Speakers */}
                <Text style={styles.speakerTxt} >Speakers</Text>
                <TouchableOpacity onPress={() => navigation.navigate('SpeakerDetails', { firstSpeaker })}>
                  <View style={styles.speakerContainer}>
                    <Image
                      source={{
                        uri: firstSpeaker?.profile_pic
                          ? `https://runtimeeventapp.com/hforlife/${firstSpeaker?.profile_pic}`
                          : 'https://via.placeholder.com/100',
                      }}
                      style={styles.speakerImg}
                    />
                    <View>
                      <Text style={styles.speakerName}>{firstSpeaker?.name}</Text>
                      <Text style={styles.speakerDescription}>{firstSpeaker?.company_name}</Text>
                    </View>
                    <Entypo name='chevron-right' size={25} color={theme.colors.primary} style={{ marginRight: 10 }} />
                  </View>
                </TouchableOpacity>

              </ScrollView>
            </>
          )}
        <Overlay active={active} />
      </Animated.View>
    </>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.white,
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: theme.colors.primary,
    paddingHorizontal: theme.padding.xxs,
    paddingBottom: theme.padding.xxs
  },
  divider: {
    width: '100%',
    height: 0.4,
    backgroundColor: '#333',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 8,
  },
  headerContainer: {
    backgroundColor: theme.colors.primary,
    borderBottomLeftRadius: theme.radius.xl,
    borderBottomRightRadius: theme.radius.xl,
  },
  headerTextStyle: {
    fontSize: hp(4.7),
    fontWeight: theme.fonts.extrabold,
    color: theme.colors.white,
    marginLeft: hp(5),
    marginTop: hp(2.2)
  },
  headerDivider: {
    height: 1.5,
    backgroundColor: theme.colors.white,
    marginLeft: hp(6),
    width: '25%',
    marginTop: hp(1.5)
  },
  dateLocationContainer: {
    flexDirection: 'row',
    marginLeft: hp(5),
    marginRight: hp(5),
    marginBottom: hp(2),
    justifyContent: 'space-between'
  },
  dateAndLocation: {
    textAlign: 'left',
    padding: theme.radius.xs
  },
  locationDateTxt: {
    fontSize: theme.radius.md,
    color: theme.colors.white,
    width: hp(20)
  },
  eventDetailsBtn: {
    backgroundColor: theme.colors.white,
    borderRadius: 80,
    alignItems: 'center',
    justifyContent: 'center',
    width: wp(35),
    height: hp(5),
    marginTop: hp(0.9)
  },
  eventTxt: {
    color: theme.colors.primary,
    fontWeight: theme.fonts.bold
  },
  dashBoardTxt: {
    fontWeight: theme.fonts.extrabold,
    fontSize: theme.fontSize.xl,
    color: theme.colors.lightGrey,
    padding: theme.radius.xxs
  },
  eventRegister: {
    padding: theme.padding.xl,
    borderRadius: theme.radius.xxl,
    shadowColor: theme.colors.gray,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    elevation: 3,
    margin: 10
  },
  eventRegTxt: {
    fontWeight: theme.fonts.extrabold,
    fontSize: theme.fontSize.lg,
    color: theme.colors.lightGrey,
    marginRight: theme.radius.xl
  },
  videoContainer: {
    // borderRadius: theme.radius.xxl,
    // margin: theme.radius.xxs,
    // padding: theme.padding.xxs,
    // alignItems: "center",
    // marginVertical: 8,
    // elevation: 0.9,
    // shadowColor: theme.colors.lightGrey,
    // shadowOpacity: 1,
    // shadowOffset: { width: 0, height: 2 },
    // shadowRadius: 8,
    // height: hp(37)
  },
  videosTxt: {
    fontWeight: theme.fonts.extrabold,
    fontSize: theme.fontSize.xl,
    color: theme.colors.lightGrey,
    padding: theme.padding.xs
  },
  speakerTxt: {
    fontWeight: theme.fonts.extrabold,
    fontSize: theme.fontSize.xl,
    color: theme.colors.lightGrey,
    padding: theme.padding.xs
  },
  speakerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
    fontSize: theme.fontSize.sm
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
  }
})
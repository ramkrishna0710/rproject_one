import { FlatList, Image, Linking, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { theme } from '../constants/theme';
import { hp } from '../helpers/common';
import { fetchSponsors } from '../helpers/api';
import LoadingModal from '../components/LoadingModal';

const Sponsors = ({ navigation }) => {

  const [sponsors, setSponsors] = useState([]);
  const [loading, setLoading] = useState(false)

  // console.log("Sponsors ", sponsors);


  useEffect(() => {
    loadSponsors();
  }, []);

  const loadSponsors = async () => {
    try {
      setLoading(true);
      const data = await fetchSponsors();
      setSponsors(data);
    } catch (err) {
      console.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const renderItem = ({ item }) => {
    const openWebsite = () => {
      Linking.openURL(item.websitelink).catch(err => console.error("Failed to open URL:", err));
    };
    return (
      <View style={styles.speakerContainer}>
        <Image source={{ uri: `${item?.http_url}${item?.sponsor_logo}` }} style={styles.thumbnailImg} />
        <Text style={styles.title}>{item.company_name}</Text>
        <TouchableOpacity onPress={openWebsite} style={styles.linkContainer}>
          <Ionicons name="globe-outline" size={hp(3)} color={theme.colors.primary} />
          <Text style={styles.url}>{item?.websitelink}</Text>
          <Ionicons name="share-outline" size={hp(3)} color={theme.colors.primary} />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AntDesign name="left" size={hp(3)} style={styles.arrowLeft} />
        </TouchableOpacity>
        <Text style={styles.headerText}>Sponsors</Text>
      </View>


      <View style={styles.textContainer}>
        <Text style={styles.text}>Huge thanks to out sponsors for the supporting Hydrogen for Life 2024</Text>
      </View>
      {
        loading ? <LoadingModal loading={loading} /> :
          <FlatList
            data={sponsors}
            keyExtractor={(item) => item.sponsor_id.toString()}
            renderItem={renderItem}
          />
      }
    </View>
  );
};

export default Sponsors;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.white,
    marginBottom: theme.radius.xl
  },
  header: {
    padding: 16,
    backgroundColor: theme.colors.white,
    flexDirection: 'row',
    alignItems: 'center',
  },
  arrowLeft: {
    color: theme.colors.primary
  },
  textContainer: {
    alignItems: 'center',
    alignSelf: 'center',
    width: '95%',
    padding: theme.padding.xxs,
    borderRadius: theme.radius.xxs,
    shadowColor: theme.colors.gray,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    elevation: 2,
    backgroundColor: theme.colors.primary,
    marginBottom: hp(2.4)
  },
  text: {
    fontSize: hp(2.3),
    color: theme.colors.white
  },
  headerText: {
    fontSize: hp(3.2),
    fontWeight: theme.fonts.bold,
    color: theme.colors.primary,
    textAlign: 'center',
    flex: 1,
  },
  speakerContainer: {
    alignItems: 'center',
    alignSelf: 'center',
    width: "95%",
    padding: theme.padding.xxs,
    borderRadius: theme.radius.xxs,
    shadowColor: theme.colors.gray,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    elevation: 2,
    marginTop: hp(1.7)
  },
  thumbnailImg: {
    width: "99%",
    height: hp(30),
    borderRadius: theme.radius.xxs,
    resizeMode: 'center'
  },
  title: {
    fontSize: hp(2.3),
    fontWeight: theme.fonts.bold,
    color: theme.colors.black,
    textAlign: 'left',
    width: '100%',
    padding: theme.padding.xxs
  },
  linkContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%',
    padding: theme.padding.xxs
  },
  url: {
    fontSize: hp(1.8),
    color: theme.colors.textLight,
    marginHorizontal: 8,
    flexShrink: 1,
  },
});

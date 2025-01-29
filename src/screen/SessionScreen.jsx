import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { theme } from '../constants/theme';
import { hp } from '../helpers/common';
import AntDesign from 'react-native-vector-icons/AntDesign'
import { fetchAgendaSession } from '../helpers/api';
import LoadingModal from '../components/LoadingModal';
import SessionScreenModal from './SessionScreenModal';


const SessionScreen = ({ navigation, route }) => {

  const { id } = route?.params;
  // console.warn("Session ID ", id);

  const [agendaSession, setAgendaSession] = useState(null)
  const [selectedSession, setSelectedSession] = useState(null);
  console.warn("AgendaItem selected Session data ", selectedSession);
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (id) {
      loadAgendaSession();
    }
  }, [id]);

  const loadAgendaSession = async () => {
    try {
      setLoading(true);
      const data = await fetchAgendaSession({ id });
      setAgendaSession(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }


  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.card}
      onPress={() => {
        setSelectedSession(item);
        setModalVisible(true);
      }}
    >
      <View style={styles.timeContainer}>
        <Text style={styles.timeText}>{item.session_time}</Text>
      </View>
      <View style={styles.border} />
      <View style={styles.detailsContainer}>
        <Text style={styles.titleText}>{item.session_title}</Text>
      </View>
      <View style={styles.iconContainer}>

        <AntDesign name='clockcircleo' size={hp(2.5)} style={styles.clockIcon} />
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity style={styles.arrowLeft} onPress={() => { navigation.navigate('AgendaDetails', { id: agendaSession.agenda_id }) }}>
          <AntDesign name='left' size={hp(3.5)} color={theme.colors.primary} />
        </TouchableOpacity>
        <Text style={styles.header}>H4Life: Tuesday 19th November 2024</Text>
      </View>
      {
        loading ? (
          <LoadingModal loading={loading} />
        ) : (
          <FlatList
            data={agendaSession}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderItem}
          />
        )
      }
      {modalVisible && selectedSession && (
        <SessionScreenModal
          agendaSession={selectedSession}
          closeModal={() => setModalVisible(false)}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: theme.colors.white,
    paddingHorizontal: theme.radius.lg,
    paddingTop: theme.radius.xl,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.padding.md
  },
  arrowLeft: {
    margin: theme.padding.sm,
    color: theme.colors.primary
  },
  header: {
    fontSize: hp(3),
    fontWeight: theme.fonts.bold,
    color: theme.colors.primary,
    textAlign: 'center',
    flex: 1
  },
  card: {
    flexDirection: 'row',
    backgroundColor: theme.colors.white,
    borderRadius: theme.radius.xxs,
    marginVertical: theme.padding.xxs,
    padding: theme.padding.sm,
    shadowColor: theme.colors.gray,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  timeContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: theme.padding.md,
  },
  timeText: {
    fontSize: hp(2),
    fontWeight: theme.fonts.bold,
    color: theme.colors.textLight,
  },
  border: {
    backgroundColor: theme.colors.primary,
    height: '90%',
    width: '1%',
  },
  detailsContainer: {
    flex: 1,
    justifyContent: 'center',
    marginLeft: theme.padding.xxs
  },
  titleText: {
    fontSize: hp(2.1),
    fontWeight: theme.fonts.bold,
    color: theme.colors.textLight,
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  clockIcon: {
    color: theme.colors.primary,
  }
});

export default SessionScreen;

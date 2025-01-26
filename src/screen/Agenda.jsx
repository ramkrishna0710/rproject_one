import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import ItemCard from '../components/ItemCard';
import { theme } from '../constants/theme';
import { hp } from '../helpers/common';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useFocusEffect } from '@react-navigation/native';

const AgendaScreen = ({ navigation, route }) => {

  const [agendaItem, setAgendaItem] = useState(route?.params?.data || []);

  // const agendaItem = route?.params?.data || [];

  useFocusEffect(
    React.useCallback(() => {
      if (route?.params?.data) {
        setAgendaItem(route.params.data);
      }
    }, [route.params])
  );


  const renderItem = ({ item }) => (
    <ItemCard
      imageUri={`${item.http_url}${item.agenda_image}` || 'https://via.placeholder.com/150'}
      title={item.agenda_title || 'Untitled'}
      onPress={() => navigation.navigate('AgendaDetails', { id: item.agenda_id })}
    />
    
  );


  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.arrowLeft} onPress={() => navigation.goBack()}>
          <AntDesign name="left" size={hp(3)} />
        </TouchableOpacity>
        <Text style={styles.headerText}>Agenda</Text>
      </View>

      {/* Agenda Items */}
      <FlatList
        data={agendaItem}
        keyExtractor={(item) => item.id?.toString() || Math.random().toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.contentContainer}
        ListFooterComponent={
          <TouchableOpacity style={styles.footerButton} onPress={() => {}}>
            <Text style={styles.footerButtonText}>View Agenda</Text>
          </TouchableOpacity>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.white,
  },
  header: {
    padding: 16,
    backgroundColor: theme.colors.white,
    flexDirection: 'row',
    alignItems: 'center',
  },
  arrowLeft: {
    marginRight: theme.padding.sm,
  },
  headerText: {
    fontSize: hp(3.2),
    fontWeight: theme.fonts.bold,
    color: theme.colors.black,
    textAlign: 'center',
    flex: 1,
  },
  contentContainer: {
    padding: 16,
  },
  footerButton: {
    backgroundColor: theme.colors.primary,
    padding: theme.padding.lg,
    borderRadius: theme.radius.xxs,
    alignItems: 'center',
    marginTop: theme.padding.lg,
  },
  footerButtonText: {
    fontSize: hp(2.2),
    color: theme.colors.white,
    fontWeight: theme.fonts.bold,
  },
});

export default AgendaScreen;

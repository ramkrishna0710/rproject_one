import React, { useEffect, useState } from 'react';
import DetailsCard from '../components/DetailsCard';
import { fetchAgendaDetails } from '../helpers/api';
import LoadingModal from '../components/LoadingModal';

console.log(fetchAgendaDetails);

const AgendaDetailsScreen = ({ navigation, route }) => {

  const { id } = route.params;

  // console.warn("ID ", id);

  const [agendaDetailsapi, setAgendaDetailsapi] = useState(null);
  // console.warn("agendaDetailsapi ", agendaDetailsapi);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadAgendaDetails();
  }, [])

  const loadAgendaDetails = async () => {
    try {
      setLoading(true);
      const data = await fetchAgendaDetails({ id });
      // console.warn("AgendaDetails data:", data);
      setAgendaDetailsapi(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  const agenda = agendaDetailsapi?.[0] || {};

  return loading ? (
    <LoadingModal loading={loading} />
  ) : (
    <DetailsCard
      imageUri={
        agenda?.http_url + agenda?.banner_img
          ? `${agenda.http_url}${agenda.banner_img}`
          : 'https://via.placeholder.com/150'
      }
      title={agenda?.agenda_category || 'No Title'}
      description={agenda?.agenda_description || 'No Description Available'}
      buttons={[
        {
          text: 'Session',
          iconName: 'clock',
          onPress: () =>
            navigation.navigate('SessionScreen', { id: agenda.agenda_id }),
        },
        {
          text: 'Speakers',
          iconName: 'command',
          onPress: () => navigation.navigate('SpeakersScreen',  { id: agenda.agenda_id }),
        },
      ]}
    />
  );
};


export default AgendaDetailsScreen;

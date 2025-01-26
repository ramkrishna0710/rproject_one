import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import SpeakerListItem from '../components/SpeakerListItem';
import { hp } from '../helpers/common';
import { theme } from '../constants/theme';
import AntDesign from 'react-native-vector-icons/AntDesign'
import { useNavigation } from '@react-navigation/native';
import { fetchSessionSpeakers } from '../helpers/api';
import LoadingModal from '../components/LoadingModal';


const SpeakersScreen = ({ route, navigation }) => {
    const { id } = route.params;
    console.warn("ID SPEAKERS ", id);

    const [agendaSpeakers, setAgendaSpeakers] = useState(null)
    console.warn("AgendaItem Session speakers data ", agendaSpeakers);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        loadAgendaSpeakers();
    }, [])

    const loadAgendaSpeakers = async () => {
        try {
            setLoading(true);
            const data = await fetchSessionSpeakers({ id });
            console.warn("Session speakers Data ", data);
            setAgendaSpeakers(data || []);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <TouchableOpacity style={styles.arrowLeft} onPress={() => { navigation.navigate('AgendaDetails', { id: agendaSpeakers.speaker_id })}}>
                    <AntDesign name='left' size={hp(3)} color={theme.colors.primary} />
                </TouchableOpacity>
                <Text style={styles.header}>Speakers</Text>
            </View>
            {
                loading ? (
                    <LoadingModal loading={loading} />
                ) : (
                    <FlatList
                        data={agendaSpeakers}
                        keyExtractor={(item) => item.speaker_id}
                        renderItem={({ item }) => (
                            <SpeakerListItem
                                imageUri={`${item.http_url}${item.profile_pic}` || 'https://via.placeholder.com/100'}
                                name={item.name}
                                title={item.designation || 'N/A'}
                            />
                        )}
                    />
                )
            }
        </View>
    );
};

export default SpeakersScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.white,
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: theme.padding.md
    },
    header: {
        fontSize: hp(3.5),
        fontWeight: theme.fonts.bold,
        color: theme.colors.primary,
        textAlign: 'center',
        flex: 1
    },
    arrowLeft: {
        margin: theme.padding.sm,
    },
});

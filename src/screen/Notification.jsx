import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { theme } from '../constants/theme';
import { hp } from '../helpers/common';
import AntDesign from 'react-native-vector-icons/AntDesign';
import LoadingModal from '../components/LoadingModal';
import { AuthContext } from '../context/AuthContext';

const Notification = ({ navigation }) => {
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useContext(AuthContext);

    const fetchNotifications = async () => {
        try {
            setLoading(true);

            const payload = {
                user_id: user?.userregid,
                status: 'active',
            };

            const response = await fetch('https://runtimeeventapp.com/hforlife/api/question', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });
            console.log("response.status ", response.status);

            if(response.status === 200) {
                return;
            }
            
            const textResponse = await response.text();
            console.log("Raw API Response:", textResponse);
            
            if (!response.ok) {
                throw new Error(`API error with status ${response.status}`);
            }
            
            const data = JSON.parse(textResponse);  // Manually parse the text response
            
            console.log("Notification data ", data);


            if (data?.notifications) {
                setNotifications(data.notifications);
            } else {
                throw new Error("No notifications found in the response.");
            }
        } catch (error) {

            console.error('Error fetching notifications:', error.message || error);
            setNotifications([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (user?.userregid) {
            fetchNotifications();
        }
    }, [user]);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.arrowLeft} onPress={() => navigation.goBack()}>
                    <AntDesign name="left" size={hp(3)} />
                </TouchableOpacity>
                <Text style={styles.headerText}>Notification</Text>
            </View>

            {loading ? (
                <LoadingModal loading={loading} />
            ) : (
                <>
                    {notifications.length === 0 ? (
                        <Text style={styles.noNotificationsText}>No new notifications</Text>
                    ) : (
                        <FlatList
                            data={notifications}
                            renderItem={({ item }) => (
                                <View style={styles.notificationItem}>
                                    <Text style={styles.notificationText}>{item.statusText}</Text>
                                </View>
                            )}
                            keyExtractor={(item, index) => index.toString()}
                        />
                    )}
                </>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: theme.padding.xxs,
        backgroundColor: theme.colors.white,
    },
    header: {
        padding: 16,
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
    noNotificationsText: {
        fontSize: hp(2.5),
        color: theme.colors.gray,
        textAlign: 'center',
        marginTop: hp(5),
    },
    notificationItem: {
        padding: 16,
        marginBottom: 8,
        borderRadius: theme.radius.md,
        backgroundColor: theme.colors.lightGrey,
        shadowColor: theme.colors.black,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 2,
    },
    notificationText: {
        fontSize: hp(2.2),
        color: theme.colors.black,
    },
});

export default Notification;

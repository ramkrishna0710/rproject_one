import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { theme } from "../constants/theme";
import { hp, wp } from "../helpers/common";

const Dashboard = ({ speakersData, agendasData, videosData }) => {
    // console.log("Dashboard videosData ", videosData);

    const navigation = useNavigation();

    const items = [
        { label: "Agenda", icon: "calendar", screen: "AgendaScreen" },
        { label: "Speakers", icon: "user", screen: "Speakers" },
        { label: "Maps", icon: "map-marked-alt", screen: "Maps" },
        { label: "Videos", icon: "video", screen: "Videos" },
        { label: "Sponsors", icon: "handshake", screen: "Sponsors" },
        { label: "Q&A", icon: "comments", screen: "QandA" },
    ];

    return (
        <View style={styles.container}>
            <View style={styles.grid}>
                {items.map((item, index) => (
                    <TouchableOpacity
                        key={index}
                        style={styles.card}
                        onPress={() => {
                            if (item.label === "Agenda") {
                                navigation.navigate(item.screen, { data: agendasData });
                            } else if (item.label === "Speakers") {
                                navigation.navigate(item.screen, { data: speakersData });
                            } else if (item.label === "Videos") {
                                navigation.navigate(item.screen, { data: videosData });
                            } else {
                                navigation.navigate(item.screen);
                            }
                        }}
                    >
                        <View style={styles.iconContainer}>
                            {item.icon === "map" || item.icon === "videocam" ? (
                                <MaterialIcons name={item.icon} size={25} color={theme.colors.primary} />
                            ) : (
                                <FontAwesome5 name={item.icon} size={25} color={theme.colors.primary} />
                            )}
                        </View>
                        <Text style={styles.label}>{item.label}</Text>
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: theme.padding.xs,
    },
    grid: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
    },
    card: {
        width: wp(29),
        height: hp(11.5),
        backgroundColor: theme.colors.white,
        borderRadius: theme.radius.xs,
        padding: theme.padding.lg,
        alignItems: "center",
        marginVertical: 8,
        elevation: 4,
        shadowColor: theme.colors.lightGrey,
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
    },
    iconContainer: {
        marginBottom: theme.radius.xxs,
    },
    label: {
        fontSize: theme.radius.md,
        color: theme.colors.lightGrey,
        marginBottom: theme.radius.xxl,
        fontWeight: theme.fonts.bold,
    },
});

export default Dashboard;

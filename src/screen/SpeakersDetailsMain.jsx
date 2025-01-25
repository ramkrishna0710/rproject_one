import React from 'react';
import { Image, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { theme } from '../constants/theme';
import { hp, wp } from '../helpers/common';
import AntDesign from 'react-native-vector-icons/AntDesign';
import LinearGradient from 'react-native-linear-gradient';

const SpeakersDetailsMain = ({ navigation, route }) => {

    const { speakersItem } = route.params;

    return (
        <View>
            <StatusBar backgroundColor={'#7fdb56'} />
            <LinearGradient
                colors={['#7fdb56', '#5bbe51', '#2c9c4a']}
                style={styles.gradientStyle}
            >
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <AntDesign name="left" size={hp(3)} color={theme.colors.white} />
                    </TouchableOpacity>
                    <Text style={styles.headerText}>Speakers Details</Text>
                </View>
            </LinearGradient>
            <View style={styles.itemContainer}>
                <Image
                    source={{
                        uri: speakersItem.profile_pic
                            ? `https://runtimeeventapp.com/hforlife/${speakersItem.profile_pic}`
                            : 'https://via.placeholder.com/100',
                    }} style={styles.speakerImg}
                />
                <View style={styles.detailsContainer}>
                    <Text style={styles.speakerName}>{speakersItem.name}</Text>
                    <Text style={styles.speakerTitle}>{speakersItem.designation}</Text>
                </View>
            </View>
        </View>
    );
};

export default SpeakersDetailsMain;

const styles = StyleSheet.create({
    gradientStyle: {
        height: hp(28),
        borderBottomLeftRadius: theme.radius.xxl,
        borderBottomRightRadius: theme.radius.xxl,
    },
    container: {
        flex: 1,
        backgroundColor: theme.colors.white,
    },
    header: {
        padding: theme.radius.md,
        flexDirection: 'row',
        alignItems: 'center',
    },
    headerText: {
        fontSize: hp(3.2),
        fontWeight: theme.fonts.bold,
        color: theme.colors.white,
        textAlign: 'center',
        flex: 1,
    },
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        position: 'absolute',
        height: hp(27),
        width: '90%',
        backgroundColor: theme.colors.white,
        margin: theme.radius.xl,
        marginTop: hp(13),
        borderRadius: theme.radius.xxs,
        shadowColor: theme.colors.gray,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.4,
        shadowRadius: 4,
        elevation: 2,
        padding: theme.radius.md
    },
    speakerImg: {
        height: hp(14),
        width: hp(14),
        marginRight: theme.radius.xxs,
        borderRadius: theme.radius.xs
    },
    detailsContainer: {
        paddingHorizontal: theme.radius.xxl,
        width: '55%'
    },
    speakerName: {
        fontSize: hp(2.8),
        fontWeight: theme.fonts.bold,
        color: theme.colors.lightGrey,
        marginBottom: hp(1),
    },
    speakerTitle: {
        fontSize: hp(2.4),
        color: theme.colors.gray,
    },


});

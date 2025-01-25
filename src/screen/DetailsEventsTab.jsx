import { View, Text, ScrollView, StyleSheet, TouchableOpacity, FlatList, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { fetchEventDetailsID } from '../helpers/api';
import LinearGradient from 'react-native-linear-gradient';
import { hp, wp } from '../helpers/common';
import { theme } from '../constants/theme';
import Entypo from 'react-native-vector-icons/Entypo';
import LoadingModal from '../components/LoadingModal';


const DetailsEventsTab = ({ navigation, route }) => {
    const { eventId } = route.params || {};

    const [eventDetalis, setEventDetails] = useState({});
    const [loadingTabs, setLoadingTabs] = useState(false);
    const [loadingGallery, setLoadingGallery] = useState(false);
    const [selectedTab, setSelectedTab] = useState(null);

    const itemData = eventDetalis?.eventtabsData || [];
    const itemDataImage = eventDetalis?.eventtabImages || [];
    const galleryData = itemDataImage[selectedTab?.eventtabs_id] || [];

    useEffect(() => {
        loadEventDetails();
    }, []);

    const loadEventDetails = async () => {
        try {
            setLoadingTabs(true);
            const data = await fetchEventDetailsID({ id: eventId });
            setEventDetails(data);
            if (data?.eventtabsData?.length > 0) {
                setSelectedTab(data.eventtabsData[0]);
            }
        } catch (err) {
            console.error(err.message);
        } finally {
            setLoadingTabs(false);
        }
    };

    const handleTabPress = (tab) => {
        setSelectedTab(tab);
        setLoadingGallery(true); 
        setTimeout(() => setLoadingGallery(false), 500);
    };

    const renderGalleryItem = ({ item }) => (
        <Image
            source={{ uri: `${eventDetalis?.[0]?.http_url}${item.eventgallery_pic}` }}
            style={styles.speakerImg}
        />
    );

    return (
        <ScrollView>
            <LinearGradient
                colors={['#7fdb56', '#5bbe51', '#2c9c4a']}
                style={styles.gradientStyle}
            >
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Entypo name="chevron-left" size={35} color={theme.colors.white} />
                </TouchableOpacity>
                <Text style={styles.headerTxt}>Event Details</Text>
            </LinearGradient>

            {loadingTabs ? (
                <LoadingModal loading={loadingTabs} />
            ) : (
                <>
                    {selectedTab && (
                        <Image
                            source={{ uri: `${eventDetalis?.[0]?.http_url}${selectedTab?.eventtabs_pic}` }}
                            style={styles.eventImg}
                        />
                    )}

                    <View style={styles.tabBar}>
                        <FlatList
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            data={itemData}
                            keyExtractor={(item) => item.eventtabs_id.toString()}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    key={item?.eventtabs_id}
                                    style={[
                                        styles.tabBarStyle,
                                        selectedTab?.eventtabs_id === item?.eventtabs_id && styles.activeTabStyle,
                                    ]}
                                    onPress={() => handleTabPress(item)}
                                >
                                    <Text
                                        style={[
                                            styles.tabBarText,
                                            selectedTab?.eventtabs_id === item?.eventtabs_id && { color: theme.colors.white },
                                        ]}
                                    >
                                        {item.eventtabs_title}
                                    </Text>
                                </TouchableOpacity>
                            )}
                        />
                    </View>

                    {selectedTab && (
                        <View style={styles.tabContent}>
                            <Text style={styles.description}>{selectedTab?.eventtabs_description}</Text>
                        </View>
                    )}

                    <Text style={styles.galleryTxt}>Gallery</Text>
                    <View style={styles.galleryContainer}>
                        {loadingGallery ? (
                            <LoadingModal loading={loadingGallery} />
                        ) : (
                            <FlatList
                                data={galleryData}
                                horizontal
                                showsHorizontalScrollIndicator={false}
                                keyExtractor={(item) => item.eventtabimg_id.toString()}
                                renderItem={renderGalleryItem}
                            />
                        )}
                    </View>
                </>
            )}
        </ScrollView>
    );
};


export default DetailsEventsTab

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
        fontSize: hp(2),
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
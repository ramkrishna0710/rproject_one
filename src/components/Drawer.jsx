import { StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext, useState } from 'react'
import LinearGradient from 'react-native-linear-gradient'
import { hp, wp } from '../helpers/common'
import Icon from 'react-native-vector-icons/MaterialIcons';
import LogoutModal from './LogOutModal'
import { AuthContext } from '../context/AuthContext'
import { useNavigation } from '@react-navigation/native'
import { theme } from '../constants/theme'


const Drawer = ({ active }) => {
    const navigation = useNavigation();
    const { isLoading, logout } = useContext(AuthContext);
    const [modalVisible, setModalVisible] = useState(false);

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor={'#2c9c4a'} />
            <LinearGradient
                colors={['#2c9c4a', '#5bbe51', '#7fdb56']}
                style={{ flex: 1 }}
            >
                <TouchableOpacity onPress={
                    () => {
                        active.value = false;
                    }
                }>
                    <Icon name="close" size={hp(5)} style={styles.crossIcon} />
                </TouchableOpacity>
                <View style={styles.containerSec}>
                    {/* Home */}
                    <TouchableOpacity
                        style={styles.drawerItemContainer}
                        onPress={() => {
                            navigation.navigate('Home');
                            active.value = false;
                        }}
                    >
                        <Icon name="home" size={30} color="white" style={styles.icon} />
                        <Text style={styles.label}>Home</Text>
                    </TouchableOpacity>

                    {/* My Profile */}
                    <TouchableOpacity
                        style={styles.drawerItemContainer}
                        onPress={() => {
                            navigation.navigate('MyProfile');
                            active.value = false;
                        }}
                    >
                        <Icon name="person" size={30} color="white" style={styles.icon} />
                        <Text style={styles.label}>My Profile</Text>
                    </TouchableOpacity>

                    {/* Delete Account */}
                    <TouchableOpacity
                        style={styles.drawerItemContainer}
                        onPress={() => {
                            navigation.navigate('DeleteAccount');
                            active.value = false;
                        }}
                    >
                        <Icon name="person-remove" size={30} color="white" style={styles.icon} />
                        <Text style={styles.label}>Delete Account</Text>
                    </TouchableOpacity>

                    {/* Log Out */}
                    <TouchableOpacity
                        style={styles.drawerItemContainer}
                        onPress={() => setModalVisible(true)}
                    >
                        <Icon name="settings" size={30} color="white" style={styles.icon} />
                        <Text style={styles.label}>Log Out</Text>
                    </TouchableOpacity>

                    {/* Logout Modal */}
                    <LogoutModal
                        modalVisible={modalVisible}
                        onClose={() => setModalVisible(false)}
                        onLogout={() => {
                            logout();
                            setModalVisible(false);
                        }}
                    />

                </View>
            </LinearGradient>
        </View>
    )
}

export default Drawer

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
    },
    containerSec: {
        flex: 1,
        justifyContent: 'center',
    },
    crossIcon: {
        position: 'absolute',
        padding: theme.padding.xxs,
        color: theme.colors.white
    },
    drawerItemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: wp(50),
        padding: hp(1.5),
    },
    icon: {
        marginRight: 10,
    },
    label: {
        fontSize: hp(3.2),
        fontWeight: '800',
        color: 'white',
    },
})
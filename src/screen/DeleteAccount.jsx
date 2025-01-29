import React, { useContext, useState } from 'react';
import { StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { theme } from '../constants/theme';
import { hp } from '../helpers/common';
import AntDesign from 'react-native-vector-icons/AntDesign';
import CustomButton from '../components/CustomButton';
import ModalDeleteAccount from '../components/ModalDeleteAccount';
import { AuthContext } from '../context/AuthContext';

const DeleteAccount = ({ navigation }) => {
    const [isModalVisible, setModalVisible] = useState(false);

    const { user, deleteAccount } = useContext(AuthContext);
    const handleDeleteAccount = () => {
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
    };

    const onDeleteAcc = () => {
        // if (user) {
        //     deleteAccount({ user }, navigation);
        // } else {
        //     console.log('No user data to delete');
        // }
        setModalVisible(false);
    };

    return (
        <View style={{ flex: 1, backgroundColor: theme.colors.white }}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.arrowLeft} onPress={() => navigation.goBack()}>
                    <AntDesign name="left" size={hp(3)} color={theme.colors.primary} />
                </TouchableOpacity>
                <Text style={styles.headerText}>Agenda</Text>
            </View>

            <Text style={styles.txtFirst}>
                For account deletion, please contact our admin: +912246078922
            </Text>

            <View style={styles.lastContainer}>
                <Text style={styles.txtLast}>
                    Also, for future details, please go through the privacy policy page, which has the account deletion procedure.
                </Text>

                <CustomButton
                    style={styles.btn}
                    buttonName={'Privacy Policy'}
                    backgroundColor={theme.colors.primary}
                    color={theme.colors.white}
                    onPress={() => { }}
                    borderColor={theme.colors.primary}
                />
                <CustomButton
                    style={styles.btn}
                    buttonName={'Delete Account'}
                    backgroundColor={'red'}
                    color={theme.colors.white}
                    onPress={handleDeleteAccount}
                    borderColor={'red'}
                />
            </View>

            <ModalDeleteAccount modalVisible={isModalVisible} onClose={closeModal} onDeleteAcc={onDeleteAcc} />
        </View>
    );
};

export default DeleteAccount;

const styles = StyleSheet.create({
    header: {
        padding: 16,
        flexDirection: 'row',
        alignItems: 'center',
    },
    arrowLeft: {},
    headerText: {
        fontSize: hp(3.2),
        fontWeight: theme.fonts.bold,
        color: theme.colors.primary,
        textAlign: 'center',
        flex: 1,
    },
    txtFirst: {
        fontSize: hp(2.2),
        fontWeight: theme.fonts.bold,
        textAlign: 'center',
        color: theme.colors.lightGrey,
        marginVertical: hp(2),
    },
    lastContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingBottom: theme.padding.lg,
        paddingHorizontal: theme.padding.md,
    },
    txtLast: {
        fontSize: hp(2),
        textAlign: 'center',
        color: theme.colors.lightGrey,
        fontWeight: theme.fonts.bold,
    },
    btn: {
        width: '85%',
        alignSelf: 'center',
    },
});

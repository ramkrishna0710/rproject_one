import { Modal, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { hp, wp } from '../helpers/common'
import { theme } from '../constants/theme'
import LoadingModal from './LoadingModal'

const SetRemainderModal = ({ closeModal }) => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false); 
        }, 2000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <Modal transparent={true} animationType="fade" onRequestClose={closeModal}>
            <TouchableWithoutFeedback onPress={closeModal}>
                <View style={styles.modalOverlay}>
                    {loading ? (
                        <LoadingModal loading={loading} />
                    ) : (
                        <View style={styles.modalContent}>
                            <Text style={styles.txt}>Session Reminder Added Successfully</Text>
                            <View style={styles.divider} />
                            <TouchableOpacity onPress={closeModal}>
                                <Text style={styles.okTxt}>Ok</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    )
}

export default SetRemainderModal

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        width: wp(80),
        paddingVertical: theme.padding.md,
        paddingHorizontal: theme.padding.lg,
        backgroundColor: '#fff',
        borderRadius: theme.radius.sm,
        alignItems: 'center',
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
    },
    txt: {
        fontSize: hp(2.4),
        color: theme.colors.black,
        textAlign: 'center',
        marginBottom: theme.padding.sm,
    },
    divider: {
        width: '80%',
        height: 1,
        backgroundColor: theme.colors.lightGrey,
        marginVertical: theme.padding.sm,
    },
    okTxt: {
        fontSize: hp(2.4),
        color: theme.colors.primary,
        fontWeight: 'bold',
        marginTop: theme.padding.md,
    },
});

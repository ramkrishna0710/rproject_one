import { Modal, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import React from 'react'
import { hp } from '../helpers/common'
import { theme } from '../constants/theme'

const SetRemainderModal = ({ closeModal }) => {
    return (
        <Modal style={styles.modalOverlay}>
            <TouchableWithoutFeedback onPress={closeModal}>
                <View style={styles.modalContent}>
                    <Text style={styles.txt}>Session Remainder Added Successfully</Text>
                    <View style={styles.divider} />
                    <TouchableOpacity onPress={closeModal}>
                        <Text style={styles.okTxt}>Ok</Text>
                    </TouchableOpacity>
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
        width: 200,
        padding: 20,
        backgroundColor: '#fff',
        borderRadius: 10,
        alignItems: 'center',
        elevation: 5, // Shadow for Android
        shadowColor: '#000', // Shadow for iOS
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
    },
    txt: {
        fontSize: hp(2.4),
        color: theme.colors.lightGrey
    },
    divider: {
        color: theme.colors.lightGrey
    },
    okTxt: {
        fontSize: hp(2.4),
        color: theme.colors.lightGrey
    }
})
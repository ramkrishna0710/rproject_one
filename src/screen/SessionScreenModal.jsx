import { Image, Modal, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native'
import React, { useState } from 'react'
import { hp, wp } from '../helpers/common';
import { theme } from '../constants/theme';
import ModalButton from '../components/ModalButton';
import SetRemainderModal from '../components/SetRemainderModal';

const SessionScreenModal = ({ navigation, route }) => {

  const { agendaSession } = route.params;

  const [remainderVisible, setRemainderVisible] = useState(false)

  const openVisibleModal= () => {
    setRemainderVisible(true)
  }

  const closeVisibleModal= () => {
    setRemainderVisible(false)
  }

  const closeModal = () => {
    navigation.goBack();
  };

  return (
    <Modal transparent={true} animationType="fade" onRequestClose={closeModal}>
      <TouchableWithoutFeedback onPress={closeModal}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.container}>
              <Image
                source={{
                  uri: agendaSession.profile_pic && agendaSession.profile_pic
                    ? `${agendaSession.http_url}${agendaSession.profile_pic}`
                    : 'https://via.placeholder.com/100',
                }}
                style={styles.img}
              />

              <View style={styles.txtContainer}>
                <Text style={styles.sessionTitle}>{agendaSession.session_title}</Text>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={styles.speakerHeader}>Keynote Speaker:</Text>
                  <Text style={styles.speakerTitle}>{agendaSession.speaker_name || 'None'}</Text>
                </View>
                <View style={{ flexDirection: 'row', }}>
                  <Text style={styles.speakerHeader}>Organization:</Text>
                  <Text style={styles.speakerTitle}>{agendaSession.company_name || 'None'}</Text>
                </View>
              </View>
            </View>

            <View style={styles.btnContainer}>
              <ModalButton onPress={() => { closeModal() }} buttonName="Cancel" borderColor={theme.colors.rose} />
              <ModalButton
                onPress={() => {setRemainderVisible(true), closeModal()}}
                buttonName="Set Reminder"
                borderColor={theme.colors.primary}
                backgroundColor={theme.colors.primary}
                txtColor={theme.colors.white}
              />
            {remainderVisible && <SetRemainderModal closeModal={closeVisibleModal} />}
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  )
}

export default SessionScreenModal

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    width: '100%',
    backgroundColor: theme.colors.white,
    borderRadius: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    paddingVertical: theme.padding.md
  },
  container: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: theme.padding.xl,
  },
  img: {
    height: hp(8.5),
    width: wp(18),
    borderRadius: theme.radius.xxs,
    shadowColor: theme.colors.gray,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 3,
  },
  txtContainer: {
    paddingHorizontal: theme.padding.xl,
    width: '88%'
  },
  sessionTitle: {
    fontSize: hp(2.3),
    fontWeight: theme.fonts.bold,
    color: theme.colors.black,
  },
  speakerHeader: {
    fontSize: hp(1.8),
    fontWeight: theme.fonts.bold,
    color: theme.colors.black
  },
  speakerTitle: {
    fontSize: hp(1.8),
    color: theme.colors.lightGrey,
    paddingHorizontal: theme.padding.xl,
  },
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: theme.padding.sm
  }
})
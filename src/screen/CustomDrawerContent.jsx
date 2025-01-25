import React, { useContext, useState } from 'react';
import { DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import LinearGradient from 'react-native-linear-gradient';
import { StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import LogoutModal from '../components/LogOutModal';
import { AuthContext } from '../context/AuthContext';
import { hp } from '../helpers/common';

function CustomDrawerContent(props) {
  const { navigation } = props;
  const { logout } = useContext(AuthContext)

  const [modalVisible, setModalVisible] = useState(false);

  return (
    <LinearGradient colors={['#27974b', '#4ab24f', '#72d054']} style={styles.container}>

      <DrawerContentScrollView {...props}>

        {/* Home */}
        <DrawerItem
          label={({ color }) => (
            <View style={styles.drawerItemContainer}>
              <Icon name="home" size={30} color="white" style={styles.icon} />
              <Text style={[styles.label, { color: "white" }]}>Home</Text>
            </View>
          )}
          onPress={() => {
            navigation.navigate('Home');
            navigation.closeDrawer();
          }}
        />

        {/* My Profile */}
        <DrawerItem
          label={({ color }) => (
            <View style={styles.drawerItemContainer}>
              <Icon name="person" size={30} color="white" style={styles.icon} />
              <Text style={[styles.label, { color: "white" }]}>My Profile</Text>
            </View>
          )}
          onPress={() => {
            navigation.navigate('MyProfile');
            navigation.closeDrawer();
          }}
        />

        {/* Delete Account */}
        <DrawerItem
          label={({ color }) => (
            <View style={styles.drawerItemContainer}>
              <Icon name="person-remove" size={30} color="white" style={styles.icon} />
              <Text style={[styles.label, { color: "white" }]}>Delete Account</Text>
            </View>
          )}
          onPress={() => {
            navigation.navigate('DeleteAccount');
            navigation.closeDrawer();
          }}
        />

        {/* Log Out */}
        <DrawerItem
          label={({ color }) => (
            <View style={styles.drawerItemContainer}>
              <Icon name="settings" size={30} color="white" style={styles.icon} />
              <Text style={[styles.label, { color: "white" }]}>Log Out</Text>
            </View>
          )}
          onPress={() => {
            setModalVisible(true);
          }}
        />
      </DrawerContentScrollView>

      <LogoutModal
        modalVisible={modalVisible}
        onClose={() => setModalVisible(false)}
        onLogout={() => {logout()}} 
      />
    </LinearGradient>
  );
}

export default CustomDrawerContent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingVertical: hp(22)
  },
  drawerItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',    
  },
  icon: {
    marginRight: 10,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white'
  },

})
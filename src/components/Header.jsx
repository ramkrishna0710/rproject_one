import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons';
import { theme } from '../constants/theme';

const Header = ({ navigation, active }) => {
    
    return (
        <View style={[styles.iconContainer, active.value === true ? {borderTopLeftRadius: 16} : {borderTopLeftRadius: 0}]}>
            <TouchableOpacity onPress={() =>{
                active.value = true;
            }}>
                <Icon
                    name={'menu'}
                    size={35}
                    color="white"
                />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { navigation.navigate('Notification') }}>
                <Icon name="notifications" size={35} color="white" />
            </TouchableOpacity>
        </View>
    )
}

export default Header

const styles = StyleSheet.create({
    iconContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: theme.colors.primary,
        paddingHorizontal: theme.padding.xxs,
        paddingBottom: theme.padding.xxs,
        paddingVertical: theme.padding.xl
    },
})
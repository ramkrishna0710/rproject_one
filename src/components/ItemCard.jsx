import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { theme } from '../constants/theme'
import { hp } from '../helpers/common'
import AntDesign from 'react-native-vector-icons/AntDesign'

const ItemCard = ({ imageUri, title, onPress }) => {
    return (
        <TouchableOpacity style={styles.card} onPress={onPress}>
            <Image
                source={{ uri: imageUri }}
                style={styles.cardImage}
            />
            <Text style={styles.cardText} numberOfLines={1}>{title}</Text>
            <AntDesign name='right' size={20} style={styles.arrowRight} />
        </TouchableOpacity>
    )
}

export default ItemCard

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: theme.padding.lg,
        backgroundColor: '#FFFFFF',
        borderRadius: theme.radius.lg,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        elevation: 3,
        padding: hp(0.4)
    },
    cardImage: {
        width: 120,
        height: 100,
        borderRadius: theme.padding.lg
    },
    cardText: {
        flex: 1,
        fontSize: hp(2),
        fontWeight: theme.fonts.bold,
        marginLeft: hp(1),
        color: theme.colors.black,
    },
    arrowRight: {
        color: theme.colors.primary
    }
})
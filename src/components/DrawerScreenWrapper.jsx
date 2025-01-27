import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Animated, { interpolate, useAnimatedStyle } from 'react-native-reanimated'
import { useDrawerProgress } from '@react-navigation/drawer'
import { theme } from '../constants/theme'

const DrawerScreenWrapper = ({ children }) => {

    const progress = useDrawerProgress();

    const animatedStyles = useAnimatedStyle(() => ({
        transform: [
            { perspective: 1000 },
            { scale: interpolate(progress.value, [0, 1], [1, 0.7], 'clamp') },
            { rotateY: `${interpolate(progress.value, [0, 1], [0, -0.2], 'clamp')}deg`, },
            { translateX: interpolate(progress.value, [0, 1], [0, 0, -60], 'clamp') }
        ],
        borderRadius: interpolate(progress.value, [0, 1], [0, theme.padding.md], 'clamp'), overflow: 'hidden'
    }));

    return (
        <Animated.View style={[styles.container, animatedStyles]}>
            {children}
        </Animated.View>
    )
}

export default DrawerScreenWrapper

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})
import { View, StatusBar, Platform } from 'react-native';
import React from 'react';

const CustomStatusbar = () => {
  return (
    <View>
      {Platform.OS === 'android' ? (
        <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
      ) : null}
    </View>
  );
};

export default CustomStatusbar;

import React from 'react';
import { Platform, StatusBar } from 'react-native';

const CustomStatusbar = ({
  hidden = false,
  barStyle = 'dark-content',
}) => {
  const isIOS = Platform.OS === 'ios';

  return (
    <StatusBar
      animated={true}
      backgroundColor={Platform.OS === 'android' ? 'transparent' : undefined}
      translucent={Platform.OS === 'android'}
      barStyle={barStyle}
      hidden={isIOS ? hidden : false}
    />
  );
};

export default CustomStatusbar;
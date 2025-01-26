import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';

const CustomToast = ({ message, visible = false, duration = 2000, onHide }) => {
  const [show, setShow] = useState(visible);
  const fadeAnim = new Animated.Value(0);

  useEffect(() => {
    if (visible) {
      setShow(true);
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();

      setTimeout(() => {
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }).start();
        setTimeout(() => {
          setShow(false);
          if (onHide) onHide();
        }, 500);
      }, duration);
    } else {
      setShow(false);
    }
  }, [visible, duration]);

  if (!show) return null;

  return (
    <Animated.View
      style={[styles.toastContainer, { opacity: fadeAnim }]}
    >
      <Text style={styles.toastText}>{message}</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  toastContainer: {
    position: 'absolute',
    left: 20,
    right: 20,
    bottom: 50,
    backgroundColor: 'black',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  toastText: {
    color: 'white',
    fontSize: 16,
  },
});

export default CustomToast;

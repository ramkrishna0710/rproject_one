import React from 'react';
import { StyleSheet, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const MapStatic = () => {
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 51.4837565,
          longitude: -0.1149737,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        <Marker
          coordinate={{
            latitude: 51.4837565,
            longitude: -0.1149737,
          }}
          title="The Oval Cricket Ground"
          description="Kennington Oval, London SE11 5SS, United Kingdom"
        />
      </MapView>
    </View>
  );
};

export default MapStatic;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1, // Fullscreen map
  },
});

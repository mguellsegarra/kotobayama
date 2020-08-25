/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import MapView, {PROVIDER_GOOGLE, MapTypes, UrlTile} from 'react-native-maps';
import {StyleSheet, View} from 'react-native';
import MapSettings from './mapSettings.json';

const App: () => React$Node = () => {
  return (
    <>
      <View style={styles.container}>
        <MapView
          style={styles.map}
          provider={PROVIDER_GOOGLE}
          initialRegion={{
            latitude: 42.6053217,
            longitude: 0.8774010999999999,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          mapType={'standard'}
          rotateEnabled={false}
          pitchEnabled={false}
          customMapStyle={MapSettings.mapStyle}>
          <UrlTile urlTemplate={MapSettings.urlMapTile} />
        </MapView>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default App;

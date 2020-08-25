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
const mapStyle = [
  {
    elementType: 'labels',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    elementType: 'labels.icon',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    featureType: 'administrative',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    featureType: 'poi',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    featureType: 'road',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    featureType: 'transit',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
];

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
          customMapStyle={mapStyle}>
          <UrlTile
            urlTemplate={
              'https://api.mapbox.com/styles/v1/mguellsegarra/cke5wh6jb2jlm19lqj1uvkifu/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWd1ZWxsc2VnYXJyYSIsImEiOiJjajNpdGU4a2gwMDJqMnhvNzk3YWx5NG4zIn0.rws1hiWTdnnNMPAS1FFkZw'
            }
            // maximumZ={19}
            flipY={false}
          />
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

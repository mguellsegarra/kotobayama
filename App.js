/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import MapView, {PROVIDER_GOOGLE, UrlTile, Marker} from 'react-native-maps';
import {StyleSheet, View} from 'react-native';
import MapSettings from './mapSettings.json';
import Levels from './levels.json';

const getCoordinateFromLatLonString = (latLonString) => {
  const splitted = latLonString.split(',');
  return {
    latitude: parseFloat(splitted[0]),
    longitude: parseFloat(splitted[1]),
  };
};

const CreateMarker = ({id, coord}) => {
  return <Marker key={id} identifier={id} coordinate={coord} />;
};

const fitMarkersMapOptions = {
  edgePadding: {
    top: 50,
    right: 50,
    bottom: 50,
    left: 50,
  },
  animated: true,
};

const App: () => React$Node = () => {
  const allIds = [];
  const markers = [];
  Levels.forEach((level) => {
    markers.push(
      CreateMarker({
        id: level.id.toString(),
        coord: getCoordinateFromLatLonString(level.latlon),
      }),
    );
    allIds.push(level.id.toString());
  });

  // {markers}
  // <UrlTile urlTemplate={MapSettings.urlMapTile} />

  return (
    <>
      <View style={styles.container}>
        <MapView
          style={styles.map}
          provider={PROVIDER_GOOGLE}
          ref={(ref) => {
            this.map = ref;
          }}
          initialCamera={{
            center: {
              latitude: 42.6053217,
              longitude: 0.8774010999999999,
            },
            pitch: 0,
            heading: 0,
            altitude: 1000,
            zoom: 15,
          }}
          mapType={'satellite'}
          rotateEnabled={false}
          pitchEnabled={false}
          customMapStyle={MapSettings.mapStyle}
          onMapReady={() => {
            // this.map.fitToSuppliedMarkers(allIds, fitMarkersMapOptions);
          }}></MapView>
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

import React, {Component} from 'react';
import MapView, {PROVIDER_GOOGLE, Marker, LatLng} from 'react-native-maps';

const Levels = require('../../assets/levels');

import {getStyles} from './mapLayer.style';
import ImageService from '../../services/imageService';

const getCoordinateFromLatLonString = (latLonString: string): LatLng => {
  const splitted = latLonString.split(',');
  return {
    latitude: parseFloat(splitted[0]),
    longitude: parseFloat(splitted[1]),
  };
};

const getMarkerImageForIdx = (idx: number) => {
  return 'marker_' + idx.toString();
};

type CreateMarkerOptions = {
  id: string;
  idx: number;
  coord: LatLng;
  mapReady: boolean;
};

const CreateMarker = (options: CreateMarkerOptions) => {
  return (
    <Marker
      key={options.id}
      identifier={options.id}
      coordinate={options.coord}
      icon={ImageService.getImage(getMarkerImageForIdx(options.idx))}
      tracksViewChanges={!options.mapReady}
    />
  );
};

type Props = {
  controlsEnabled: boolean;
};

export default class MapLayer extends Component<Props> {
  state = {
    allIds: [],
    markers: [],
    mapReady: false,
  };

  styles: Object | undefined;
  map!: MapView;

  componentDidMount() {}

  getMapView() {
    const initialCenter = {
      latitude: 42.6053217,
      longitude: 0.8774010999999999,
    };

    const paddingConstant = 0.99989;
    const that = this;

    return (
      <MapView
        style={this.styles.map}
        provider={PROVIDER_GOOGLE}
        ref={(ref) => {
          this.map = ref;
        }}
        initialCamera={{
          center: {
            latitude: initialCenter.latitude * paddingConstant,
            longitude: initialCenter.longitude,
          },
          pitch: 0,
          heading: 0,
          altitude: 1000,
          zoom: 14,
        }}
        mapType={'satellite'}
        rotateEnabled={false}
        pitchEnabled={false}
        scrollEnabled={this.props.controlsEnabled}
        zoomEnabled={this.props.controlsEnabled}
        moveOnMarkerPress={this.props.controlsEnabled}
        onMapReady={() => {
          const markers = [];
          const allIds = [];
          let i = 1;
          Levels.forEach((level) => {
            markers.push(
              CreateMarker({
                id: level.id.toString(),
                coord: getCoordinateFromLatLonString(level.latlon),
                mapReady: true,
                idx: i,
              }),
            );
            allIds.push(level.id.toString());
            i += 1;
          });

          setTimeout(() => {
            that.setState({markers, allIds});
          }, 100);
        }}>
        {this.state.markers}
      </MapView>
    );
  }

  render() {
    this.styles = getStyles();

    return this.getMapView();
  }
}

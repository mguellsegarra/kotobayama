import React, {Component} from 'react';
import MapView, {PROVIDER_GOOGLE, Marker, LatLng} from 'react-native-maps';

import LevelService, {Level} from '../../services/levelService';

import {getStyles} from './mapLayer.style';

import LevelMarker from './levelMarker';

type Props = {
  controlsEnabled: boolean;
};

type State = {
  allIds: Array<string>;
  markers: Array<any>;
  mapReady: boolean;
};

const initialCenter = {
  latitude: 42.6053217,
  longitude: 0.8774010999999999,
};

const paddingConstant = 0.99989;

export default class MapLayer extends Component<Props, State> {
  state = {
    allIds: [],
    markers: [],
    mapReady: false,
  };

  styles: any;
  map: any;

  componentDidMount() {}

  async resetToLevel() {
    const camera = await this.map.getCamera();
    camera.zoom = 14;
    camera.center = {
      latitude: initialCenter.latitude * paddingConstant,
      longitude: initialCenter.longitude,
    };
    this.map.animateCamera(camera, {duration: 1000});
  }

  getMapView() {
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
          const markers: Array<any> = [];
          const allIds: Array<string> = [];
          let i = 1;
          LevelService.getLevels().forEach((level: Level) => {
            markers.push(
              <LevelMarker
                id={level.id.toString()}
                key={level.id.toString()}
                coord={level.latlon}
                mapReady={true}
                idx={i}
              />,
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

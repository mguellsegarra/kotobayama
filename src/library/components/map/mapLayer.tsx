import React, {Component} from 'react';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';

import {Level} from '../../services/levelService';

import {getStyles} from './mapLayer.style';

import LevelMarker from './levelMarker';

type Props = {
  controlsEnabled: boolean;
  levels: Array<Level>;
  onPanDrag: Function;
  onMapLoaded: Function;
};

type State = {
  allIds: Array<string>;
  markers: Array<any>;
  mapReady: boolean;
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
  currentLevel: number;

  constructor(props: Props) {
    super(props);
    this.currentLevel = 0;
  }

  componentDidMount() {}

  async resetToLevel() {
    const camera = await this.map.getCamera();
    camera.zoom = 14;
    camera.center = {
      latitude:
        this.props.levels[this.currentLevel].latlon.latitude * paddingConstant,
      longitude: this.props.levels[this.currentLevel].latlon.longitude,
    };
    this.map.animateCamera(camera, {duration: 1000});
  }

  setCurrentLevel(level: number) {
    this.currentLevel = level;
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
            latitude:
              this.props.levels[this.currentLevel].latlon.latitude *
              paddingConstant,
            longitude: this.props.levels[this.currentLevel].latlon.longitude,
          },
          pitch: 0,
          heading: 0,
          altitude: 1000,
          zoom: 14,
        }}
        mapType={'satellite'}
        rotateEnabled={false}
        pitchEnabled={false}
        scrollEnabled={true}
        zoomEnabled={this.props.controlsEnabled}
        moveOnMarkerPress={this.props.controlsEnabled}
        onPress={() => {
          this.props.onPanDrag();
        }}
        onDoublePress={() => {
          this.props.onPanDrag();
        }}
        onPanDrag={() => {
          this.props.onPanDrag();
        }}
        onMapReady={() => {
          const markers: Array<any> = [];
          const allIds: Array<string> = [];
          let i = 1;
          this.props.levels.forEach((level: Level) => {
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
            that.setState({markers, allIds}, () => {
              this.props.onMapLoaded();
            });
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

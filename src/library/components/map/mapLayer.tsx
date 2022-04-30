import React, {Component} from 'react';
import MapView, {PROVIDER_GOOGLE, UrlTile, MapTypes} from 'react-native-maps';
const MapSettings = require('@assets/mapSettings');

import {Level} from '@library/models/level';

import {styles} from './mapLayer.style';

import LevelMarker from './levelMarker';
import {MapTypeMode} from '@library/models/mapTypeMode';

import {observer, inject} from 'mobx-react';
import UserStore from '@library/mobx/userStore';
import {getLevelProgress} from '@library/helpers/levelHelper';

import LevelProgressStore from '@library/mobx/levelProgressStore';

type Props = {
  controlsEnabled: boolean;
  levels: Array<Level>;
  packId: string;
  onPanDrag: Function;
  onMapLoaded: Function;
  initialLevel: number;
  userStore?: UserStore;
  levelProgressStore?: LevelProgressStore;
  onMarkerPress: Function;
};

type State = {
  mapReady: boolean;
};

const paddingConstant = 0.99989;

const mapOptionsForMode = new Map<string, any>([
  [MapTypeMode.Sat, {type: 'satellite', mapStyle: undefined}],
  [MapTypeMode.Topo, {type: 'standard', mapStyle: MapSettings.mapStyle}],
]);

@inject('userStore')
@inject('levelProgressStore')
@observer
export default class MapLayer extends Component<Props, State> {
  state = {
    mapReady: false,
  };

  map: any;
  currentLevel: number;

  constructor(props: Props) {
    super(props);
    this.currentLevel = this.props.initialLevel;
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

  getMarkers() {
    const markers: Array<any> = [];

    let i = 1;
    this.props.levels.forEach((level: Level) => {
      const {levelProgress} = getLevelProgress(
        this.props.levelProgressStore?.levelsProgress!,
        level.id,
        this.props.packId,
      );

      markers.push(
        <LevelMarker
          id={level.id.toString()}
          key={level.id.toString()}
          coord={level.latlon}
          idx={i}
          completed={levelProgress?.completed!}
        />,
      );
      i += 1;
    });
    return markers;
  }

  render() {
    const that = this;
    const markers = this.getMarkers();

    return (
      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        ref={(ref) => {
          this.map = ref;
        }}
        onMarkerPress={(marker) => {
          if (marker === null) {
            return;
          }
          this.props.onMarkerPress(marker.nativeEvent);
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
        mapType={
          mapOptionsForMode.get(this.props.userStore?.mapTypeMode!)
            .type as MapTypes
        }
        customMapStyle={
          mapOptionsForMode.get(this.props.userStore?.mapTypeMode!).mapStyle
        }
        rotateEnabled={false}
        pitchEnabled={false}
        scrollEnabled={true}
        zoomEnabled={this.props.controlsEnabled}
        moveOnMarkerPress={false}
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
          that.setState({mapReady: true});
          setTimeout(() => {
            this.props.onMapLoaded();
          }, 100);
        }}>
        {this.props.userStore?.mapTypeMode === MapTypeMode.Topo ? (
          <UrlTile urlTemplate={MapSettings.urlMapTile} />
        ) : null}
        {this.state.mapReady ? markers : null}
      </MapView>
    );
  }
}

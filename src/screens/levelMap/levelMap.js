import React, {Component} from 'react';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import {View, Image, ImageBackground, Text} from 'react-native';
import TouchableScale from 'react-native-touchable-scale';

import Levels from '../../assets/levels.json';
import {getStyles} from './levelMap.style';
import NoNotchView from '../../components/noNotchView';
import ImageService from '../../services/imageService';

const getCoordinateFromLatLonString = (latLonString) => {
  const splitted = latLonString.split(',');
  return {
    latitude: parseFloat(splitted[0]),
    longitude: parseFloat(splitted[1]),
  };
};

const getMarkerImageForIdx = (idx) => {
  return 'marker_' + idx.toString();
};

const CreateMarker = ({id, idx, coord, mapReady}) => {
  return (
    <Marker
      key={id}
      identifier={id}
      coordinate={coord}
      icon={ImageService.getImage(getMarkerImageForIdx(idx))}
      tracksViewChanges={!mapReady}
    />
  );
};

export default class LevelMap extends Component<> {
  state = {
    allIds: [],
    markers: [],
    mapReady: false,
    mapNavigationMode: false,
  };

  styles: Object;
  map: Object;

  constructor() {
    super();
  }

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
        scrollEnabled={this.state.mapNavigationMode}
        zoomEnabled={this.state.mapNavigationMode}
        moveOnMarkerPress={this.state.mapNavigationMode}
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

    return (
      <NoNotchView>
        <View style={this.styles.container}>
          {this.getMapView()}

          {this.state.mapNavigationMode ? null : (
            <View style={this.styles.leftButtonOverlay}>
              <TouchableScale
                style={this.styles.topButtonImage}
                onPress={() => {}}>
                <Image
                  source={ImageService.getImage('backButton')}
                  style={this.styles.topButtonImage}
                  resizeMode="contain"
                />
              </TouchableScale>
            </View>
          )}

          {this.state.mapNavigationMode ? null : (
            <View style={this.styles.rightButtonOverlay}>
              <TouchableScale
                style={this.styles.topButtonImage}
                onPress={() => {
                  setTimeout(() => {
                    this.setState({
                      mapNavigationMode: !this.state.mapNavigationMode,
                    });
                  }, 500);
                }}>
                <Image
                  source={ImageService.getImage('mapButton')}
                  style={this.styles.topButtonImage}
                  resizeMode="contain"
                />
              </TouchableScale>
            </View>
          )}

          {this.state.mapNavigationMode ? null : (
            <View style={this.styles.titleOverlay}>
              <ImageBackground
                source={ImageService.getImage('mapTitleContainer')}
                style={this.styles.mapTitleContainerImage}
                resizeMode="contain">
                <Text style={this.styles.mapTitleText}>
                  Parc Nacional d'Aigüestortes i llac de Sant Maurici
                </Text>
              </ImageBackground>
            </View>
          )}

          {this.state.mapNavigationMode ? null : (
            <View style={this.styles.bottomOverlay} />
          )}

          {this.state.mapNavigationMode ? null : (
            <View style={this.styles.playButtonOverlay}>
              <TouchableScale
                style={this.styles.playButtonImage}
                onPress={() => {}}>
                <ImageBackground
                  source={ImageService.getImage('buttonYellow')}
                  style={this.styles.playButtonImage}
                  resizeMode="contain">
                  <Text style={this.styles.playButtonText}>Jugar</Text>
                </ImageBackground>
              </TouchableScale>
            </View>
          )}

          {this.state.mapNavigationMode ? (
            <View style={this.styles.closeMapButtonOverlay}>
              <TouchableScale
                style={this.styles.playButtonImage}
                onPress={() => {
                  setTimeout(() => {
                    this.setState({
                      mapNavigationMode: !this.state.mapNavigationMode,
                    });
                  }, 500);
                }}>
                <ImageBackground
                  source={ImageService.getImage('buttonYellow')}
                  style={this.styles.playButtonImage}
                  resizeMode="contain">
                  <Text style={this.styles.playButtonText}>Tancar mapa</Text>
                </ImageBackground>
              </TouchableScale>
            </View>
          ) : null}
        </View>
      </NoNotchView>
    );
  }
}

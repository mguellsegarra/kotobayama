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

const CreateMarker = ({id, coord, mapReady}) => {
  return (
    <Marker
      key={id}
      identifier={id}
      coordinate={coord}
      tracksViewChanges={!mapReady}>
      <Image
        source={ImageService.getImage('marker_3')}
        style={getStyles().marker_guess}
        resizeMode="contain"
      />
    </Marker>
  );
};

export default class LevelMap extends Component<> {
  state = {
    allIds: [],
    markers: [],
    mapReady: false,
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
        scrollEnabled={false}
        zoomEnabled={false}
        moveOnMarkerPress={false}
        onMapReady={() => {
          const markers = [];
          const allIds = [];
          Levels.forEach((level) => {
            markers.push(
              CreateMarker({
                id: level.id.toString(),
                coord: getCoordinateFromLatLonString(level.latlon),
                mapReady: true,
              }),
            );
            allIds.push(level.id.toString());
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
          <View style={this.styles.leftButtonOverlay}>
            <TouchableScale
              style={this.styles.topButtonImage}
              onPress={() => {
                console.log('press!');
              }}>
              <Image
                source={ImageService.getImage('backButton')}
                style={this.styles.topButtonImage}
                resizeMode="contain"
              />
            </TouchableScale>
          </View>
          <View style={this.styles.rightButtonOverlay}>
            <TouchableScale
              style={this.styles.topButtonImage}
              onPress={() => {
                console.log('press!');
              }}>
              <Image
                source={ImageService.getImage('mapButton')}
                style={this.styles.topButtonImage}
                resizeMode="contain"
              />
            </TouchableScale>
          </View>

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
          <View style={this.styles.bottomOverlay} />
          <View style={this.styles.playButtonOverlay}>
            <TouchableScale
              style={this.styles.playButtonImage}
              onPress={() => {
                console.log('press!');
              }}>
              <ImageBackground
                source={ImageService.getImage('buttonYellow')}
                style={this.styles.playButtonImage}
                resizeMode="contain">
                <Text style={this.styles.playButtonText}>Jugar</Text>
              </ImageBackground>
            </TouchableScale>
          </View>
        </View>
      </NoNotchView>
    );
  }
}

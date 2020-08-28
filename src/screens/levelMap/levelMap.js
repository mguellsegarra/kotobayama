import React, {Component} from 'react';
import MapView, {PROVIDER_GOOGLE, UrlTile, Marker} from 'react-native-maps';
import {
  View,
  TouchableOpacity,
  Image,
  ImageBackground,
  Text,
} from 'react-native';
import MapSettings from '../../assets/mapSettings.json';
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

const CreateMarker = ({id, coord}) => {
  return <Marker key={id} identifier={id} coordinate={coord} />;
};

// const fitMarkersMapOptions = {
//   edgePadding: {
//     top: 50,
//     right: 50,
//     bottom: 50,
//     left: 50,
//   },
//   animated: true,
// };

export default class LevelMap extends Component<> {
  allIds: Array;
  markers: Array;
  styles: Object;
  map: Object;

  constructor() {
    super();
    this.allIds = [];
    this.markers = [];
  }

  componentDidMount() {
    Levels.forEach((level) => {
      this.markers.push(
        CreateMarker({
          id: level.id.toString(),
          coord: getCoordinateFromLatLonString(level.latlon),
        }),
      );
      this.allIds.push(level.id.toString());
    });
  }

  getMapView() {
    return (
      <MapView
        style={this.styles.map}
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
        scrollEnabled={false}
        zoomEnabled={false}
        customMapStyle={MapSettings.mapStyle}
        onMapReady={() => {
          // this.map.fitToSuppliedMarkers(allIds, fitMarkersMapOptions);
        }}
      />
    );
  }
  render() {
    this.styles = getStyles();

    return (
      <NoNotchView>
        <View style={this.styles.container}>
          {this.getMapView()}
          <View style={this.styles.leftButtonOverlay}>
            <Image
              source={ImageService.getImage('backButton')}
              style={this.styles.topButtonImage}
              resizeMode="contain"
            />
          </View>
          <View style={this.styles.rightButtonOverlay}>
            <Image
              source={ImageService.getImage('mapButton')}
              style={this.styles.topButtonImage}
              resizeMode="contain"
            />
          </View>

          <View style={this.styles.titleOverlay}>
            <Image
              source={ImageService.getImage('mapTitleContainer')}
              style={this.styles.mapTitleContainerImage}
              resizeMode="contain"
            />
          </View>
          <View style={this.styles.bottomOverlay} />
          <View style={this.styles.playButtonOverlay}>
            <ImageBackground
              source={ImageService.getImage('buttonYellow')}
              style={this.styles.playButtonImage}
              resizeMode="contain">
              <Text style={this.styles.playButtonText}>Hola</Text>
            </ImageBackground>
          </View>
        </View>
      </NoNotchView>
    );
  }
}

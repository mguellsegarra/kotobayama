import React, {Component} from 'react';
import {Marker, LatLng} from 'react-native-maps';

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

type Props = {
  id: string;
  idx: number;
  coord: LatLng;
  mapReady: boolean;
};

export default class LevelMarker extends Component<Props> {
  static defaultProps = {
    hide: false,
    onPress: () => {},
    color: 'yellow',
    imageStyle: {},
  };

  render() {
    return (
      <Marker
        key={this.props.id}
        identifier={this.props.id}
        coordinate={this.props.coord}
        icon={ImageService.getImage(getMarkerImageForIdx(this.props.idx))}
        tracksViewChanges={!this.props.mapReady}
      />
    );
  }
}

import React, {Component} from 'react';
import {Marker, LatLng} from 'react-native-maps';

import R, {Images} from '@res/R';

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
  render() {
    return (
      <Marker
        key={this.props.id}
        identifier={this.props.id}
        coordinate={this.props.coord}
        icon={R.img(getMarkerImageForIdx(this.props.idx))}
        tracksViewChanges={!this.props.mapReady}
      />
    );
  }
}

import React, {Component} from 'react';
import {Marker, LatLng} from 'react-native-maps';

import R from '@res/R';

const getMarkerImageForIdx = (idx: number, completed: boolean) => {
  const suffix = completed ? '_green' : '';
  return 'marker_' + idx.toString() + suffix;
};

type Props = {
  id: string;
  idx: number;
  coord: LatLng;
  completed: boolean;
};

export default class LevelMarker extends Component<Props> {
  render() {
    return (
      <Marker
        key={this.props.id}
        identifier={this.props.id}
        coordinate={this.props.coord}
        icon={R.img(getMarkerImageForIdx(this.props.idx, this.props.completed))}
        tracksViewChanges={false}
      />
    );
  }
}

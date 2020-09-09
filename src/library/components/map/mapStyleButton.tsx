import React, {Component} from 'react';
import CircleButton from '@library/components/button/circleButton';
import {styles} from '@screens/levelMap/levelMap.style';

import R, {Images} from '@res/R';

export enum MapStyleMode {
  Sat = 'sat',
  Topo = 'topo',
}

type Props = {
  mapMode: MapStyleMode;
  onPress: Function;
};

type ImagesForMode = {
  [index: string]: string;
};

const imagesForMode: ImagesForMode = {
  sat: Images.map_circle_blue,
  topo: Images.map_circle_green,
};
export default class MapStyleButton extends Component<Props> {
  static defaultProps = {
    mode: MapStyleMode.Sat,
  };

  render() {
    return (
      <CircleButton
        style={styles.mapButton}
        image={imagesForMode[this.props.mapMode]}
        onPress={this.props.onPress}
      />
    );
  }
}

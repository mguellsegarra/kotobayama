import React, {Component} from 'react';
import CircleButton from '@library/components/button/circleButton';
import {styles} from '@screens/levelMap/levelMap.style';
import {MapTypeMode} from '@library/models/mapTypeMode';

import {Images} from '@res/R';

type Props = {
  mapMode: MapTypeMode;
  onPress: Function;
};

const imagesForMode = new Map<string, string>([
  [MapTypeMode.Sat, Images.map_circle_green],
  [MapTypeMode.Topo, Images.map_circle_blue],
]);

export default class MapTypeButton extends Component<Props> {
  static defaultProps = {
    mode: MapTypeMode.Sat,
  };

  render() {
    return (
      <CircleButton
        style={styles.mapButton}
        image={imagesForMode.get(this.props.mapMode)!}
        onPress={this.props.onPress}
      />
    );
  }
}

import React, {Component} from 'react';
import {ViewProps, View, StyleSheet} from 'react-native';

import {Images} from '@res/R';

import CircleButton from '@library/components/button/circleButton';
import {hp} from '@library/services/deviceService';
import {MapTypeMode} from '@library/models/mapTypeMode';

type Props = {
  style: ViewProps;
  mapMode: MapTypeMode;
  onPress: Function;
};

const imagesForMode = new Map<string, string>([
  [MapTypeMode.Sat, Images.map_circle_green],
  [MapTypeMode.Topo, Images.map_circle_blue],
]);

const styles = StyleSheet.create({
  mapButton: {
    width: hp('7%'),
    height: hp('7%'),
  },
});

export default class MapTypeButton extends Component<Props> {
  static defaultProps = {
    mode: MapTypeMode.Sat,
  };

  render() {
    return (
      <View style={this.props.style}>
        <CircleButton
          style={styles.mapButton}
          image={imagesForMode.get(this.props.mapMode)!}
          onPress={this.props.onPress}
        />
      </View>
    );
  }
}

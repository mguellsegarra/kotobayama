import React, {Component} from 'react';
import {View, Image} from 'react-native';
import TouchableScale from 'react-native-touchable-scale';
import ImageService from '../../services/imageService';

import {getStyles} from './genericComponent.style';

export default class GenericComponent extends Component {
  state = {
    enabled: false,
  };

  constructor() {
    super();
    this.method = this.method.bind(this);

    this.state = {
      enabled: false,
    };
  }

  render() {
    this.styles = getStyles();
    const {show} = this.props;

    if (show) {
      return (
        <View style={this.styles.leftButtonOverlay}>
          <TouchableScale
            style={this.styles.topButtonImage}
            onPress={this.props.onPress}>
            <Image
              source={ImageService.getImage('backButton')}
              style={this.styles.topButtonImage}
              resizeMode="contain"
            />
          </TouchableScale>
        </View>
      );
    } else {
      return null;
    }
  }
}

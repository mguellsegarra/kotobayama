/**
 * @format
 * @flow strict-local
 */

import React, {Component} from 'react';
import {View, Image} from 'react-native';
import {getStyles} from './splash.style';
import ImageService from '../../services/imageService';

export default class Splash extends Component<> {
  static navigationOptions = {
    header: null,
  };

  styles: Object;

  render() {
    this.styles = getStyles();

    return (
      <View style={this.styles.background}>
        <Image
          source={ImageService.getImage('ondori_logo')}
          style={this.styles.logo}
          resizeMode="contain"
        />
      </View>
    );
  }
}

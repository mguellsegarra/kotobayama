import React, {Component} from 'react';
import {View, ImageBackground, Text} from 'react-native';

import ImageService from '../../services/imageService';
import {getStyles} from './levelChooser.style';

type Props = {
  totalLevels: number;
  currentLevel: number;
};

export default class LevelChooserNumber extends Component<Props> {
  render() {
    const styles = getStyles();

    return (
      <ImageBackground
        source={ImageService.getImage('levelNumberContainer')}
        style={styles.levelChooserImage}>
        <Text style={styles.levelChooserText}>
          {this.props.currentLevel + 1}/{this.props.totalLevels}
        </Text>
      </ImageBackground>
    );
  }
}

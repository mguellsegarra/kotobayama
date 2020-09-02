import React, {Component} from 'react';
import {ImageBackground, Text} from 'react-native';

import R, {Images} from '@res/R';
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
        source={R.img(Images.level_number_container)}
        style={styles.levelChooserImage}>
        <Text style={styles.levelChooserText}>
          {this.props.currentLevel + 1}/{this.props.totalLevels}
        </Text>
      </ImageBackground>
    );
  }
}

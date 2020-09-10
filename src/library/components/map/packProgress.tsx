import React, {Component} from 'react';
import {ImageBackground, Text} from 'react-native';

import {styles, getSizeForProgress} from '@screens/levelMap/levelMap.style';
import R, {Images} from '@res/R';

type Props = {
  progress: number;
};

export default class PackProgress extends Component<Props> {
  render() {
    const {width, height} = getSizeForProgress(this.props.progress);
    return (
      <ImageBackground
        source={R.img(Images.level_progress_bar)}
        style={styles.progressBar}
        resizeMode={'contain'}>
        <ImageBackground
          source={R.img(Images.level_progress_unit)}
          style={Object.assign({width, height}, styles.progressBarUnit)}
          resizeMode={'stretch'}>
          <Text style={styles.progressText}>{Math.round((this.props.progress + Number.EPSILON) * 10) / 10}{' %'}</Text>
        </ImageBackground>
      </ImageBackground>
    );
  }
}

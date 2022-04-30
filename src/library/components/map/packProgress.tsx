import React, {Component} from 'react';
import {ImageBackground, StyleSheet, Text} from 'react-native';

import {hp} from '@library/services/deviceService';
import R, {Images, Fonts} from '@res/R';

type Props = {
  progress: number;
  width: number;
};

export default class PackProgress extends Component<Props> {
  progressBarHeight: number;
  styles: any;

  constructor(props: Props) {
    super(props);
    this.progressBarHeight = this.props.width * progressBarConstant;
    this.styles = getStyles({
      progressBarWidth: this.props.width,
      progressBarHeight: this.progressBarHeight,
    });
  }

  render() {
    const {width, height} = getSizeForProgress({
      progress: this.props.progress,
      width: this.props.width,
      height: this.progressBarHeight,
    });
    const {styles} = this;
    return (
      <ImageBackground
        source={R.img(Images.level_progress_bar)}
        style={styles.progressBar}
        resizeMode={'contain'}>
        <ImageBackground
          source={R.img(Images.level_progress_unit)}
          style={Object.assign({width, height}, styles.progressBarUnit)}
          resizeMode={'stretch'}>
          <Text style={styles.progressText}>
            {Math.round((this.props.progress + Number.EPSILON) * 10) / 10}
            {' %'}
          </Text>
        </ImageBackground>
      </ImageBackground>
    );
  }
}

const progressBarConstant = 0.126190476190476;

const getSizeForProgress = ({
  progress,
  width,
  height,
}: {
  progress: number;
  width: number;
  height: number;
}) => {
  const maxWidthForProgress = width * 0.905;
  const progressHeight = height * 0.5;

  return {
    width: maxWidthForProgress * (progress / 100),
    height: progressHeight,
  };
};

const getStyles = ({
  progressBarWidth,
  progressBarHeight,
}: {
  progressBarWidth: number;
  progressBarHeight: number;
}) => {
  return StyleSheet.create({
    progressBar: {
      width: progressBarWidth,
      height: progressBarHeight,
      marginTop: hp('0.5%'),
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
      paddingBottom: progressBarHeight * 0.1,
    },
    progressBarUnit: {
      marginTop: progressBarHeight * 0.18,
      marginLeft: progressBarWidth * 0.05,
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    },
    progressText: {
      fontFamily: Fonts.league,
      marginTop: progressBarHeight * 0.01,
      fontSize: progressBarHeight * 0.45,
      color: 'white',
      textAlign: 'center',
    },
  });
};

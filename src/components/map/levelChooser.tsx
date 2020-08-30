import React, {Component} from 'react';
import {View, ImageBackground, Image, Text} from 'react-native';

import images from 'res/images';
import {getStyles} from './levelChooser.style';
import CircleButton from '../button/circleButton';
import LevelChooserNumber from './levelChooserNumber';

type Props = {
  hide?: boolean;
  totalLevels: number;
  currentLevel: number;
  onNextLevel: Function;
  onPrevLevel: Function;
};

export default class LevelChooser extends Component<Props> {
  static defaultProps = {
    hide: false,
  };

  render() {
    const styles = getStyles();

    if (this.props.hide) {
      return null;
    }

    const pic = images['1000' + (this.props.currentLevel + 1).toString()];

    return (
      <ImageBackground
        source={images['levelChooserBg']}
        style={styles.container}>
        <View style={styles.levelBar}>
          <View style={styles.levelBarFlex}>
            <View style={styles.levelBarArrow}>
              <CircleButton
                image="leftArrow"
                style={{flex: 1}}
                onPress={this.props.onPrevLevel}
              />
            </View>
            <View style={styles.levelBarMiddle}>
              <LevelChooserNumber
                totalLevels={this.props.totalLevels}
                currentLevel={this.props.currentLevel}
              />
            </View>
            <View style={styles.levelBarArrow}>
              <CircleButton
                image="rightArrow"
                style={{flex: 1}}
                onPress={this.props.onNextLevel}
              />
            </View>
          </View>
        </View>
        <View style={styles.levelDetails}>
          <View style={styles.levelDetailsImage}>
            <Image
              resizeMode="cover"
              style={styles.levelDetailsImagePic}
              source={pic}
            />

            <Image
              resizeMode="cover"
              style={styles.levelDetailsImageFrame}
              source={images['photoFrame']}
            />
          </View>
        </View>
      </ImageBackground>
    );
  }
}

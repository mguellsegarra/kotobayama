import React, {Component} from 'react';
import {View, Image, ImageBackground, Text, ViewStyle} from 'react-native';

import {styles} from '@screens/levelMap/levelMap.style';

import R, {Images} from '@res/R';

type Props = {
  style: ViewStyle;
  hide: boolean;
  title: string;
  stars: number;
};

export default class LevelCompletedBanner extends Component<Props> {
  render() {
    if (this.props.hide) {
      return null;
    }

    return (
      <View style={this.props.style}>
        <ImageBackground
          style={styles.levelCompletedImage}
          source={R.img(Images.level_completed_banner)}>
          <View style={styles.levelCompletedContainer}>
            <View style={styles.levelCompletedTop}>
              <Image
                resizeMode={'contain'}
                source={R.img(Images.tick)}
                style={styles.levelCompletedTick}
              />
            </View>
            <View style={styles.levelCompletedMiddle}>
              <Text adjustsFontSizeToFit numberOfLines={1} style={styles.levelCompletedTitle}>{this.props.title}</Text>
            </View>
            <View style={styles.levelCompletedBottom}>
            <Image
                resizeMode={'contain'}
                source={R.img(Images.star_yellow)}
                style={styles.levelCompletedStar}
              />
              <Image
                resizeMode={'contain'}
                source={R.img(Images.star_yellow)}
                style={styles.levelCompletedStar}
              />
              <Image
                resizeMode={'contain'}
                source={R.img(Images.star_yellow)}
                style={styles.levelCompletedStar}
              />

            </View>
          </View>
        </ImageBackground>
      </View>
    );
  }
}

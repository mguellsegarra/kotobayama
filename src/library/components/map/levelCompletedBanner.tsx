import React, {Component} from 'react';
import {Image, ImageBackground, Text, ViewStyle, Platform} from 'react-native';
import {View} from 'react-native-animatable';
const isAndroid = Platform.OS === 'android';

import {styles} from '@screens/levelMap/levelMap.style';

import R, {Images} from '@res/R';

type Props = {
  style: ViewStyle;
  title: string;
  stars: number;
  visible?: boolean;
  pointerEvents: 'box-none' | 'none' | 'box-only' | 'auto' | undefined;
};

export default class LevelCompletedBanner extends Component<Props> {
  containerView: any;

  static defaultProps = {
    visible: true,
  };

  animate(animationType: string, duration: number) {
    this.containerView.animate(animationType, duration);
  }

  getStarsImages() {
    switch (this.props.stars) {
      case 3:
        return [Images.star_yellow, Images.star_yellow, Images.star_yellow];
      case 2:
        return [Images.star_yellow, Images.star_yellow, Images.star_gray];
      default:
        return [Images.star_yellow, Images.star_gray, Images.star_gray];
    }
  }

  render() {
    return (
      <View
        useNativeDriver={!isAndroid}
        ref={(ref) => {
          this.containerView = ref;
        }}
        pointerEvents={this.props.pointerEvents}
        style={Object.assign(
          {opacity: this.props.visible ? 1 : 0},
          this.props.style,
        )}>
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
              <Text
                adjustsFontSizeToFit
                numberOfLines={1}
                style={styles.levelCompletedTitle}>
                {this.props.title}
              </Text>
            </View>
            <View style={styles.levelCompletedBottom}>
              <Image
                resizeMode={'contain'}
                source={R.img(this.getStarsImages()![0])}
                style={styles.levelCompletedStar}
              />
              <Image
                resizeMode={'contain'}
                source={R.img(this.getStarsImages()![1])}
                style={styles.levelCompletedStar}
              />
              <Image
                resizeMode={'contain'}
                source={R.img(this.getStarsImages()![2])}
                style={styles.levelCompletedStar}
              />
            </View>
          </View>
        </ImageBackground>
      </View>
    );
  }
}

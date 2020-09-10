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
};

export default class LevelCompletedBanner extends Component<Props> {
  containerView: any;

  static defaultProps = {
    visible: true,
  };

  animate(animationType: string, duration: number) {
    this.containerView.animate(animationType, duration);
  }

  render() {
    return (
      <View
        useNativeDriver={!isAndroid}
        ref={(ref) => {
          this.containerView = ref;
        }}
        pointerEvents={'none'}
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

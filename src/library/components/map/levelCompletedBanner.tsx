import React, {Component} from 'react';
import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  ViewStyle,
} from 'react-native';
import {View} from 'react-native-animatable';
import {isAndroid, isTablet, wp, hp} from '@library/services/deviceService';
const poiTypes = require('@assets/poiTypes');

import R, {Images, Fonts} from '@res/R';

type Props = {
  style: ViewStyle;
  title: string;
  stars: number;
  type: string;
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
                source={R.img(poiTypes[this.props.type]?.image)}
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

const levelCompletedContainerWidth = isTablet() ? wp('40%') : wp('60%');
const levelCompletedContainerConstant = 0.408829174664107;
const levelCompletedContainerHeight =
  levelCompletedContainerWidth * levelCompletedContainerConstant;

const levelCompletedTickHeight = levelCompletedContainerHeight / 5;
const levelCompletedTickConstant = 1.09375;
const levelCompletedTickWidth =
  levelCompletedTickHeight / levelCompletedTickConstant;

const styles = StyleSheet.create({
  levelCompletedImage: {
    width: levelCompletedContainerWidth,
    height: levelCompletedContainerHeight,
  },
  levelCompletedContainer: {
    marginTop: levelCompletedContainerHeight * 0.09,
    marginBottom: levelCompletedContainerHeight * 0.09,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  levelCompletedTop: {
    width: '93%',
    flex: 2,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  levelCompletedMiddle: {
    width: '93%',
    flex: 2,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: hp('1%'),
  },
  levelCompletedTick: {
    marginBottom: hp('1.5%'),
    height: hp('5%'),
    width: hp('5%'),
  },
  levelCompletedBottom: {
    width: '93%',
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: hp('1%'),
  },
  levelCompletedStar: {
    height: levelCompletedTickHeight,
    width: levelCompletedTickWidth,
    marginRight: wp('0.5%'),
    marginLeft: wp('0.5%'),
  },
  levelCompletedTitle: {
    width: '90%',
    fontFamily: Fonts.league,
    fontSize: wp('4%'),
    color: 'white',
    textAlign: 'center',
  },
});

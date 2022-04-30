import React, {Component} from 'react';
import {ImageBackground, StyleSheet, Text} from 'react-native';
import {View} from 'react-native-animatable';

import {isTablet, wp, hp} from '@library/services/deviceService';

import R, {Images, Fonts} from '@res/R';
import PackProgress from './packProgress';

type Props = {
  style: any;
  title: string;
  progress: number;
  pointerEvents: 'box-none' | 'none' | 'box-only' | 'auto' | undefined;
};

export default class MapTitleBanner extends Component<Props> {
  containerView: any;

  animate(animationType: string, duration: number) {
    this.containerView.animate(animationType, duration);
  }

  render() {
    return (
      <View
        style={this.props.style}
        useNativeDriver
        ref={(ref) => {
          this.containerView = ref;
        }}
        pointerEvents={this.props.pointerEvents}>
        <ImageBackground
          source={R.img(Images.map_title_container)}
          style={styles.mapTitleContainerImage}>
          <Text style={styles.mapTitleText}>{this.props.title}</Text>
          <PackProgress
            width={progressBarWidth}
            progress={this.props.progress}
          />
          <View style={styles.progressBarBottomSpace} />
        </ImageBackground>
      </View>
    );
  }
}

const titleBannerConstant = 0.2922;
const titleBannerWidth = isTablet() ? wp('60%') : wp('82%');

export const titleBannerOptions = {
  width: titleBannerWidth,
  height: titleBannerWidth * titleBannerConstant,
};

const progressBarWidth = titleBannerOptions.width / 2;

const titleFont = titleBannerOptions.height * 0.14;
const titleMarginSides = titleBannerOptions.width * 0.05;
const titleLineHeight = titleBannerOptions.height * 0.2;

const styles = StyleSheet.create({
  mapTitleContainerImage: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  mapTitleText: {
    height: '40%',
    fontFamily: Fonts.league,
    fontSize: titleFont,
    color: 'white',
    textAlign: 'center',
    marginLeft: titleMarginSides,
    marginRight: titleMarginSides,
    marginTop: hp('2%'),
    lineHeight: titleLineHeight,
    textAlignVertical: 'center',
  },
  progressBarBottomSpace: {
    height: hp('2%'),
  },
});

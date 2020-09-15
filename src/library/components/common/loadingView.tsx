import React, {Component} from 'react';
import {ImageBackground, StyleSheet, Animated} from 'react-native';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import R from '@res/R';

type Props = {
  style: any;
  image: string;
};

const style = StyleSheet.create({
  overlayLoad: {
    zIndex: 2,
    position: 'absolute',
    width: wp('100%'),
    height: hp('100%'),
  },
});

export default class LoadingView extends Component<Props> {
  render() {
    return (
      <Animated.View
        pointerEvents="none"
        style={[style.overlayLoad, this.props.style]}>
        <ImageBackground
          source={R.img(this.props.image)}
          style={style.overlayLoad}></ImageBackground>
      </Animated.View>
    );
  }
}

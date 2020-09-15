import React, {Component} from 'react';
import {ImageBackground, StyleSheet, Animated} from 'react-native';
import {View as AnimatableView} from 'react-native-animatable';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import R from '@res/R';

type Props = {
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

type State = {
  hide: boolean;
};

export default class LoadingView extends Component<Props, State> {
  container: any;

  constructor(props: Props) {
    super(props);
    this.state = {hide: true};
  }

  fadeOut() {
    if (this.container && this.container !== null) {
      this.container.animate('fadeOut', 800);
      this.setState({hide: true});
    }
  }

  ensureHidden() {
    if (!__DEV__) {
      return;
    }

    if (this.container && this.container !== null) {
      this.setState({hide: false});
    }
  }

  render() {
    if (this.state.hide) {
      return null;
    }

    return (
      <AnimatableView
        useNativeDriver
        ref={(ref: any) => {
          this.container = ref;
        }}
        pointerEvents="none"
        style={style.overlayLoad}>
        <ImageBackground
          source={R.img(this.props.image)}
          style={style.overlayLoad}></ImageBackground>
      </AnimatableView>
    );
  }
}

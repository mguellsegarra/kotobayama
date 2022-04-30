import React, {Component} from 'react';
import {Image, StyleSheet} from 'react-native';
import {View as AnimatableView} from 'react-native-animatable';

import {wp, hp} from '@library/services/deviceService';
import R from '@res/R';
import delayPromise from '@library/utils/delayPromise';

type Props = {
  image: string;
  devMode: boolean; // In order to get rid of autorefresh overlapping views
};

type State = {
  hide: boolean;
};

export default class LoadingView extends Component<Props, State> {
  container: any;

  constructor(props: Props) {
    super(props);
    this.state = {hide: this.props.devMode};
  }

  async fadeOut() {
    this.setState({hide: false});

    if (this.container && this.container !== null && !this.props.devMode) {
      this.container.animate('fadeOut', 800);
      await delayPromise(800);
    }
    this.setState({hide: true});
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
        <Image source={R.img(this.props.image)} style={style.overlayLoad} />
      </AnimatableView>
    );
  }
}

const style = StyleSheet.create({
  overlayLoad: {
    zIndex: 2,
    position: 'absolute',
    width: wp('100%'),
    height: hp('100%'),
    opacity: 1,
  },
});

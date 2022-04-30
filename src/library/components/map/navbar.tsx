import React, {Component} from 'react';
import {View, ViewProps} from 'react-native';
import {View as AnimatableView} from 'react-native-animatable';

import {styles} from './navbar.style';
import {Images} from '@res/R';

import CircleButton from '@library/components/button/circleButton';
import CoinCounter from '@library/components/game/coinCounter';

type Props = {
  pointerEvents: 'none' | 'auto';
  animatedRef: Function;
  totalCoins: number;
  style: ViewProps;
  onBack: Function;
  onCoinTap: Function;
};

export default class Navbar extends Component<Props> {
  render() {
    return (
      <AnimatableView
        useNativeDriver
        style={this.props.style}
        ref={this.props.animatedRef as any}
        pointerEvents={this.props.pointerEvents}>
        <View style={styles.navBarLeft}>
          <CircleButton
            style={styles.backButton}
            image={Images.back_button}
            onPress={this.props.onBack}></CircleButton>
        </View>
        <View style={styles.navBarMiddle}></View>
        <View style={styles.navBarRight}>
          <CoinCounter
            totalCoins={this.props.totalCoins}
            onPress={this.props.onCoinTap}
          />
        </View>
      </AnimatableView>
    );
  }
}

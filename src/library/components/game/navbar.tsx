import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';

import {Images} from '@res/R';

import CircleButton from '@library/components/button/circleButton';
import LivesIndicator from '@library/components/game/livesIndicator';
import CoinCounter from '@library/components/game/coinCounter';
import {hp} from '@library/services/deviceService';

type Props = {
  style: any;
  livesIndicatorRef: Function;
  onBackPress: Function;
  lives: number;
  coins: number;
  onCoinsTap: Function;
};

export default class Navbar extends Component<Props> {
  render() {
    return (
      <View style={this.props.style}>
        <View style={styles.navBarLeft}>
          <CircleButton
            style={styles.backButton}
            image={Images.back_button}
            onPress={this.props.onBackPress}></CircleButton>
        </View>
        <View style={styles.navBarMiddle}>
          <LivesIndicator
            ref={this.props.livesIndicatorRef as any}
            lives={this.props.lives}
          />
        </View>
        <View style={styles.navBarRight}>
          <CoinCounter
            totalCoins={this.props.coins}
            onPress={this.props.onCoinsTap}
          />
        </View>
      </View>
    );
  }
}

const backButtonSize = hp('5%');

const styles = StyleSheet.create({
  navBarLeft: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  navBarRight: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  navBarMiddle: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButton: {
    width: backButtonSize,
    height: backButtonSize,
    marginLeft: 4,
  },
});

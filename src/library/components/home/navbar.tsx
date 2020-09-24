import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';

import CoinCounter from '@library/components/game/coinCounter';
import {hp} from '@library/services/deviceService';

type Props = {
  style: any;
  coins: number;
  onCoinsTap: Function;
};

export default class Navbar extends Component<Props> {
  render() {
    return (
      <View style={this.props.style}>
        <View style={styles.navBarLeft}>
        </View>
        <View style={styles.navBarMiddle}>
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

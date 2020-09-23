import React, {Component} from 'react';
import {TouchableWithoutFeedback, Image, Text, View} from 'react-native';
import CoinCounterText from './coinCounterText';

import R, {Images} from '@res/R';
import {styles} from './coinCounter.style';

type Props = {
  totalCoins: number;
  onPress: Function;
};

export default class CoinCounter extends Component<Props> {
  render() {
    return (
      <TouchableWithoutFeedback
        onPress={() => {
          this.props.onPress();
        }}>
        <View style={styles.container}>
          <Image
            resizeMode="contain"
            style={styles.image}
            source={R.img(Images.coins)}
          />

          <CoinCounterText coins={this.props.totalCoins} />
          <Text adjustsFontSizeToFit style={styles.plus}>
            +
          </Text>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

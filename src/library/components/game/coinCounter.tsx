import React, {Component} from 'react';
import {TouchableWithoutFeedback, Image, Text, View} from 'react-native';

import R, {Images} from '@res/R';
import {getStyles} from './coinCounter.style';

type Props = {
  totalCoins: number;
  onPress: Function;
};

export default class CoinCounter extends Component<Props> {
  render() {
    const styles = getStyles();

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
          <Text adjustsFontSizeToFit style={styles.text}>
            {this.props.totalCoins}
          </Text>
          <Text adjustsFontSizeToFit style={styles.plus}>
            +
          </Text>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

import React, {Component} from 'react';
import {TouchableWithoutFeedback, Image, Text} from 'react-native';
import {View} from 'react-native-animatable';

import CoinCounterText from './coinCounterText';

import R, {Images} from '@res/R';
import {styles} from './coinCounter.style';

type Props = {
  totalCoins: number;
  onPress: Function;
};

export default class CoinCounter extends Component<Props> {
  container: any;

  constructor(props: Props) {
    super(props);
    this.tadaAnimate = this.tadaAnimate.bind(this);
  }

  tadaAnimate() {
    this.container.animate('tada', 2000);
  }

  render() {
    return (
      <TouchableWithoutFeedback
        onPress={() => {
          this.props.onPress();
        }}>
        <View
          useNativeDriver
          ref={(ref) => {
            this.container = ref;
          }}
          style={styles.container}>
          <Image
            resizeMode="contain"
            style={styles.image}
            source={R.img(Images.coins)}
          />

          <CoinCounterText
            coins={this.props.totalCoins}
            onAnimation={() => {
              this.tadaAnimate();
            }}
          />
          <Text adjustsFontSizeToFit style={styles.plus}>
            +
          </Text>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

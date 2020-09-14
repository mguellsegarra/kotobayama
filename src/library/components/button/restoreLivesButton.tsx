import React, {Component} from 'react';
import {Text, Image} from 'react-native';
import {strings} from '@library/services/i18nService';
import {View} from 'react-native-animatable';
import R, {Images} from '@res/R';

import RectButton, {
  RectButtonEnum,
} from '@library/components/button/rectButton';

import {styles} from '@screens/levelMap/levelMap.style';

type Props = {
  onPress: Function;
  price: number;
};

export default class RestoreLivesButton extends Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    return (
      <RectButton type={RectButtonEnum.Red} onPress={this.props.onPress}>
        <View style={styles.countdownButton}>
          <View style={styles.countdownButtonUpperView}>
            <Text style={styles.countdownButtonUpperText}>
              {strings('restoreLives')}
            </Text>
          </View>
          <View style={styles.countdownButtonLowerView}>
            <Image
              style={styles.countdownButtonLowerCoin}
              source={R.img(Images.coin_small)}
            />
            <Text style={styles.countdownButtonLowerText}>
              {this.props.price}
            </Text>
          </View>
        </View>
      </RectButton>
    );
  }
}

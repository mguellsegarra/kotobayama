import React, {Component} from 'react';
import {Image, ImageBackground, View, Text} from 'react-native';
// @ts-ignore
import TouchableScale from 'react-native-touchable-scale';

import R, {Images} from '@res/R';
import {styles} from './powerUpsBar.style';
const gameConfig = require('@assets/gameConfig');
import {strings} from '@library/services/i18nService';

type Props = {
  style: any;
  onSolveLetterPress: Function;
  onDestroyLettersPress: Function;
  onAskFriendPress: Function;
  bombDisabled: boolean;
};

const PowerUpComponent = (
  image: string,
  text: string,
  price: string,
  disabled: boolean,
  onPress: Function,
) => {
  let containerView = disabled
    ? Object.assign({opacity: 0.7}, styles.powerUpContainer)
    : styles.powerUpContainer;

  return (
    <View style={containerView} pointerEvents={disabled ? 'none' : undefined}>
      <View style={styles.topLabel}>
        <Text
          numberOfLines={1}
          adjustsFontSizeToFit
          style={styles.topLabelText}>
          {text}
        </Text>
      </View>
      <View style={styles.midImage}>
        <TouchableScale
          onPress={() => {
            setTimeout(() => {
              onPress();
            }, 300);
          }}>
          <ImageBackground
            source={R.img(Images.square_bg_powerup)}
            style={styles.square_bg}>
            <Image
              resizeMode="contain"
              style={styles.powerupImage}
              source={R.img(image)}></Image>
          </ImageBackground>
        </TouchableScale>
      </View>
      <View style={styles.bottomPrice}>
        <Image style={styles.coin} source={R.img(Images.coin_small)} />
        <Text numberOfLines={1} adjustsFontSizeToFit style={styles.coinText}>
          {price}
        </Text>
      </View>
    </View>
  );
};

export default class PowerUpsBar extends Component<Props> {
  render() {
    return (
      <View style={this.props.style}>
        <View style={styles.container}>
          {PowerUpComponent(
            Images.potion_red,
            strings('solveLetter'),
            gameConfig.priceSolveLetter.toString(),
            false,
            this.props.onSolveLetterPress,
          )}
          {PowerUpComponent(
            Images.bomb,
            strings('destroyLetters'),
            gameConfig.priceDestroyLetters.toString(),
            this.props.bombDisabled,
            this.props.onDestroyLettersPress,
          )}
          {PowerUpComponent(
            Images.scroll,
            strings('askFriend'),
            strings('free'),
            false,
            this.props.onAskFriendPress,
          )}
        </View>
      </View>
    );
  }
}

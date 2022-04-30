import React, {Component} from 'react';
import {
  StyleSheet,
  ImageBackground,
  ImageSourcePropType,
  Text,
} from 'react-native';
// @ts-ignore
import TouchableScale from 'react-native-touchable-scale';

import {wp, hp, isTablet, isAndroid} from '@library/services/deviceService';
import {Fonts} from '@res/R';

type Props = {
  image: ImageSourcePropType;
  onPress: Function;
  text: string;
};

export default class OptionButton extends Component<Props> {
  render() {
    return (
      <TouchableScale onPress={this.props.onPress}>
        <ImageBackground
          resizeMode="contain"
          style={styles.buttonOption}
          source={this.props.image}>
          <Text style={styles.text}>{this.props.text.toUpperCase()}</Text>
        </ImageBackground>
      </TouchableScale>
    );
  }
}

const buttonK = 0.196078431372549;
const buttonWidth = isTablet() ? wp('50%') : wp('70%');

const styles = StyleSheet.create({
  buttonOption: {
    width: buttonWidth,
    height: buttonWidth * buttonK,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  text: {
    fontFamily: Fonts.alata,
    color: 'white',
    fontSize: hp('3%'),
    marginTop: isAndroid ? 0 : hp('0.5%'),
    marginLeft: buttonWidth * 0.15,
  },
});

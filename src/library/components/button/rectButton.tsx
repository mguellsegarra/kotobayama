import React, {Component} from 'react';
import {View, ImageBackground, Text, ViewStyle, TextStyle} from 'react-native';

// @ts-ignore
import TouchableScale from 'react-native-touchable-scale';
import {isTablet} from 'react-native-device-info';

import R from 'src/res';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

type Props = {
  text: string;
  hide?: boolean;
  onPress?: Function;
  type: RectButtonEnum;
  imageStyle?: ViewStyle;
  textStyle?: TextStyle;
  style?: ViewStyle;
};

export enum RectButtonEnum {
  Yellow = 'yellow',
  Blue = 'blue',
}

interface RectButtonType {
  image: string;
  textColor: string;
}

interface RectButtonTypeConfig {
  [index: string]: RectButtonType;
}

const RectButtonTypes: RectButtonTypeConfig = {
  yellow: {
    image: 'buttonYellow',
    textColor: R.colors.yellowButtonText,
  },
  blue: {
    image: 'buttonBlue',
    textColor: 'white',
  },
};

export default class RectButton extends Component<Props> {
  static defaultProps = {
    hide: false,
    onPress: () => {},
    imageStyle: {},
  };

  render() {
    if (this.props.hide) {
      return null;
    }

    const rectButtonConfig =
      RectButtonTypes[this.props.type] || RectButtonTypes['yellow'];

    const buttonWidth = isTablet() ? wp('30%') : wp('42%');
    const buttonRatioConstant = 0.3525;
    const buttonHeight = buttonWidth * buttonRatioConstant;
    const buttonShadowBottomConstant = 0.063063063063063;
    const buttonTextMarginBottom = buttonHeight * buttonShadowBottomConstant;
    const buttonTextFontSize = hp('3%');

    const defaultImageStyle: ViewStyle = {
      flex: 1,
      flexDirection: 'column',
      width: buttonWidth,
      justifyContent: 'center',
      alignItems: 'center',
    };

    if (!this.props.hide) {
      return (
        <View
          style={[
            this.props.style,
            {
              width: buttonWidth,
              height: buttonHeight,
            },
          ]}>
          <TouchableScale
            style={Object.assign(defaultImageStyle, this.props.imageStyle)}
            onPress={this.props.onPress}>
            <ImageBackground
              source={R.images[rectButtonConfig.image]}
              style={Object.assign(defaultImageStyle, this.props.imageStyle)}
              resizeMode="contain">
              <Text
                style={{
                  ...this.props.textStyle,
                  ...{
                    marginBottom: buttonTextMarginBottom,
                    fontFamily: R.fonts.lilita,
                    fontSize: buttonTextFontSize,
                    color: rectButtonConfig.textColor,
                  },
                }}>
                {this.props.text}
              </Text>
            </ImageBackground>
          </TouchableScale>
        </View>
      );
    } else {
      return null;
    }
  }
}

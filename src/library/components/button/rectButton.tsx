import React, {Component} from 'react';
import {View, ImageBackground, Text, ViewStyle, TextStyle} from 'react-native';

// @ts-ignore
import TouchableScale from 'react-native-touchable-scale';
import {isTablet} from 'react-native-device-info';

import R, {Colors, Fonts, Images} from '@res/R';

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
  delay?: number;
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
    image: Images.button_yellow,
    textColor: Colors.yellowButtonText,
  },
  blue: {
    image: Images.button_blue,
    textColor: 'white',
  },
};

export default class RectButton extends Component<Props> {
  static defaultProps = {
    hide: false,
    onPress: () => {},
    imageStyle: {},
    delay: 300,
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
            onPress={() => {
              setTimeout(this.props.onPress, this.props.delay);
            }}>
            <ImageBackground
              source={R.img(rectButtonConfig.image)}
              style={Object.assign(defaultImageStyle, this.props.imageStyle)}>
              <Text
                style={{
                  ...this.props.textStyle,
                  ...{
                    marginBottom: buttonTextMarginBottom,
                    fontFamily: Fonts.lilita,
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

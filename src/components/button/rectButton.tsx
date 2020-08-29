import React, {Component} from 'react';
import {
  View,
  ImageBackground,
  Text,
  ViewStyle,
  TextStyle,
  ImageStyle,
  StyleSheet,
} from 'react-native';

// @ts-ignore
import TouchableScale from 'react-native-touchable-scale';
import {isTablet} from 'react-native-device-info';

import ImageService from '../../services/imageService';
import Colors from '../../styles/colors.style';
import Fonts from '../../styles/fonts.style';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

type Props = {
  text: string;
  hide?: boolean;
  onPress?: Function;
  color: string;
  imageStyle?: ViewStyle;
  textStyle?: TextStyle;
  style?: ViewStyle;
};

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
    textColor: Colors.RectButton.yellowButtonText,
  },
};

export default class RectButton extends Component<Props> {
  static defaultProps = {
    hide: false,
    onPress: () => {},
    color: 'yellow',
    imageStyle: {},
  };

  render() {
    if (this.props.hide) {
      return null;
    }

    const rectButtonConfig =
      RectButtonTypes[this.props.color] || RectButtonTypes['yellow'];

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
              source={ImageService.getImage(rectButtonConfig.image)}
              style={Object.assign(defaultImageStyle, this.props.imageStyle)}
              resizeMode="contain">
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

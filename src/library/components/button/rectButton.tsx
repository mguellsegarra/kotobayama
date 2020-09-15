import React, {Component} from 'react';
import {
  ImageBackground,
  Text,
  ViewStyle,
  TextStyle,
} from 'react-native';
import {View} from 'react-native-animatable';

// @ts-ignore
import TouchableScale from 'react-native-touchable-scale';

import R, {Colors, Fonts, Images} from '@res/R';
import {wp, hp, isTablet, isAndroid} from '@library/services/deviceService';

type Props = {
  text?: string;
  onPress?: Function;
  type: RectButtonEnum;
  imageStyle?: ViewStyle;
  textStyle?: TextStyle;
  style?: ViewStyle;
  delay?: number;
  pointerEvents?: 'box-none' | 'none' | 'box-only' | 'auto' | undefined;
  visible?: boolean;
};

export enum RectButtonEnum {
  Yellow = 'yellow',
  Blue = 'blue',
  Red = 'red',
  Green = 'green',
}

interface RectButtonType {
  image: string;
  textColor: string;
}

const rectButtonTypes = new Map<string, RectButtonType>([
  [
    RectButtonEnum.Yellow,
    {
      image: Images.button_yellow,
      textColor: Colors.yellowButtonText,
    },
  ],
  [
    RectButtonEnum.Blue,
    {
      image: Images.button_blue,
      textColor: 'white',
    },
  ],
  [
    RectButtonEnum.Red,
    {
      image: Images.button_red,
      textColor: Colors.redButtonText,
    },
  ],
  [
    RectButtonEnum.Green,
    {
      image: Images.button_green,
      textColor: Colors.greenButtonText,
    },
  ],
]);

const buttonRatioConstant = 0.3525;
const buttonShadowBottomConstant = 0.063063063063063;

export const defaultButtonSize = {
  width: isTablet() ? wp('30%') : wp('42%'),
  height: isTablet()
    ? wp('30%') * buttonRatioConstant
    : wp('42%') * buttonRatioConstant,
  marginBottom:
    (isTablet()
      ? wp('30%') * buttonRatioConstant
      : wp('42%') * buttonRatioConstant) * buttonShadowBottomConstant,
};

export default class RectButton extends Component<Props> {
  static defaultProps = {
    hide: false,
    onPress: () => {},
    imageStyle: {},
    delay: 300,
    visible: true,
  };
  containerView: any;

  animate(animationType: string, duration: number) {
    this.containerView.animate(animationType, duration);
  }

  render() {
    const rectButtonConfig =
      rectButtonTypes.get(this.props.type) ||
      rectButtonTypes.get(RectButtonEnum.Yellow);

    const buttonTextFontSize = hp('3%');

    const defaultImageStyle: ViewStyle = {
      flex: 1,
      flexDirection: 'column',
      width: defaultButtonSize.width,
      justifyContent: 'center',
      alignItems: 'center',
    };

    let viewStyle = Object.assign({}, this.props.style);
    const width: number = this.props.style?.width as number;
    viewStyle.width = width | defaultButtonSize.width;
    viewStyle.height = viewStyle.width * buttonRatioConstant;
    const buttonTextMarginBottom =
      viewStyle.height * buttonShadowBottomConstant;

    return (
      <View
        useNativeDriver={!isAndroid}
        ref={(ref) => {
          this.containerView = ref;
        }}
        pointerEvents={this.props.pointerEvents}
        style={Object.assign({opacity: this.props.visible ? 1 : 0}, viewStyle)}>
        <TouchableScale
          style={Object.assign(defaultImageStyle, this.props.imageStyle)}
          onPress={() => {
            setTimeout(this.props.onPress, this.props.delay);
          }}>
          <ImageBackground
            resizeMode="contain"
            source={R.img(rectButtonConfig!.image)}
            style={Object.assign(defaultImageStyle, this.props.imageStyle)}>
            {this.props.text ? (
              <Text
                numberOfLines={1}
                adjustsFontSizeToFit
                style={{
                  ...this.props.textStyle,
                  ...{
                    marginLeft: '10%',
                    marginRight: '10%',
                    marginBottom: buttonTextMarginBottom,
                    fontFamily: Fonts.lilita,
                    fontSize: buttonTextFontSize,
                    color: rectButtonConfig!.textColor,
                  },
                }}>
                {this.props.text}
              </Text>
            ) : (
              this.props.children
            )}
          </ImageBackground>
        </TouchableScale>
      </View>
    );
  }
}

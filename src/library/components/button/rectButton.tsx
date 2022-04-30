import React, {Component} from 'react';
import {
  ImageBackground,
  Text,
  ViewStyle,
  StyleSheet,
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
  style?: ViewStyle;
  textStyle?: TextStyle;
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
const buttonWidth = isTablet() ? wp('30%') : wp('42%');

export const defaultButtonSize = {
  width: buttonWidth,
  height: buttonWidth * buttonRatioConstant,
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

    const rootViewStyle = this.props.style?.width
      ? {
          width: this.props.style?.width || defaultButtonSize.width,
          height: this.props.style?.height || defaultButtonSize.height,
        }
      : styles.viewStyle;

    return (
      <View style={[rootViewStyle as any, this.props.style]}>
        <View
          useNativeDriver={!isAndroid}
          ref={(ref) => {
            this.containerView = ref;
          }}
          pointerEvents={this.props.pointerEvents}
          style={[
            styles.viewStyle,
            {
              opacity: this.props.visible ? 1 : 0,
            },
          ]}>
          <TouchableScale
            style={styles.viewStyle}
            onPress={() => {
              setTimeout(this.props.onPress, this.props.delay);
            }}>
            <ImageBackground
              resizeMode="contain"
              source={R.img(rectButtonConfig!.image)}
              style={styles.viewStyle}>
              {this.props.text ? (
                <Text
                  numberOfLines={1}
                  adjustsFontSizeToFit
                  style={[
                    styles.text,
                    {
                      color: rectButtonConfig!.textColor,
                    },
                    this.props.textStyle,
                  ]}>
                  {this.props.text}
                </Text>
              ) : (
                this.props.children
              )}
            </ImageBackground>
          </TouchableScale>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  viewStyle: {
    flex: 1,
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    marginBottom: '2%',
    fontFamily: Fonts.lilita,
    fontSize: hp('3%'),
  },
});

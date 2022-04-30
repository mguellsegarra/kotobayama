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

import {defaultButtonSize} from '@library/components/button/rectButton';
import {strings} from '@library/services/i18nService';

type Props = {
  onPress?: Function;
  style?: ViewStyle;
  textStyle?: TextStyle;
  delay?: number;
  pointerEvents?: 'box-none' | 'none' | 'box-only' | 'auto' | undefined;
  visible?: boolean;
};

export default class WatchAdbutton extends Component<Props> {
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
              source={R.img(Images.button_watch_ad)}
              style={styles.viewStyle}>
              <Text
                numberOfLines={1}
                adjustsFontSizeToFit
                style={[styles.freeText]}>
                {strings('free').toUpperCase()}
              </Text>

              <Text
                numberOfLines={1}
                adjustsFontSizeToFit
                style={[styles.text, this.props.textStyle]}>
                {strings('watchVideo')}
              </Text>
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
    justifyContent: 'flex-end',
  },
  freeText: {
    color: 'white',
    fontSize: isTablet() ? hp('1.3%') : hp('1.2%'),
    marginLeft: hp('5%'),
    marginBottom: isTablet() ? hp('1%') : hp('0.8%'),
    fontFamily: Fonts.alata,
  },
  text: {
    marginBottom: '16%',
    fontFamily: Fonts.lilita,
    fontSize: hp('3%'),
    color: Colors.yellowButtonText,
  },
});

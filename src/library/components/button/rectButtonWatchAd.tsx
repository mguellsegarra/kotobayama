import React, {Component} from 'react';
import {ViewStyle, View, ImageBackground, Text, Platform} from 'react-native';
import RectButton, {
  RectButtonEnum,
  defaultButtonSize,
} from '@library/components/button/rectButton';
import {strings} from '@library/services/i18nService';
import R, {Images, Fonts} from '@res/R';
import {isTablet} from 'react-native-device-info';

const isIPad = Platform.OS === 'ios' && isTablet();

type Props = {
  text?: string;
  onPress?: Function;
  style?: ViewStyle;
};

export default class RectButtonWatchAdd extends Component<Props> {
  static defaultProps = {
    onPress: () => {},
    style: {},
  };

  render() {
    const buttonHeightAdsK = 1.495495495495495;
    const buttonWidthAdsK = 1.034810126582278;

    const propWidth: number = this.props.style?.width as number;
    const width = propWidth | defaultButtonSize.width;
    const propHeight: number = this.props.style?.height as number;
    const height = propHeight | defaultButtonSize.height;

    const widthForBoth = width * buttonWidthAdsK;
    const heightForBoth = height * buttonHeightAdsK;

    const widthForMoscaK = 0.544303797468354;
    const ratioMoscaK = 0.505813953488372;
    const widthForMosca = width * widthForMoscaK;
    const heightForMosca = widthForMosca * ratioMoscaK;

    let viewStyle = Object.assign(
      {
        height: heightForBoth,
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'flex-start',
      },
      this.props.style,
    );
    viewStyle.width = widthForBoth;
    viewStyle.height = heightForBoth;

    return (
      <View style={viewStyle}>
        <RectButton
          type={RectButtonEnum.Yellow}
          text={this.props.text}
          onPress={this.props.onPress}
        />
        <ImageBackground
          source={R.img(Images.watch_video_banner_for_button)}
          style={{
            position: 'absolute',
            width: widthForMosca,
            height: heightForMosca,
            alignItems: 'flex-start',
            justifyContent: 'flex-end',
            right: 0,
            top: 0,
          }}>
          <Text
            style={{
              color: 'white',
              zIndex: 2,
              fontSize: widthForMosca * 0.1,
              fontFamily: Fonts.alata,
              marginBottom: heightForMosca * 0.2,
              marginLeft: heightForMosca * 0.2,
            }}>
            {strings('free').toUpperCase() + '!'}
          </Text>
        </ImageBackground>
      </View>
    );
  }
}

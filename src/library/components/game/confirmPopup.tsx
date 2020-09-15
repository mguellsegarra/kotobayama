import React, {Component} from 'react';
import {View, ImageBackground, Text} from 'react-native';
import {styles} from './confirmPopup.style';
import {strings} from '@library/services/i18nService';
import R, {Images} from '@res/R';
import RectButton, {
  RectButtonEnum,
} from '@library/components/button/rectButton';
import {View as AnimatedView} from 'react-native-animatable';

type Props = {
  onConfirm: Function;
  onCancel: Function;
  animatedRef: Function;
};

export default class ConfirmPopup extends Component<Props> {
  render() {
    return (
      <AnimatedView
        useNativeDriver
        ref={(ref) => {
          this.props.animatedRef(ref);
        }}
        style={styles.background}>
        <View style={styles.top}></View>
        <View style={styles.ribbon}>
          <View style={styles.ribbon}>
            <ImageBackground
              resizeMode="contain"
              source={R.img(Images.popup_ribbon)}
              style={styles.ribbonImage}>
              <Text style={styles.ribbonText}>
                {strings('noLives').toUpperCase()}
              </Text>
            </ImageBackground>
          </View>
        </View>
        <View style={styles.container}>
          <ImageBackground
            resizeMode="contain"
            source={R.img(Images.popup_square)}
            style={styles.containerImage}>
            <View style={styles.containerImageWrap}>
              <RectButton
                type={RectButtonEnum.Green}
                text={strings('later')}
                onPress={this.props.onConfirm}
              />
              <RectButton
                type={RectButtonEnum.Yellow}
                text={strings('back')}
                onPress={this.props.onCancel}
              />
            </View>
          </ImageBackground>
        </View>
        <View style={styles.bottom}></View>
      </AnimatedView>
    );
  }
}

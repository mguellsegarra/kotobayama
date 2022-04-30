import React, {Component} from 'react';
import {View, ImageBackground, Text, Image} from 'react-native';
import {styles} from './popup.style';
import {strings} from '@library/services/i18nService';
import R, {Images} from '@res/R';
import RectButton, {
  RectButtonEnum,
} from '@library/components/button/rectButton';
import {View as AnimatedView} from 'react-native-animatable';

type Props = {
  animatedRef: Function;
  pointerEvents: 'auto' | 'none';
  title: string;
  amount?: number;
  description?: string;
  showCancelButton?: boolean;
  confirmLabel?: string;
  onConfirm: Function;
  onCancel?: Function;
  mode: string;
};

export default class Popup extends Component<Props> {
  static defaultProps = {
    showCancelButton: false,
    confirmLabel: strings('ok'),
  };

  render() {
    return (
      <AnimatedView
        useNativeDriver
        ref={(ref) => {
          this.props.animatedRef(ref);
        }}
        style={styles.background}
        pointerEvents={this.props.pointerEvents}>
        <View style={styles.top}></View>
        <View style={styles.ribbon}>
          <View style={styles.ribbon}>
            <ImageBackground
              resizeMode="contain"
              source={R.img(Images.popup_ribbon)}
              style={styles.ribbonImage}>
              <Text style={styles.ribbonText}>
                {this.props.title.toUpperCase()}
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
              <View style={styles.description}>
                {this.props.amount ? (
                  <View style={styles.amountTextContainer}>
                    <Text style={styles.amountText}>
                      {strings('costDescription')}:
                    </Text>
                  </View>
                ) : null}

                {this.props.description ? (
                  <View style={styles.descriptionTextContainer}>
                    <Text style={styles.descriptionText}>
                      {this.props.description}
                    </Text>
                  </View>
                ) : null}

                {this.props.amount ? (
                  <View style={styles.coinPair}>
                    <Image
                      resizeMode="contain"
                      style={styles.coinPairImage}
                      source={R.img(Images.coin_small)}
                    />
                    <Text adjustsFontSizeToFit style={styles.coinPairText}>
                      {this.props.amount}
                    </Text>
                  </View>
                ) : null}
              </View>
              <View style={styles.confirm}>
                <RectButton
                  style={styles.button}
                  type={RectButtonEnum.Green}
                  text={this.props.confirmLabel}
                  onPress={() => {
                    this.props.onConfirm(this.props.mode);
                  }}
                />
              </View>

              {this.props.showCancelButton ? (
                <View style={styles.cancel}>
                  <RectButton
                    style={styles.button}
                    type={RectButtonEnum.Yellow}
                    text={strings('cancel')}
                    onPress={this.props.onCancel}
                  />
                </View>
              ) : null}
            </View>
          </ImageBackground>
        </View>
        <View style={styles.bottom}></View>
      </AnimatedView>
    );
  }
}

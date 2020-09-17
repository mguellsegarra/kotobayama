import React, {Component} from 'react';
import {View, ImageBackground, Text, Image} from 'react-native';
import {styles} from './addCoins.style';
import {strings} from '@library/services/i18nService';
import R, {Images} from '@res/R';
import RectButton, {
  RectButtonEnum,
} from '@library/components/button/rectButton';

const gameConfig = require('@assets/gameConfig');

import {observer, inject} from 'mobx-react';
import UserStore from '@library/mobx/userStore';

type Props = {
  navigation: any;
  route: any;
  userStore: UserStore;
};

@inject('userStore')
@observer
export default class AddCoins extends Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.background}>
        <View style={styles.top}></View>
        <View style={styles.ribbon}>
          <View style={styles.ribbon}>
            <ImageBackground
              resizeMode="contain"
              source={R.img(Images.popup_ribbon)}
              style={styles.ribbonImage}>
              <Text style={styles.ribbonText}>
                {strings('shop').toUpperCase()}
              </Text>
            </ImageBackground>
          </View>
        </View>
        <View style={styles.container}>
          <ImageBackground
            resizeMode="contain"
            source={R.img(Images.popup_big)}
            style={styles.containerImage}>
            <View style={styles.cell}>
              <View style={styles.cellLeft}>
                <Image
                  source={R.img(Images.coin_pack1)}
                  resizeMode={'contain'}
                  style={styles.cellLeftImage}
                />
              </View>
              <View style={styles.cellRight}>
                <View style={styles.cellRightTop}>
                  <ImageBackground
                    source={R.img(Images.ribbon_red_cell_coins)}
                    resizeMode={'contain'}
                    style={styles.cellRightTopImage}>
                    <Text
                      style={[
                        styles.cellRightTopImageText,
                        styles.cellRightTopImageTextRed,
                      ]}>
                      {strings('shopPopular').toUpperCase()}
                    </Text>
                  </ImageBackground>
                </View>
                <View style={styles.cellRightMid}></View>
                <View style={styles.cellRightBottom}>
                  <RectButton
                    type={RectButtonEnum.Yellow}
                    text={strings('watchVideo')}
                    textStyle={styles.watchAddButtonText}
                    onPress={() => {}}
                  />
                </View>
              </View>
            </View>
            <View style={styles.cell}>
              <View style={styles.cellLeft}>
                <Image
                  source={R.img(Images.coin_pack2)}
                  resizeMode={'contain'}
                  style={styles.cellLeftImage}
                />
              </View>
              <View style={styles.cellRight}></View>
            </View>
            <View style={styles.cell}>
              <View style={styles.cellLeft}>
                <Image
                  source={R.img(Images.coin_pack3)}
                  resizeMode={'contain'}
                  style={styles.cellLeftImage}
                />
              </View>
              <View style={styles.cellRight}></View>
            </View>
            <View style={[styles.cell, styles.lastCell]}>
              <View style={styles.cellLeft}>
                <Image
                  source={R.img(Images.coin_pack4)}
                  resizeMode={'contain'}
                  style={styles.cellLeftImage}
                />
              </View>
              <View style={styles.cellRight}>
                <RectButton
                  type={RectButtonEnum.Blue}
                  text={strings('back')}
                  onPress={() => {}}
                />
              </View>
            </View>
          </ImageBackground>
        </View>
        <View style={styles.bottom}>
          <RectButton
            type={RectButtonEnum.Blue}
            text={strings('back')}
            style={styles.bottomButton}
            onPress={() => {
              this.props.navigation.goBack();
            }}
          />
        </View>
      </View>
    );
  }
}

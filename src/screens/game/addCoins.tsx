import React, {Component} from 'react';
import {View, ImageBackground, Text, Image} from 'react-native';
import {styles} from './addCoins.style';
import {strings} from '@library/services/i18nService';
import R, {Images} from '@res/R';
import RectButton, {
  RectButtonEnum,
} from '@library/components/button/rectButton';

import AddCoinsCell, {
  PurchasePacksType,
} from '@library/components/addCoins/addCoinsCell';

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
    const {noCoins} = this.props.route.params;

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
                {noCoins
                  ? strings('noCoins').toUpperCase()
                  : strings('shop').toUpperCase()}
              </Text>
            </ImageBackground>
          </View>
        </View>
        <View style={styles.container}>
          <ImageBackground
            resizeMode="contain"
            source={R.img(Images.popup_big)}
            style={styles.containerImage}>
            <AddCoinsCell
              style={styles.cell}
              type={PurchasePacksType.WatchVideo}
            />
            <AddCoinsCell
              style={styles.cell}
              type={PurchasePacksType.Tier1UnlockAds}
            />
            <AddCoinsCell style={styles.cell} type={PurchasePacksType.Tier2} />
            <AddCoinsCell
              style={[styles.cell, styles.lastCell]}
              type={PurchasePacksType.Tier3}
            />
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

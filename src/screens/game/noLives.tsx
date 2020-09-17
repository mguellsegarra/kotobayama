import React, {Component} from 'react';
import {View, ImageBackground, Text} from 'react-native';
import {styles} from './noLives.syle';
import {strings} from '@library/services/i18nService';
import R, {Images} from '@res/R';
import RectButton, {
  RectButtonEnum,
} from '@library/components/button/rectButton';
import RestoreLivesButton from '@library/components/button/restoreLivesButton';
const gameConfig = require('@assets/gameConfig');

import RectButtonWatchAdd from '@library/components/button/rectButtonWatchAd';
import Popup from '@library/components/common/popup';
import {observer, inject} from 'mobx-react';
import LevelProgressStore from '@library/mobx/levelProgressStore';
import LevelMapStore from '@library/mobx/levelMapStore';
import UserStore from '@library/mobx/userStore';
import {checkIfEnoughCoins} from '@library/helpers/coinHelper';
import delayPromise from '@library/utils/delayPromise';

type Props = {
  navigation: any;
  route: any;
  levelProgressStore: LevelProgressStore;
  userStore: UserStore;
  levelMapStore: LevelMapStore;
};

type State = {
  showPopup: boolean;
};

@inject('levelProgressStore')
@inject('userStore')
@inject('levelMapStore')
@observer
export default class NoLives extends Component<Props, State> {
  popup: any;

  constructor(props: Props) {
    super(props);
    this.restoreLives = this.restoreLives.bind(this);
    this.showPopup = this.showPopup.bind(this);
    this.popupConfirm = this.popupConfirm.bind(this);
    this.popupCancel = this.popupCancel.bind(this);
    this.state = {showPopup: false};
  }

  showPopup() {
    const {userStore} = this.props;

    if (!checkIfEnoughCoins({userStore, amount: gameConfig.priceSolveLetter})) {
      this.props.navigation.navigate('AddCoins', {noCoins: true});
      return;
    }

    this.setState({showPopup: true});
    this.popup.animate('fadeIn', 300);
  }

  restoreLives() {
    const {level, pack} = this.props.route.params;

    this.props.userStore?.decrementCoins(gameConfig.freeCooldownPrice);
    this.props.levelProgressStore?.unsetLevelCooldown(level.id, pack.id);
    this.props.navigation.goBack();
  }

  async popupConfirm() {
    this.setState({showPopup: false});
    this.popup.animate('fadeOut', 300);
    await delayPromise(300);
    this.restoreLives();
  }

  popupCancel() {
    this.setState({showPopup: false});
    this.popup.animate('fadeOut', 300);
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
                {strings('noLives').toUpperCase()}
              </Text>
            </ImageBackground>
          </View>
        </View>
        <View style={styles.container}>
          <ImageBackground
            resizeMode="contain"
            source={R.img(Images.popup_container)}
            style={styles.containerImage}>
            <View style={styles.containerButtonTop}>
              <RestoreLivesButton
                onPress={this.showPopup}
                price={gameConfig.freeCooldownPrice}
              />
            </View>

            <RectButtonWatchAdd
              style={styles.watchAdButton}
              text={strings('watchVideo')}
              onPress={() => {}}
            />

            <RectButton
              type={RectButtonEnum.Red}
              text={strings('later')}
              onPress={() => {
                this.props.navigation.navigate('LevelMap');
              }}
              style={styles.containerButtonBottom}
            />
          </ImageBackground>
        </View>
        <View style={styles.bottom}></View>
        <Popup
          title={strings('restoreLives')}
          pointerEvents={this.state.showPopup ? 'auto' : 'none'}
          animatedRef={(ref: any) => {
            this.popup = ref;
          }}
          mode={'buyLives'}
          amount={gameConfig.freeCooldownPrice}
          showCancelButton={true}
          onConfirm={this.popupConfirm}
          onCancel={this.popupCancel}
        />
      </View>
    );
  }
}

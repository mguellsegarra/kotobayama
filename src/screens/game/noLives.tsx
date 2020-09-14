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

import {Level} from '@library/models/level';
import {Pack} from '@library/models/pack';

import {observer, inject} from 'mobx-react';
import LevelProgressStore, {
  getFirstIncompleteLevelIdForPack,
  getProgressForPack,
  getLevelProgress,
} from '@library/mobx/levelProgressStore';
import LevelMapStore from '@library/mobx/levelMapStore';
import UserStore from '@library/mobx/userStore';

type Props = {
  navigation: any;
  route: any;
  levelProgressStore: LevelProgressStore;
  userStore: UserStore;
  levelMapStore: LevelMapStore;
};

@inject('levelProgressStore')
@inject('userStore')
@inject('levelMapStore')
@observer
export default class NoLives extends Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    const {level, pack} = this.props.route.params;

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
                onPress={() => {
                  if (
                    this.props.userStore?.coins! < gameConfig.freeCooldownPrice
                  ) {
                    // TODO: Show no coins
                    return;
                  }

                  this.props.userStore?.decrementCoins(
                    gameConfig.freeCooldownPrice,
                  );
                  this.props.levelProgressStore?.unsetLevelCooldown(
                    level.id,
                    pack.id,
                  );
                  this.props.navigation.goBack();
                }}
                price={gameConfig.freeCooldownPrice}
              />
            </View>

            <RectButtonWatchAdd
              text={strings('watchVideo')}
              onPress={() => {}}
            />

            <RectButton
              type={RectButtonEnum.Green}
              text={strings('later')}
              onPress={() => {
                this.props.navigation.navigate('LevelMap');
              }}
              style={styles.containerButtonBottom}
            />
          </ImageBackground>
        </View>
        <View style={styles.bottom}></View>
      </View>
    );
  }
}

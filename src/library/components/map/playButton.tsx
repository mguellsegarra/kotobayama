import React, {Component} from 'react';
import {Platform, Text, Image} from 'react-native';
import {strings} from '@library/services/i18nService';
import {Level} from '@library/models/level';
import {observer, inject} from 'mobx-react';
import {View} from 'react-native-animatable';
const isAndroid = Platform.OS === 'android';
import R, {Images} from '@res/R';

import LevelProgressStore, {
  getLevelProgress,
} from '@library/mobx/levelProgressStore';

import UserStore from '@library/mobx/userStore';
import RectButton, {
  RectButtonEnum,
} from '@library/components/button/rectButton';

import CountdownText from '@library/components/map/countdownText';

import {styles} from '@screens/levelMap/levelMap.style';
const gameConfig = require('@assets/gameConfig');

type Props = {
  levels: Array<Level>;
  packId: string;
  currentLevel: number;
  navigation: any;
  pointerEvents?: 'box-none' | 'none' | 'box-only' | 'auto' | undefined;
  levelProgressStore?: LevelProgressStore;
  userStore?: UserStore;
};

type State = {
  minutesLeft: number;
};

@inject('levelProgressStore')
@inject('userStore')
@observer
export default class PlayButton extends Component<Props, State> {
  containerView: any;

  constructor(props: Props) {
    super(props);
    this.countdownUpdated = this.countdownUpdated.bind(this);

    this.state = {
      minutesLeft: gameConfig.coolDownMinutes,
    };
  }

  animate(animationType: string, duration: number) {
    this.containerView.animate(animationType, duration);
  }

  playButton() {
    return (
      <RectButton
        type={RectButtonEnum.Yellow}
        text={strings('play')}
        onPress={() => {
          this.props.navigation.navigate('Game', {
            packId: this.props.packId,
            levels: this.props.levels,
            currentLevel: this.props.currentLevel,
          });
        }}
      />
    );
  }

  countdownUpdated(minutesLeft: number) {
    this.setState({minutesLeft});
  }

  calculatePrice(): number {
    const maxPrice = gameConfig.freeCooldownPrice;
    const maxMinutes = gameConfig.coolDownMinutes;
    const minutes = this.state.minutesLeft + 1;
    const price = (maxPrice / maxMinutes) * minutes;

    return Math.round(price + Number.EPSILON);
  }

  noLivesButton(timestamp: number) {
    const level = this.props.levels[this.props.currentLevel];

    return (
      <View style={styles.countdownContainer}>
        <View style={styles.countdownTop}>
          <View style={styles.countdownTopContainer}>
            <View style={styles.stopwatchImageContainer}>
              <Image
                style={styles.stopwatchImage}
                source={R.img(Images.stopwatch_small)}
              />
            </View>
            <View style={styles.countdownTextContainer}>
              <CountdownText
                finishTime={timestamp}
                format={'m:ss'}
                onFinish={() => {
                  this.props.levelProgressStore?.restoreLevelCooldownAndLivesIfNeeded(
                    level.id,
                    this.props.packId,
                  );
                }}
                onUpdate={this.countdownUpdated}
                textStyle={styles.countdownText}
              />
            </View>
          </View>
        </View>
        <View style={styles.countdownBottom}>
          <RectButton
            type={RectButtonEnum.Red}
            onPress={() => {
              this.props.userStore?.decrementCoins(
                gameConfig.freeCooldownPrice,
              );
              this.props.levelProgressStore?.unsetLevelCooldown(
                level.id,
                this.props.packId,
              );
            }}>
            <View style={styles.countdownButton}>
              <View style={styles.countdownButtonUpperView}>
                <Text style={styles.countdownButtonUpperText}>
                  {strings('restoreLives')}
                </Text>
              </View>
              <View style={styles.countdownButtonLowerView}>
                <Image
                  style={styles.countdownButtonLowerCoin}
                  source={R.img(Images.coin_small)}
                />
                <Text style={styles.countdownButtonLowerText}>
                  {this.calculatePrice()}
                </Text>
              </View>
            </View>
          </RectButton>
        </View>
      </View>
    );
  }

  render() {
    const level = this.props.levels[this.props.currentLevel];

    const {levelProgress} = getLevelProgress(
      this.props.levelProgressStore?.levelsProgress!,
      level.id,
      this.props.packId,
    );

    const lives = this.props.levelProgressStore?.getCurrentLives(
      level.id,
      this.props.packId,
    );

    return (
      <View
        style={styles.playButtonOverlay}
        useNativeDriver={!isAndroid}
        ref={(ref) => {
          this.containerView = ref;
        }}
        pointerEvents={this.props.pointerEvents}>
        {lives === 0 && levelProgress?.emptyLivesTimestamp! !== null
          ? this.noLivesButton(levelProgress?.emptyLivesTimestamp!)
          : this.playButton()}
        <View key={levelProgress?.lives} />
      </View>
    );
  }
}

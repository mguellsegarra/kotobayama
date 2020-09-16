import React, {Component} from 'react';
import {Image, StyleSheet} from 'react-native';
import {strings} from '@library/services/i18nService';
import {Level} from '@library/models/level';
import {observer, inject} from 'mobx-react';
import {View} from 'react-native-animatable';

import {isAndroid} from '@library/services/deviceService';
import R, {Images, Fonts} from '@res/R';
import {defaultButtonSize} from '@library/components/button/rectButton';

import {getLevelProgress} from '@library/helpers/levelHelper';

import LevelProgressStore from '@library/mobx/levelProgressStore';

import UserStore from '@library/mobx/userStore';
import RectButton, {
  RectButtonEnum,
} from '@library/components/button/rectButton';

import CountdownText from '@library/components/map/countdownText';
import RestoreLivesButton from '@library/components/button/restoreLivesButton';

const gameConfig = require('@assets/gameConfig');

type Props = {
  style: any;
  levels: Array<Level>;
  packId: string;
  currentLevel: number;
  navigation: any;
  pointerEvents?: 'box-none' | 'none' | 'box-only' | 'auto' | undefined;
  levelProgressStore?: LevelProgressStore;
  userStore?: UserStore;
  restoreLives: Function;
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
        style={styles.playButton}
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
          <RestoreLivesButton
            onPress={this.props.restoreLives}
            price={this.calculatePrice()}
          />
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
        style={this.props.style}
        useNativeDriver={!isAndroid}
        ref={(ref) => {
          this.containerView = ref;
        }}
        pointerEvents={this.props.pointerEvents}>
        <View style={styles.container}>
          {lives === 0 && levelProgress?.emptyLivesTimestamp! !== null
            ? this.noLivesButton(levelProgress?.emptyLivesTimestamp!)
            : this.playButton()}
        </View>
        <View key={levelProgress?.lives} />
      </View>
    );
  }
}

const stopWatchConstant = 1.276595744680851;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  countdownContainer: {
    height: defaultButtonSize.height * 1.8,
    width: defaultButtonSize.width,
  },
  countdownTop: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  countdownTopContainer: {
    backgroundColor: '#000000bc',
    borderRadius: defaultButtonSize.height * 0.1,
    width: defaultButtonSize.width * 0.5,
    height: defaultButtonSize.height * 0.5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  stopwatchImageContainer: {
    flex: 1.1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stopwatchImage: {
    width: defaultButtonSize.height * 0.3,
    height: defaultButtonSize.height * 0.3 * stopWatchConstant,
  },
  countdownTextContainer: {
    flex: 2,
    marginTop: defaultButtonSize.height * (isAndroid ? 0.01 : 0.08),
    marginLeft: defaultButtonSize.width * 0.05,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  countdownText: {
    fontFamily: Fonts.league,
    fontSize: defaultButtonSize.height * 0.21,
    textAlign: 'left',
    color: '#ffffff',
  },
  countdownBottom: {
    height: defaultButtonSize.height,
    width: defaultButtonSize.width,
  },
  playButton: {
    height: defaultButtonSize.height,
  },
});

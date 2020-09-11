import React, {Component} from 'react';
import {Platform} from 'react-native';
import {strings} from '@library/services/i18nService';
import {Level} from '@library/models/level';
import {observer, inject} from 'mobx-react';
import {View} from 'react-native-animatable';
const isAndroid = Platform.OS === 'android';

import LevelProgressStore, {
  getLevelProgress,
} from '@library/mobx/levelProgressStore';

import RectButton, {
  RectButtonEnum,
} from '@library/components/button/rectButton';

import CountdownText from '@library/components/map/countdownText';

import {styles} from '@screens/levelMap/levelMap.style';

type Props = {
  levels: Array<Level>;
  packId: string;
  currentLevel: number;
  navigation: any;
  pointerEvents?: 'box-none' | 'none' | 'box-only' | 'auto' | undefined;
  levelProgressStore?: LevelProgressStore;
};

type State = {
  countdownRunning: boolean;
};

@inject('levelProgressStore')
@observer
export default class PlayButton extends Component<Props, State> {
  containerView: any;

  constructor(props: Props) {
    super(props);
    const level = this.props.levels[this.props.currentLevel];
    const {levelProgress} = getLevelProgress(
      this.props.levelProgressStore?.levelsProgress!,
      level.id,
      this.props.packId,
    );

    this.state = {
      countdownRunning: levelProgress?.emptyLivesTimestamp !== null,
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

  noLivesButton(timestamp: number) {
    const level = this.props.levels[this.props.currentLevel];

    return (
      <RectButton type={RectButtonEnum.Yellow} onPress={() => {}}>
        <CountdownText
          finishTime={timestamp}
          format={'m:ss'}
          onFinish={() => {
            this.props.levelProgressStore?.restoreLevelCooldownAndLivesIfNeeded(
              level.id,
              this.props.packId,
            );
          }}
        />
      </RectButton>
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

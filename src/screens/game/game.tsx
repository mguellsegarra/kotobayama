import React, {Component} from 'react';
import {View, Image, Text, Vibration} from 'react-native';
import R, {Colors, Images} from '@res/R';

import {getStyles} from './game.style';
import NoNotchView from '@library/components/common/noNotchView';
import LinearGradient from 'react-native-linear-gradient';
import CircleButton from '@library/components/button/circleButton';
import PhotoFrame, {PhotoFrameSize} from '@library/components/photo/photoFrame';
import LevelIndexNumber from '@library/components/common/levelIndexNumber';
import LivesIndicator from '@library/components/game/livesIndicator';
import CoinCounter from '@library/components/game/coinCounter';
import delayPromise from '@library/utils/delayPromise';
import {Level} from '@library/models/level';
import {Pack} from '@library/models/pack';

import {observer, inject} from 'mobx-react';
import LevelProgressStore, {
  getLevelProgress,
} from '@library/mobx/levelProgressStore';
import UserStore from '@library/mobx/userStore';
import LevelMapStore from '@library/mobx/levelMapStore';

import LettersBar, {
  LettersBarElement,
} from '@library/components/game/lettersBar';
import SolutionBar, {
  SolutionBarElement,
} from '@library/components/game/solutionBar';
import {
  AvailableLetterType,
  AvailableLetterState,
} from '@library/components/game/availableLetter';
import {
  SolutionLetterType,
  SolutionLetterState,
} from '@library/components/game/solutionLetter';
import {strings} from '@library/services/i18nService';

import LevelService from '@library/services/levelService';

type Props = {
  navigation: any;
  route: any;
  levelProgressStore: LevelProgressStore;
  userStore: UserStore;
  levelMapStore: LevelMapStore;
};
type State = {};

@inject('levelProgressStore')
@inject('userStore')
@inject('levelMapStore')
@observer
export default class LevelMap extends Component<Props, State> {
  styles: any;
  mapLayer: any;
  solutionBar: SolutionBarElement | SolutionBar | null;
  lettersBar: LettersBarElement | LettersBar | null;
  livesIndicator: LivesIndicator | null;
  level: Level;
  currentLevel: number;
  totalLevels: number;
  pack: Pack;

  state = {};

  constructor(props: Props) {
    super(props);
    this.styles = {};
    this.solutionBar = null;
    this.lettersBar = null;
    this.livesIndicator = null;

    this.availableLetterHasTapped = this.availableLetterHasTapped.bind(this);
    this.solutionLetterHasTapped = this.solutionLetterHasTapped.bind(this);
    this.getLevelProgress = this.getLevelProgress.bind(this);

    const {currentLevel, levels, packId} = this.props.route.params;
    this.level = levels[currentLevel];
    this.pack = LevelService.getPackWithId(packId);
    this.currentLevel = currentLevel;
    this.totalLevels = levels.length;
  }

  async availableLetterHasTapped(letter: AvailableLetterType) {
    const level: Level = this.level;

    if (this.solutionBar?.allLettersAreFull()) {
      return;
    }

    this.lettersBar?.setLetterState(letter.id, AvailableLetterState.Selected);

    await this.solutionBar?.addLetter(letter.character, letter.id);

    if (!this.solutionBar?.allLettersAreFull()) {
      return;
    }

    if (this.solutionBar?.isWordCorrect()) {
      // TODO: Add coins
      // TODO: Correct screen
      this.props.userStore.incrementCoinsForLives(
        this.props.levelProgressStore?.getCurrentLives(level.id, this.pack.id),
      );

      this.props.levelProgressStore.setLevelCompleted(level.id, this.pack.id);
      this.props.levelProgressStore.calculateLevelStars(level.id, this.pack.id);

      this.solutionBar?.animateLetters('flash', 1000);
      await delayPromise(1000);

      this.props.levelMapStore.nextIncompleteLevelForPack(
        this.props.levelProgressStore.levelsProgress,
        this.pack,
      );

      this.props.navigation.goBack();
    } else {
      Vibration.vibrate(1000);
      this.solutionBar?.animateLetters('shake', 1000);

      this.props.levelProgressStore.decrementLivesForLevel(
        level.id,
        this.pack.id,
      );
      this.props.levelProgressStore.incrementInvestedLivesForLevel(
        level.id,
        this.pack.id,
      );
      this.livesIndicator?.animate('tada', 1000);

      if (
        this.props.levelProgressStore?.getCurrentLives(
          level.id,
          this.pack.id,
        ) === 0
      ) {
        await delayPromise(500);
        this.props.levelProgressStore.setLevelCooldown(level.id, this.pack.id);
        this.props.navigation.goBack();
        return;
      }

      // TODO: Restar coins
      await delayPromise(1000);

      const availableLetterIds = this.solutionBar?.getAllAvailableLetterIds();
      availableLetterIds.forEach((letterId: string) => {
        this.lettersBar?.restoreLetterWithId(letterId);
      });

      this.solutionBar?.removeAllLetters();
    }
  }

  solutionLetterHasTapped(letter: SolutionLetterType) {
    if (letter.letterState === SolutionLetterState.Filled) {
      this.solutionBar?.removeLetterWithId(letter.id);
      this.lettersBar?.restoreLetterWithId(letter.availableLetterId);
    }
  }

  getLevelProgress() {
    return getLevelProgress(
      this.props.levelProgressStore.levelsProgress,
      this.level.id,
      this.pack.id,
    ).levelProgress;
  }

  render() {
    this.styles = getStyles();
    return (
      <LinearGradient
        colors={[Colors.purpleGradientStart, Colors.purpleGradientEnd]}
        style={this.styles.background}>
        <NoNotchView>
          <View style={this.styles.navBar}>
            <View style={this.styles.navBarLeft}>
              <CircleButton
                style={this.styles.backButton}
                image={Images.back_button}
                onPress={this.props.navigation.goBack}></CircleButton>
            </View>
            <View style={this.styles.navBarMiddle}>
              <LivesIndicator
                ref={(ref) => {
                  this.livesIndicator = ref;
                }}
                lives={
                  this.props.levelProgressStore?.getCurrentLives(
                    this.getLevelProgress()?.id!,
                    this.pack.id,
                  )!
                }
              />
            </View>
            <View style={this.styles.navBarRight}>
              <CoinCounter
                totalCoins={this.props.userStore.coins}
                onPress={() => {}}
              />
            </View>
          </View>
          <View style={this.styles.titleBar}>
            <Text
              style={this.styles.titleText}
              adjustsFontSizeToFit
              numberOfLines={1}>
              {this.pack?.title!}
            </Text>

            <LevelIndexNumber
              totalLevels={this.totalLevels}
              currentLevel={this.currentLevel}
            />
          </View>
          <View style={this.styles.photoBar}>
            <PhotoFrame size={PhotoFrameSize.big} level={this.level} />
            <Text style={this.styles.sourceText}>
              {strings('sourcePhoto')}: pirineosconninos.es
            </Text>
          </View>
          <View style={this.styles.solutionBar}>
            <Image
              style={this.styles.separator}
              resizeMode="contain"
              source={R.img(Images.separator_line_down)}></Image>
            <View style={this.styles.solutionView}>
              <SolutionBar
                ref={(ref) => {
                  this.solutionBar = ref;
                }}
                onLetterPress={this.solutionLetterHasTapped}
                style={this.styles.lettersBar}
                word={this.level.word}
              />
            </View>
            <Image
              style={this.styles.separator}
              resizeMode="contain"
              source={R.img(Images.separator_line_up)}></Image>
          </View>
          <View style={this.styles.powerUpsBar}></View>
          <LettersBar
            ref={(ref) => {
              this.lettersBar = ref;
            }}
            style={this.styles.lettersBar}
            word={this.level.word}
            availableLetterHasTapped={this.availableLetterHasTapped}
          />
        </NoNotchView>
      </LinearGradient>
    );
  }
}

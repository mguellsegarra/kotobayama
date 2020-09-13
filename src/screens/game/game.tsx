import React, {Component} from 'react';
import {View, Image, Text, Vibration} from 'react-native';
import R, {Colors, Images} from '@res/R';

import {styles} from './game.style';
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
import PowerUpsBar from '@library/components/game/powerUpsBar';
import ViewShot from 'react-native-view-shot';
const gameConfig = require('@assets/gameConfig');

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
} from '@library/models/availableLetter';
import {
  SolutionLetterType,
  SolutionLetterState,
} from '@library/models/solutionLetter';
import {strings} from '@library/services/i18nService';

import LevelService from '@library/services/levelService';
import Share from 'react-native-share';

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
export default class Game extends Component<Props, State> {
  mapLayer: any;
  solutionBar: SolutionBarElement | SolutionBar | null;
  lettersBar: LettersBarElement | LettersBar | null;
  livesIndicator: LivesIndicator | null;
  level: Level;
  currentLevel: number;
  totalLevels: number;
  pack: Pack;
  snapshot: any;
  refs: any;

  state = {};

  constructor(props: Props) {
    super(props);
    this.solutionBar = null;
    this.lettersBar = null;
    this.livesIndicator = null;

    this.availableLetterHasTapped = this.availableLetterHasTapped.bind(this);
    this.solutionLetterHasTapped = this.solutionLetterHasTapped.bind(this);
    this.getLevelProgress = this.getLevelProgress.bind(this);

    this.onDestroyLettersPress = this.onDestroyLettersPress.bind(this);
    this.onSolveLetterPress = this.onSolveLetterPress.bind(this);
    this.onAskFriendPress = this.onAskFriendPress.bind(this);

    const {currentLevel, levels, packId} = this.props.route.params;
    this.level = levels[currentLevel];
    this.pack = LevelService.getPackWithId(packId);
    this.currentLevel = currentLevel;
    this.totalLevels = levels.length;
  }

  async checkResult() {
    const level: Level = this.level;

    if (!this.solutionBar?.allLettersAreFull()) {
      return;
    }

    if (this.solutionBar?.isWordCorrect()) {
      this.solutionBar?.animateLetters('flash', 1000);
      await delayPromise(1000);

      this.props.levelProgressStore.setLevelCompleted(level.id, this.pack.id);
      this.props.levelProgressStore.calculateLevelStars(level.id, this.pack.id);

      this.props.navigation.navigate('LevelComplete', {
        level,
        pack: this.pack,
      });
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

      await delayPromise(1000);

      const availableLetterIds = this.solutionBar?.getAllAvailableLetterIds();
      availableLetterIds.forEach((letterId: string) => {
        this.lettersBar?.restoreLetterWithId(letterId);
      });

      this.solutionBar?.removeAllLetters();
    }
  }

  async availableLetterHasTapped(letter: AvailableLetterType) {
    const level: Level = this.level;

    if (this.solutionBar?.allLettersAreFull()) {
      return;
    }

    this.lettersBar?.setLetterState(letter.id, AvailableLetterState.Selected);

    await this.solutionBar?.addLetter(letter.character, letter.id);
    await this.checkResult();
  }

  solutionLetterHasTapped(letter: SolutionLetterType) {
    if (letter.letterState === SolutionLetterState.Filled) {
      this.solutionBar?.removeLetterWithId(letter.id);
      this.lettersBar?.restoreLetterWithId(letter.availableLetterId!);
    }
  }

  getLevelProgress() {
    return getLevelProgress(
      this.props.levelProgressStore.levelsProgress,
      this.level.id,
      this.pack.id,
    ).levelProgress;
  }

  componentDidMount() {
    this.refs.viewShot.capture().then((uri: string) => {
      this.snapshot = uri;
    });
  }

  async onSolveLetterPress() {
    this.solutionBar?.removeAllLetters();
    await delayPromise(300);

    const word = this.level.word.replace(' ', '').toUpperCase();
    const wordBoughtLetters: any = word.split('').map((character) => {
      return {bought: false, character};
    });

    const boughtLetters: Array<SolutionLetterType> = this.solutionBar?.getBoughtLetters();

    boughtLetters.forEach((boughtLetter) => {
      wordBoughtLetters[boughtLetter.id] = {
        bought: true,
        character: boughtLetter.character,
      };
    });

    const wordWithWildcards = word.split('');

    const wordMinusBoughtLetters = wordBoughtLetters.filter(
      (element: any, idx: number) => {
        if (element.bought) {
          wordWithWildcards[idx] = '*';
        }
        return !element.bought;
      },
    );

    const randomIndex = Math.floor(
      Math.random() * wordMinusBoughtLetters.length,
    );
    const randomLetter = wordMinusBoughtLetters[randomIndex].character;
    const position = wordWithWildcards.indexOf(randomLetter); // <-- this is wrong, we have to replace bought letters before.

    const availableLetterId = this.lettersBar?.getAvailableLetterWithChar(
      randomLetter,
    ).id;

    this.solutionBar?.addLetterAtPosition(
      randomLetter,
      availableLetterId,
      position,
      SolutionLetterState.Bought,
    );

    this.lettersBar?.setLetterState(
      availableLetterId,
      AvailableLetterState.Bought,
    );

    this.props.userStore.decrementCoins(gameConfig.priceSolveLetter);
    await this.checkResult();
  }

  async onDestroyLettersPress() {
    this.solutionBar?.removeAllLetters();
    await delayPromise(300);

    this.lettersBar?.powerUpDestroyLetters();

    this.props.userStore.decrementCoins(gameConfig.priceDestroyLetters);
  }

  async onAskFriendPress() {
    if (this.snapshot) {
      Share.open({
        url: this.snapshot,
        message: 'Tegami: Saps quina muntanya és?',
        filename: 'guessMountain',
      });
    }
  }

  render() {
    return (
      <LinearGradient
        colors={[Colors.purpleGradientStart, Colors.purpleGradientEnd]}
        style={styles.background}>
        <NoNotchView>
          <View style={styles.navBar}>
            <View style={styles.navBarLeft}>
              <CircleButton
                style={styles.backButton}
                image={Images.back_button}
                onPress={this.props.navigation.goBack}></CircleButton>
            </View>
            <View style={styles.navBarMiddle}>
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
            <View style={styles.navBarRight}>
              <CoinCounter
                totalCoins={this.props.userStore.coins}
                onPress={() => {}}
              />
            </View>
          </View>
          <View style={styles.titleBar}>
            <Text
              style={styles.titleText}
              adjustsFontSizeToFit
              numberOfLines={1}>
              {this.pack?.title!}
            </Text>

            <LevelIndexNumber
              totalLevels={this.totalLevels}
              currentLevel={this.currentLevel}
            />
          </View>
          <View style={styles.photoBar}>
            <ViewShot ref="viewShot">
              <PhotoFrame size={PhotoFrameSize.big} level={this.level} />
            </ViewShot>
            <Text style={styles.sourceText}>
              {strings('sourcePhoto') + ': ' + this.level.sourcePhoto}
            </Text>
          </View>
          <View style={styles.solutionBar}>
            <Image
              style={styles.separator}
              resizeMode="contain"
              source={R.img(Images.separator_line_down)}></Image>
            <View style={styles.solutionView}>
              <SolutionBar
                ref={(ref) => {
                  this.solutionBar = ref;
                }}
                onLetterPress={this.solutionLetterHasTapped}
                style={styles.lettersBar}
                word={this.level.word}
                level={this.level}
                pack={this.pack}
              />
            </View>
            <Image
              style={styles.separator}
              resizeMode="contain"
              source={R.img(Images.separator_line_up)}></Image>
          </View>
          <View style={styles.powerUpsBar}>
            <PowerUpsBar
              bombDisabled={false}
              onDestroyLettersPress={this.onDestroyLettersPress}
              onSolveLetterPress={this.onSolveLetterPress}
              onAskFriendPress={this.onAskFriendPress}
            />
          </View>
          <LettersBar
            ref={(ref) => {
              this.lettersBar = ref;
            }}
            style={styles.lettersBar}
            word={this.level.word}
            availableLetterHasTapped={this.availableLetterHasTapped}
            level={this.level}
            pack={this.pack}
          />
        </NoNotchView>
      </LinearGradient>
    );
  }
}

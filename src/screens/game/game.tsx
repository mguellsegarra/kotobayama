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

type Props = {
  navigation: any;
  route: any;
};
type State = {};

export default class LevelMap extends Component<Props, State> {
  styles: any;
  mapLayer: any;
  solutionBar: SolutionBarElement | SolutionBar | null;
  lettersBar: LettersBarElement | LettersBar | null;

  state = {};

  constructor(props: Props) {
    super(props);
    this.styles = {};
    this.solutionBar = null;
    this.lettersBar = null;
    this.availableLetterHasTapped = this.availableLetterHasTapped.bind(this);
    this.solutionLetterHasTapped = this.solutionLetterHasTapped.bind(this);
  }

  async availableLetterHasTapped(letter: AvailableLetterType) {
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
      this.solutionBar?.animateLetters('flash', 1000);
      await delayPromise(1000);
      this.props.navigation.goBack();
    } else {
      Vibration.vibrate(1000);
      this.solutionBar?.animateLetters('shake', 1000);
      // TODO: Restar vida
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

  render() {
    this.styles = getStyles();
    const {levels, currentLevel} = this.props.route.params;
    const level = levels[currentLevel];

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
              <LivesIndicator lives={1} />
            </View>
            <View style={this.styles.navBarRight}>
              <CoinCounter totalCoins={200} onPress={() => {}} />
            </View>
          </View>
          <View style={this.styles.titleBar}>
            <Text
              style={this.styles.titleText}
              adjustsFontSizeToFit
              numberOfLines={1}>
              Parc Nacional d'Aigüestortes i llac de Sant Maurici
            </Text>

            <LevelIndexNumber
              totalLevels={levels.length}
              currentLevel={currentLevel}
            />
          </View>
          <View style={this.styles.photoBar}>
            <PhotoFrame size={PhotoFrameSize.big} level={level} />
            <Text style={this.styles.sourceText}>
              Font fotografia: pirineosconninos.es
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
                word={level.word}
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
            word={level.word}
            availableLetterHasTapped={this.availableLetterHasTapped}
          />
        </NoNotchView>
      </LinearGradient>
    );
  }
}

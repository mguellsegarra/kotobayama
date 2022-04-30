import React, {Component} from 'react';
import {View, ViewStyle} from 'react-native';
import delayPromise from '@library/utils/delayPromise';

import {styles} from './lettersBar.style';

import AvailableLetter from './availableLetter';
import {
  AvailableLetterType,
  AvailableLetterState,
} from '@library/models/availableLetter';
import {observer, inject} from 'mobx-react';
import {getLevelProgress} from '@library/helpers/levelHelper';

import LevelProgressStore from '@library/mobx/levelProgressStore';
import {Level} from '@library/models/level';
import {Pack} from '@library/models/pack';
import WordHelper from '@library/helpers/wordHelper';

type Props = {
  style: ViewStyle;
  word: string;
  availableLetterHasTapped: Function;
  levelProgressStore?: LevelProgressStore;
  level: Level;
  pack: Pack;
};

type State = {
  letters: Array<AvailableLetterType>;
};

export interface LettersBarElement extends Element {
  restoreLetterWithId: Function;
  setLetterState: Function;
  getAvailableLetterWithChar: Function;
  powerUpDestroyLetters: Function;
  existsWrongLettersNotBought: Function;
  restoreNonBoughtLetters: Function;
  updateStore: Function;
  zoomOutLetterWithId: Function;
  restoreZoomLetterWithId: Function;
  zoomInLetterWithId: Function;
}

@inject('levelProgressStore')
@observer
export default class LettersBar extends Component<Props, State> {
  letterObjects: any;

  constructor(props: Props) {
    super(props);
    this.getAvailableLetterWithChar = this.getAvailableLetterWithChar.bind(
      this,
    );
    this.letterHasTapped = this.letterHasTapped.bind(this);

    const {levelProgress} = getLevelProgress(
      this.props.levelProgressStore?.levelsProgress!,
      this.props.level.id,
      this.props.pack.id,
    );

    let letters: AvailableLetterType[] = [];
    if (levelProgress?.availableLetters?.length! > 0) {
      letters = levelProgress?.availableLetters!;
    } else {
      const stringLetters = WordHelper.getLettersForWord(props.word);
      letters = stringLetters.map((char: string, idx: number) => {
        return {
          character: char,
          id: idx.toString(),
          letterState: AvailableLetterState.Idle,
        };
      });
      this.props.levelProgressStore?.setAvailableLetters(
        this.props.level.id,
        this.props.pack.id,
        letters,
      );
    }

    this.state = {letters};
  }

  letterHasTapped(event: AvailableLetterType) {
    this.props.availableLetterHasTapped(event);
  }

  getLettersLineForLetters(letters: Array<string>) {
    letters.forEach((line) => {});
  }

  getAvailableLettersForLine(line: number) {
    const startPos = line + line * 6;
    const endPos = startPos + 7;

    return this.state.letters
      .slice(startPos, endPos)
      .map((element: AvailableLetterType) => {
        return (
          <AvailableLetter
            id={element!.id}
            key={element!.id}
            letterState={element!.letterState}
            onPress={this.letterHasTapped}
            character={element!.character}
            animatedRef={(ref: any) => {
              this.letterObjects.push(ref);
            }}
          />
        );
      });
  }

  getLetterAndPosForId(id: string) {
    let position = 0;

    const letter = this.state.letters.find((item, index) => {
      const found = item!.id === id;
      if (found) {
        position = index;
      }
      return found;
    });

    return {letter, position};
  }

  setLetterState(id: string, letterState: AvailableLetterState) {
    const {letter, position} = this.getLetterAndPosForId(id);

    letter!.letterState = letterState;

    const newLetters = [...this.state.letters];
    newLetters[position] = letter as AvailableLetterType;
    this.setState({...this.state, letters: newLetters});
  }

  zoomOutLetterWithId(id: string) {
    const letterObject = this.letterObjects.find((item: any) => {
      return item.id === id;
    });
    letterObject?.zoomOut(100);
  }

  zoomInLetterWithId(id: string) {
    const letterObject = this.letterObjects.find((item: any) => {
      return item.id === id;
    });
    letterObject?.zoomIn(100);
  }

  updateStore() {
    this.props.levelProgressStore?.setAvailableLetters(
      this.props.level.id,
      this.props.pack.id,
      this.state?.letters!,
    );
  }

  restoreLetterWithId(id: string) {
    this.setLetterState(id, AvailableLetterState.Idle);
    this.zoomInLetterWithId(id);
  }

  getAvailableLetterWithChar(character: string) {
    return this.state.letters
      .filter((item) => {
        return item.letterState === AvailableLetterState.Idle;
      })
      .find((item) => {
        return item!.character === character;
      });
  }

  restoreNonBoughtLetters() {
    const availableLetters = this.state.letters.filter((item) => {
      return item.letterState === AvailableLetterState.Selected;
    });

    availableLetters.forEach((letter) => {
      this.restoreLetterWithId(letter.id);
    });
    this.updateStore();
  }

  powerUpDestroyLetters() {
    let allLetters = this.state.letters.filter((letter) => {
      return letter.letterState !== AvailableLetterState.Bought;
    });

    let availableLetters = this.state.letters
      .filter((letter) => {
        return letter.letterState !== AvailableLetterState.Bought;
      })
      .map((item) => {
        return item.character;
      });

    let totalChars = this.props.word.replace(' ', '').toUpperCase().split('');

    totalChars.forEach((letter: string) => {
      availableLetters.splice(availableLetters.indexOf(letter), 1);
    });

    availableLetters.forEach(async (letterString) => {
      const letter = allLetters.find((letterObject) => {
        return letterObject.character === letterString;
      });
      allLetters.splice(allLetters.indexOf(letter!), 1);
      this.zoomOutLetterWithId(letter!.id);
      await delayPromise(100);
      this.setLetterState(letter!.id, AvailableLetterState.Bought);
    });
    this.updateStore();
  }

  existsWrongLettersNotBought() {
    let availableLetters = this.state.letters
      .filter((letter) => {
        return letter.letterState !== AvailableLetterState.Bought;
      })
      .map((item) => {
        return item.character;
      });

    let totalChars = this.props.word.replace(' ', '').toUpperCase().split('');

    totalChars.forEach((letter: string) => {
      availableLetters.splice(availableLetters.indexOf(letter), 1);
    });

    return availableLetters.length > 0;
  }

  render() {
    this.letterObjects = [];

    return (
      <View style={this.props.style}>
        <View style={styles.row}>{this.getAvailableLettersForLine(0)}</View>
        <View style={styles.row}>{this.getAvailableLettersForLine(1)}</View>
        <View style={styles.bottomMargin} />
      </View>
    );
  }
}

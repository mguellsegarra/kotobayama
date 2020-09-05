import React, {Component} from 'react';
import {View, ViewStyle} from 'react-native';

import {getStyles} from './lettersBar.style';

import AvailableLetter, {
  AvailableLetterType,
  AvailableLetterState,
} from './availableLetter';
import LevelService from '@library/services/levelService';

type Props = {
  style: ViewStyle;
  word: string;
  availableLetterHasTapped: Function;
};

type State = {
  letters: Array<AvailableLetterType | undefined>;
};

export interface LettersBarElement extends Element {
  restoreLetterWithId: Function;
  setLetterState: Function;
}

export default class LettersBar extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.letterHasTapped = this.letterHasTapped.bind(this);

    const stringLetters = LevelService.getLettersForWord(props.word);
    const letters = stringLetters.map((char: string, idx: number) => {
      return {
        character: char,
        id: idx.toString(),
        letterState: AvailableLetterState.Idle,
      };
    });
    this.state = {letters: letters};
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
      .map((element: AvailableLetterType | undefined) => {
        return (
          <AvailableLetter
            id={element!.id}
            key={element!.id}
            letterState={element!.letterState}
            onPress={this.letterHasTapped}
            character={element!.character}
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
    newLetters[position] = letter;
    this.setState({...this.state, letters: newLetters});
  }

  restoreLetterWithId(id: string) {
    this.setLetterState(id, AvailableLetterState.Idle);
  }

  render() {
    const styles = getStyles();

    return (
      <View style={this.props.style}>
        <View style={styles.row}>{this.getAvailableLettersForLine(0)}</View>
        <View style={styles.row}>{this.getAvailableLettersForLine(1)}</View>
        <View style={styles.bottomMargin} />
      </View>
    );
  }
}

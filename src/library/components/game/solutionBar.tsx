import React, {Component} from 'react';
import {View, ViewStyle} from 'react-native';

import {styles, getLetterSizeOptionsForWordLines} from './solutionBar.style';

import SolutionLetter, {SolutionLetterState} from './solutionLetter';
import {
  isCharacterMapFull,
  getFirstCharacterMapEmptyPos,
  getInitialCharacterMap,
  isWordCorrect,
} from '@library/components/helpers/characterMapHelper';

type Props = {
  style: ViewStyle;
  word: string;
  onLetterPress: Function;
};

export type CharactersMapObject = {
  availableLetterId: string | null;
  letterState: SolutionLetterState;
  character: string;
};

export type CharactersMap = {
  [index: string]: CharactersMapObject;
};

type State = {
  charactersMap: CharactersMap;
};

export interface SolutionBarElement extends Element {
  addLetter: Function;
  allLettersAreFull: Function;
  removeLetterWithId: Function;
  isWordCorrect: Function;
  removeAllLetters: Function;
  getAllAvailableLetterIds: Function;
}

export default class SolutionBar extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      charactersMap: getInitialCharacterMap(props.word),
    };
  }

  getLetterLinesForWord(word: string) {
    const wordLines = word.split(' ');
    const letterLines: any = [];
    const letterSizeOptions = getLetterSizeOptionsForWordLines(wordLines);

    let charIdx = 0;

    wordLines.forEach((word) => {
      const line = [];

      for (let i = 0; i < word.length; i += 1) {
        line.push(
          <SolutionLetter
            key={charIdx.toString()}
            id={charIdx.toString()}
            letterState={this.state.charactersMap[charIdx].letterState}
            availableLetterId={
              this.state.charactersMap[charIdx].availableLetterId
            }
            onPress={this.props.onLetterPress}
            character={this.state.charactersMap[charIdx].character}
            letterSize={letterSizeOptions.letterSize}
            margin={letterSizeOptions.margin}
          />,
        );
        charIdx += 1;
      }
      letterLines.push(line);
    });
    return letterLines;
  }

  addLetter(character: string, availableLetterId: string) {
    return new Promise((resolve, reject) => {
      if (isCharacterMapFull(this.state.charactersMap, this.props.word)) {
        return;
      }

      const firstEmptyPos = getFirstCharacterMapEmptyPos(
        this.state.charactersMap,
      );

      const newCharacterMap = Object.assign({}, this.state.charactersMap);

      newCharacterMap[firstEmptyPos] = {
        character: character,
        letterState: SolutionLetterState.Filled,
        availableLetterId,
      };

      this.setState(
        {
          ...this.state,
          charactersMap: newCharacterMap,
        },
        () => {
          resolve();
        },
      );
    });
  }

  allLettersAreFull() {
    return isCharacterMapFull(this.state.charactersMap, this.props.word);
  }

  removeLetterWithId(id: string) {
    const newCharacterMap = Object.assign({}, this.state.charactersMap);
    newCharacterMap[id] = {
      character: '',
      letterState: SolutionLetterState.Empty,
      availableLetterId: null,
    };
    this.setState({
      ...this.state,
      charactersMap: newCharacterMap,
    });
  }

  isWordCorrect() {
    return isWordCorrect(this.state.charactersMap, this.props.word);
  }

  getAllAvailableLetterIds() {
    return Object.values(this.state.charactersMap).map((mapObject) => {
      return mapObject.availableLetterId;
    });
  }

  removeAllLetters() {
    Object.keys(this.state.charactersMap).forEach((letterId) => {
      this.removeLetterWithId(letterId);
    });
  }

  render() {
    const letterLines = this.getLetterLinesForWord(this.props.word);

    return (
      <View style={this.props.style}>
        <View style={styles.row}>{letterLines[0]}</View>

        {letterLines.length > 1 ? (
          <View style={styles.row}>{letterLines[1]}</View>
        ) : null}
      </View>
    );
  }
}

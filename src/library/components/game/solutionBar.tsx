import React, {Component} from 'react';
import {View, ViewStyle} from 'react-native';

import {getStyles, getLetterSizeOptionsForWordLines} from './solutionBar.style';

import SolutionLetter, {SolutionLetterState} from './solutionLetter';

type Props = {
  style: ViewStyle;
  word: string;
  onLetterPress: Function;
};

type CharactersMapObject = {
  availableLetterId: string | null;
  letterState: SolutionLetterState;
  character: string;
};

type CharactersMap = {
  [index: string]: CharactersMapObject;
};

type State = {
  charactersMap: CharactersMap;
};

export interface SolutionBarElement extends Element {
  addLetter: Function;
  allLettersAreFull: Function;
  removeLetterWithId: Function;
}

const getInitialCharacterMap = (word: string) => {
  const characterMap: CharactersMap = {};
  let idx = 0;

  Array.from(word.replace(' ', '')).forEach((char: string) => {
    characterMap[idx] = {
      character: '',
      availableLetterId: null,
      letterState: SolutionLetterState.Empty,
    };
    idx += 1;
  });

  return characterMap;
};

const isCharacterMapFull = (characterMap: CharactersMap, word: string) => {
  return (
    Object.values(characterMap)
      .map((element: CharactersMapObject) => {
        return element.character;
      })
      .join('').length === word.replace(' ', '').length
  );
};

const getFirstCharacterMapEmptyPos = (characterMap: CharactersMap) => {
  let foundPos = 0,
    idx = 0,
    found = false;

  Object.values(characterMap).forEach((element: CharactersMapObject) => {
    if (element.character === '' && !found) {
      foundPos = idx;
      found = true;
    }
    idx += 1;
  });

  return foundPos;
};

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
        const char = word.charAt(i);
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

    this.setState({
      ...this.state,
      charactersMap: newCharacterMap,
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

  render() {
    const styles = getStyles();
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

import React, {Component} from 'react';
import {ViewStyle, Image} from 'react-native';
import {styles, getLetterSizeOptionsForWordLines} from './solutionBar.style';
import {View} from 'react-native-animatable';

import R, {Images} from '@res/R';

import SolutionLetter from './solutionLetter';
import {
  SolutionLetterState,
  SolutionLetterType,
} from '@library/models/solutionLetter';

import {
  isCharacterMapFull,
  getFirstCharacterMapEmptyPos,
  getInitialCharacterMap,
  isWordCorrect,
} from '@library/helpers/characterMapHelper';

import {observer, inject} from 'mobx-react';

import {getLevelProgress} from '@library/helpers/levelHelper';

import LevelProgressStore from '@library/mobx/levelProgressStore';
import {Level} from '@library/models/level';
import {Pack} from '@library/models/pack';

type Props = {
  style: ViewStyle;
  word: string;
  onLetterPress: Function;
  levelProgressStore?: LevelProgressStore;
  level: Level;
  pack: Pack;
};

export type CharactersMap = Map<string, SolutionLetterType>;

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
  animateLetters: Function;
  getFirstEmptySolutionLetterId: Function;
  addLetterAtPosition: Function;
  getBoughtLetters: Function;
}

@inject('levelProgressStore')
@observer
export default class SolutionBar extends Component<Props, State> {
  containerView: any;

  constructor(props: Props) {
    super(props);

    const {levelProgress} = getLevelProgress(
      this.props.levelProgressStore?.levelsProgress!,
      this.props.level.id,
      this.props.pack.id,
    );

    let charactersMap;
    if (levelProgress?.solutionLetters.size! > 0) {
      charactersMap = levelProgress?.solutionLetters!;
    } else {
      charactersMap = getInitialCharacterMap(props.word);
      this.props.levelProgressStore?.setSolutionLetters(
        this.props.level.id,
        this.props.pack.id,
        charactersMap,
      );
    }

    this.state = {
      charactersMap,
    };

    this.containerView = null;
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
            letterState={
              this.state.charactersMap.get(charIdx.toString())!.letterState
            }
            availableLetterId={
              this.state.charactersMap.get(charIdx.toString())!
                .availableLetterId
            }
            onPress={this.props.onLetterPress}
            character={
              this.state.charactersMap.get(charIdx.toString())!.character
            }
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

  addLetterAtPosition(
    character: string,
    availableLetterId: string,
    position: number,
    state: SolutionLetterState,
  ) {
    return new Promise((resolve, reject) => {
      if (isCharacterMapFull(this.state.charactersMap, this.props.word)) {
        return;
      }

      const newCharacterMap = new Map(this.state.charactersMap);

      newCharacterMap.set(position.toString(), {
        id: position.toString(),
        character: character,
        letterState: state,
        availableLetterId,
      });

      this.setState(
        {
          ...this.state,
          charactersMap: newCharacterMap,
        },
        () => {
          resolve();
        },
      );
      this.props.levelProgressStore?.setSolutionLetters(
        this.props.level.id,
        this.props.pack.id,
        newCharacterMap,
      );
    });
  }

  addLetter(character: string, availableLetterId: string) {
    if (isCharacterMapFull(this.state.charactersMap, this.props.word)) {
      return;
    }

    const firstEmptyPos = getFirstCharacterMapEmptyPos(
      this.state.charactersMap,
    );

    return this.addLetterAtPosition(
      character,
      availableLetterId,
      firstEmptyPos,
      SolutionLetterState.Filled,
    );
  }

  allLettersAreFull() {
    return isCharacterMapFull(this.state.charactersMap, this.props.word);
  }

  getBoughtLetters() {
    return Array.from(this.state.charactersMap, ([key, value]) => {
      return value;
    }).filter((value) => {
      return value.letterState === SolutionLetterState.Bought;
    });
  }

  removeLetterWithId(id: string) {
    const newCharacterMap = new Map(this.state.charactersMap);
    newCharacterMap.set(id, {
      id,
      character: '',
      letterState: SolutionLetterState.Empty,
      availableLetterId: null,
    });
    this.setState({
      ...this.state,
      charactersMap: newCharacterMap,
    });
    this.props.levelProgressStore?.setSolutionLetters(
      this.props.level.id,
      this.props.pack.id,
      newCharacterMap,
    );
  }

  isWordCorrect() {
    return isWordCorrect(this.state.charactersMap, this.props.word);
  }

  getAllAvailableLetterIds() {
    return Array.from(this.state.charactersMap, ([name, value]) => value).map(
      (mapObject) => {
        return mapObject.availableLetterId;
      },
    );
  }

  removeAllLetters() {
    Array.from(this.state.charactersMap, ([key, value]) => {
      return {key, value};
    }).forEach(({key, value}) => {
      if (value.letterState === SolutionLetterState.Filled) {
        this.removeLetterWithId(key);
      }
    });
  }

  getRandomPendingLetter() {}

  animateLetters(animationType: string, duration: number) {
    this.containerView.animate(animationType, duration);
  }

  render() {
    const letterLines = this.getLetterLinesForWord(this.props.word);

    return (
      <View style={this.props.style}>
        <Image
          style={styles.separator}
          resizeMode="contain"
          source={R.img(Images.separator_line_down)}></Image>
        <View style={styles.solutionView}>
          <View
            style={styles.lettersBar}
            ref={(ref) => {
              this.containerView = ref;
            }}>
            <View style={styles.row}>{letterLines[0]}</View>

            {letterLines.length > 1 ? (
              <View style={styles.row}>{letterLines[1]}</View>
            ) : null}
          </View>
        </View>
        <Image
          style={styles.separator}
          resizeMode="contain"
          source={R.img(Images.separator_line_up)}></Image>
      </View>
    );
  }
}

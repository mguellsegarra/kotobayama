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
import delayPromise from '@library/utils/delayPromise';

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
  updateStore: Function;
  zoomOutLetterWithId: Function;
  zoomInLetterWithId: Function;
}

@inject('levelProgressStore')
@observer
export default class SolutionBar extends Component<Props, State> {
  containerView: any;
  letterObjects: any;

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

  getLetterLinesForWord(word: string) {
    const wordLines = word.split(' ');
    const letterLines: any = [];
    const letterSizeOptions = getLetterSizeOptionsForWordLines(wordLines);

    let charIdx = 0;

    const that = this;

    wordLines.forEach((word) => {
      const line = [];

      for (let i = 0; i < word.length; i += 1) {
        line.push(
          <SolutionLetter
            animatedRef={(ref: any) => {
              that.letterObjects.push(ref);
            }}
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

  async addLetterAtPosition(
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
          this.zoomInLetterWithId(position.toString());

          this.props.levelProgressStore?.setSolutionLetters(
            this.props.level.id,
            this.props.pack.id,
            newCharacterMap,
          );

          resolve();
        },
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

  async removeLetterWithId(id: string) {
    return new Promise((resolve) => {
      const newCharacterMap = new Map(this.state.charactersMap);
      newCharacterMap.set(id, {
        id,
        character: '',
        letterState: SolutionLetterState.Empty,
        availableLetterId: null,
      });
      this.zoomOutLetterWithId(id);
      return delayPromise(100).then(() => {
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
    });
  }

  updateStore() {
    this.props.levelProgressStore?.setSolutionLetters(
      this.props.level.id,
      this.props.pack.id,
      this.state.charactersMap,
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

  async removeAllLetters() {
    return new Promise((resolve, reject) => {
      const newCharacterMap = new Map(this.state.charactersMap);

      Array.from(this.state.charactersMap, ([key, value]) => {
        return {key, value};
      }).forEach(({key, value}) => {
        if (value.letterState !== SolutionLetterState.Filled) {
          return;
        }
        newCharacterMap.set(key, {
          id: key,
          character: '',
          letterState: SolutionLetterState.Empty,
          availableLetterId: null,
        });
        this.zoomOutLetterWithId(key);
      });

      delayPromise(100).then(() => {
        this.setState(
          {
            ...this.state,
            charactersMap: newCharacterMap,
          },
          () => {
            this.updateStore();
            resolve();
          },
        );
      });
    });
  }

  animateLetters(animationType: string, duration: number) {
    this.containerView.animate(animationType, duration);
  }

  render() {
    this.letterObjects = [];
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
              <View style={[styles.lastRow, styles.row]}>{letterLines[1]}</View>
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

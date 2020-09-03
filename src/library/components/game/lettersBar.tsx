import React, {Component} from 'react';
import {Image, Text, View, ViewStyle} from 'react-native';

import R, {Images} from '@res/R';
import {getStyles} from './lettersBar.style';

import AvailableLetter from './availableLetter';

const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

type Props = {
  style: ViewStyle;
  word: string;
};

export default class LettersBar extends Component<Props> {
  letterLines: Array<Array<string>>;

  constructor(props: Props) {
    super(props);
    this.letterHasTapped = this.letterHasTapped.bind(this);

    this.letterLines = this.getLetterLinesForWord(props.word);
  }

  shuffle(array: Array<string>) {
    var currentIndex = array.length,
      temporaryValue,
      randomIndex;

    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }

  getLetterLinesForWord(word: string) {
    const letterLines = [];
    const totalLetters = [];
    const wordWithoutSpace = word.replace(' ', '');
    const wordLength = wordWithoutSpace.length;
    const numberOfRandomLetters = 14 - wordLength;

    for (let i = 0; i < wordWithoutSpace.length; i += 1) {
      totalLetters.push(wordWithoutSpace.substr(i, 1));
    }

    for (let i = 0; i < numberOfRandomLetters; i += 1) {
      totalLetters.push(this.getRandomCharacter());
    }

    const shuffledLetters = this.shuffle(totalLetters);

    const line1 = [];
    const line2 = [];

    for (let i = 0; i < 7; i += 1) {
      line1.push(shuffledLetters[i]);
    }

    for (let i = 7; i < 14; i += 1) {
      line2.push(shuffledLetters[i]);
    }

    letterLines.push(line1);
    letterLines.push(line2);

    return letterLines;
  }

  getRandomCharacter() {
    return characters.charAt(Math.floor(Math.random() * characters.length));
  }

  letterHasTapped(letter: any) {}

  getAvailableLettersForLine(line: number) {
    let i = 0;
    return this.letterLines[line].map((char: string) => {
      i += 1;
      return (
        <AvailableLetter
          key={i.toString()}
          onPress={this.letterHasTapped}
          character={char}
        />
      );
    });
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

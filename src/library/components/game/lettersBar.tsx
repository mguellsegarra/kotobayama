import React, {Component} from 'react';
import {Image, Text, View, ViewStyle} from 'react-native';

import R, {Images} from '@res/R';
import {getStyles} from './lettersBar.style';

import AvailableLetter from './availableLetter';
import LevelService from '@library/services/levelService';

type Props = {
  style: ViewStyle;
  word: string;
};

export default class LettersBar extends Component<Props> {
  letterLines: Array<Array<string>>;

  constructor(props: Props) {
    super(props);
    this.letterHasTapped = this.letterHasTapped.bind(this);

    this.letterLines = LevelService.getLettersForLevel(props.word);
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

import React, { Component } from 'react';
import { Image, Text, View, ViewStyle } from 'react-native';

import R, { Images } from '@res/R';
import { getStyles, getLetterSizeOptionsForWordLines } from './solutionBar.style';

import SolutionLetter from './solutionLetter';

type Props = {
  style: ViewStyle;
  word: string;
};

export default class SolutionBar extends Component<Props> {
  letterLines: Array<Array<Element>>;

  constructor(props: Props) {
    super(props);
    this.letterHasTapped = this.letterHasTapped.bind(this);
    this.onLetterPress = this.onLetterPress.bind(this);
    this.letterLines = this.getLetterLinesForWord(props.word);
  }

  letterHasTapped(letter: any) { }

  getLetterLinesForWord(word: string) {
    const wordLines = word.split(' ');
    const letterLines: Array<Array<Element>> = [];
    const letterSizeOptions = getLetterSizeOptionsForWordLines(wordLines);

    wordLines.forEach((word) => {
      const line: Array<Element> = [];

      for (let i = 0; i < word.length; i += 1) {
        const char = word.charAt(i);
        line.push(
          <SolutionLetter
            key={i.toString()}
            onPress={this.onLetterPress}
            character={char}
            letterSize={letterSizeOptions.letterSize}
            margin={letterSizeOptions.margin}
          />,
        );
      }
      letterLines.push(line);
    });
    return letterLines;
  }

  onLetterPress() { }

  render() {
    const styles = getStyles();

    return (
      <View style={this.props.style}>
        <View style={styles.row}>{this.letterLines[0]}</View>

        {this.letterLines.length > 1 ? (
          <View style={styles.row}>{this.letterLines[1]}</View>
        ) : null}
      </View>
    );
  }
}

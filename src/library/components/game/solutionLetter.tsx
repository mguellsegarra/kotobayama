import React, {Component} from 'react';
import {TouchableWithoutFeedback, Text, ImageBackground, View} from 'react-native';

import R, {Images} from '@res/R';
import {getStyles} from './solutionLetter.style';

type Props = {
  onPress: Function;
  character: string;
  letterSize: number;
  margin: number;
};

export default class SolutionLetter extends Component<Props> {
  render() {
    const styles = getStyles(this.props.letterSize, this.props.margin);

    return (
      <TouchableWithoutFeedback
        onPress={() => {
          this.props.onPress(this.props.character);
        }}>
        <ImageBackground
          style={styles.letter}
          source={R.img(Images.solution_letter)}>
          <View style={styles.characterContainer}>
            <Text style={styles.character}>
              {/* {this.props.character.toUpperCase()} */}
            </Text>
          </View>
        </ImageBackground>
      </TouchableWithoutFeedback>
    );
  }
}

import React, {Component} from 'react';
import {Text, ImageBackground, View} from 'react-native';
// @ts-ignore
import TouchableScale from 'react-native-touchable-scale';

import R, {Images} from '@res/R';
import {getStyles} from './solutionLetter.style';

type Props = {
  id: string;
  character: string;
  letterState: SolutionLetterState;
  availableLetterId: string | null;
  onPress: Function;
  letterSize: number;
  margin: number;
};

export enum SolutionLetterState {
  Empty,
  Filled,
  Bought,
}

export type SolutionLetterType = {
  id: string;
  availableLetterId: string;
  letterState: SolutionLetterState;
};

export default class SolutionLetter extends Component<Props> {
  render() {
    const styles = getStyles(this.props.letterSize, this.props.margin);

    return (
      <TouchableScale
        tension={500}
        friction={10}
        onPress={() => {
          setTimeout(() => {
            this.props.onPress({
              id: this.props.id,
              availableLetterId: this.props.availableLetterId,
              letterState: this.props.letterState,
            });
          }, 300);
        }}>
        <ImageBackground
          style={styles.letter}
          source={R.img(Images.solution_letter)}>
          <View style={styles.characterContainer}>
            <Text style={styles.character}>
              {this.props.letterState === SolutionLetterState.Empty
                ? null
                : this.props.character.toUpperCase()}
            </Text>
          </View>
        </ImageBackground>
      </TouchableScale>
    );
  }
}
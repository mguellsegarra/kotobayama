import React, {Component} from 'react';
import {TouchableWithoutFeedback, ImageBackground, View} from 'react-native';
import {Text} from 'react-native-animatable';

import R, {Images} from '@res/R';
import {getStyles} from './solutionLetter.style';
import {
  SolutionLetterState,
  SolutionLetterType,
} from '@library/models/solutionLetter';

type Props = {
  id: string;
  character: string;
  letterState: SolutionLetterState;
  availableLetterId: string | null;
  onPress: Function;
  letterSize: number;
  margin: number;
  animatedRef: Function;
};

export default class SolutionLetter extends Component<Props> {
  styles: any;

  constructor(props: Props) {
    super(props);
    this.styles = getStyles(this.props.letterSize, this.props.margin);
  }

  render() {
    const {styles} = this;

    return (
      <TouchableWithoutFeedback
        onPress={() => {
          const letter: SolutionLetterType = {
            id: this.props.id,
            character: this.props.character,
            availableLetterId: this.props.availableLetterId!,
            letterState: this.props.letterState,
          };
          this.props.onPress(letter);
        }}>
        <View>
          <ImageBackground
            style={styles.letter}
            source={R.img(Images.solution_letter)}>
            <View style={styles.characterContainer}>
              <Text
                useNativeDriver
                ref={(ref: any) => {
                  if (ref && ref !== null) {
                    this.props.animatedRef({...ref, id: this.props.id});
                  }
                }}
                style={[
                  styles.character,
                  this.props.letterState === SolutionLetterState.Bought
                    ? styles.characterGold
                    : undefined,
                ]}>
                {this.props.letterState === SolutionLetterState.Empty
                  ? null
                  : this.props.character.toUpperCase()}
              </Text>
            </View>
          </ImageBackground>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

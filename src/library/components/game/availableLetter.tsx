import React, {Component} from 'react';
import {Text, ImageBackground, View} from 'react-native';

// @ts-ignore
import TouchableScale from 'react-native-touchable-scale';

import R, {Images} from '@res/R';
import {styles} from './availableLetter.style';

type Props = {
  id: string;
  onPress: Function;
  character: string;
  letterState: AvailableLetterState;
};

export type AvailableLetterType = {
  id: string;
  letterState: AvailableLetterState;
  character: string;
};

export enum AvailableLetterState {
  Idle,
  Selected,
  Bought,
}

export default class AvailableLetter extends Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    return (
      <TouchableScale
        tension={500}
        friction={10}
        onPress={() => {
          setTimeout(() => {
            const letterTapped: AvailableLetterType = {
              id: this.props.id,
              letterState: this.props.letterState,
              character: this.props.character,
            };

            this.props.onPress(letterTapped);
          }, 300);
        }}>
        <ImageBackground
          style={{
            ...styles.letter,
            opacity:
              this.props.letterState === AvailableLetterState.Idle ? 1 : 0,
          }}
          source={R.img(Images.option_letter)}>
          <View style={styles.characterContainer}>
            <Text style={styles.character}>
              {this.props.character.toUpperCase()}
            </Text>
          </View>
        </ImageBackground>
      </TouchableScale>
    );
  }
}

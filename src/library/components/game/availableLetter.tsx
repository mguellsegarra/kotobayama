import React, {Component} from 'react';
import {
  TouchableWithoutFeedback,
  Text,
  ImageBackground,
  View,
} from 'react-native';
import {View as AnimatedView} from 'react-native-animatable';

import R, {Images} from '@res/R';
import {styles} from './availableLetter.style';
import {
  AvailableLetterState,
  AvailableLetterType,
} from '@library/models/availableLetter';

type Props = {
  id: string;
  onPress: Function;
  character: string;
  letterState: AvailableLetterState;
  animatedRef: Function;
};

export default class AvailableLetter extends Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    return (
      <TouchableWithoutFeedback
        onPress={() => {
          if (this.props.letterState === AvailableLetterState.Idle) {
            const letterTapped: AvailableLetterType = {
              id: this.props.id,
              letterState: this.props.letterState,
              character: this.props.character,
            };
            this.props.onPress(letterTapped);
          }
        }}>
        <AnimatedView
          useNativeDriver
          ref={(ref) => {
            if (ref && ref !== null) {
              this.props.animatedRef({...ref, id: this.props.id});
            }
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
        </AnimatedView>
      </TouchableWithoutFeedback>
    );
  }
}

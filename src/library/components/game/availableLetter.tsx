import React, {Component} from 'react';
import {TouchableWithoutFeedback, Text, ImageBackground, View} from 'react-native';

import R, {Images} from '@res/R';
import {getStyles} from './availableLetter.style';

type Props = {
  onPress: Function;
  character: string;
};

export default class AvailableLetter extends Component<Props> {
  render() {
    const styles = getStyles();

    return (
      <TouchableWithoutFeedback
        onPress={() => {
          this.props.onPress(this.props.character);
        }}>
        <ImageBackground
          style={styles.letter}
          source={R.img(Images.option_letter)}>
          <View style={styles.characterContainer}>
            <Text style={styles.character}>
              {this.props.character.toUpperCase()}
            </Text>
          </View>
        </ImageBackground>
      </TouchableWithoutFeedback>
    );
  }
}

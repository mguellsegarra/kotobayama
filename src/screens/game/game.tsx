import React, {Component} from 'react';
import {View, ImageBackground, Image, Text} from 'react-native';
import R from 'src/res';

import {getStyles} from './game.style';
import NoNotchView from 'src/library/components/noNotchView';
import LinearGradient from 'react-native-linear-gradient';
import CircleButton from 'src/library/components/button/circleButton';

type Props = {
  navigation: any;
};
type State = {};

export default class LevelMap extends Component<Props, State> {
  styles: any;
  mapLayer: any;

  state = {};

  constructor(props: Props) {
    super(props);
    this.styles = {};
  }

  render() {
    this.styles = getStyles();

    return (
      <LinearGradient
        colors={[R.colors.purpleGradientStart, R.colors.purpleGradientEnd]}
        style={this.styles.background}>
        <NoNotchView>
          <CircleButton
            style={this.styles.backButton}
            image="backButton"
            onPress={this.props.navigation.goBack}></CircleButton>
        </NoNotchView>
      </LinearGradient>
    );
  }
}

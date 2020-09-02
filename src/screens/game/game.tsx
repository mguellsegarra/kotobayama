import React, {Component} from 'react';
import {View, ImageBackground, Image, Text} from 'react-native';
import {Colors} from '@res/R';

import {getStyles} from './game.style';
import NoNotchView from '@library/components/noNotchView';
import LinearGradient from 'react-native-linear-gradient';
import CircleButton from '@library/components/button/circleButton';

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
        colors={[Colors.purpleGradientStart, Colors.purpleGradientEnd]}
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

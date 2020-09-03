import React, {Component} from 'react';
import {View, ImageBackground, Image, Text} from 'react-native';
import {Colors, Images} from '@res/R';

import {getStyles} from './game.style';
import NoNotchView from '@library/components/noNotchView';
import LinearGradient from 'react-native-linear-gradient';
import CircleButton from '@library/components/button/circleButton';
import PhotoFrame, {PhotoFrameSize} from '@library/components/photo/photoFrame';

type Props = {
  navigation: any;
  route: any;
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
    const {level} = this.props.route.params;

    return (
      <LinearGradient
        colors={[Colors.purpleGradientStart, Colors.purpleGradientEnd]}
        style={this.styles.background}>
        <NoNotchView>
          <View style={this.styles.navBar}>
            <View style={this.styles.navBarLeft}>
              <CircleButton
                style={this.styles.backButton}
                image={Images.back_button}
                onPress={this.props.navigation.goBack}></CircleButton>
            </View>
            <View style={this.styles.navBarMiddle}></View>
            <View style={this.styles.navBarRight}></View>
          </View>
          <View style={this.styles.titleBar}></View>
          <View style={this.styles.photoBar}>
            <PhotoFrame size={PhotoFrameSize.big} level={level} />
            <Text style={this.styles.sourceText}>
              Font fotografia: pirineosconninos.es
            </Text>
          </View>
          <View style={this.styles.solutionBar}></View>
          <View style={this.styles.powerUpsBar}></View>
          <View style={this.styles.lettersBar}></View>
        </NoNotchView>
      </LinearGradient>
    );
  }
}

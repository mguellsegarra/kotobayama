import React, {Component} from 'react';
import {View, Image, Text} from 'react-native';
import R, {Colors, Images} from '@res/R';

import {getStyles} from './game.style';
import NoNotchView from '@library/components/common/noNotchView';
import LinearGradient from 'react-native-linear-gradient';
import CircleButton from '@library/components/button/circleButton';
import PhotoFrame, {PhotoFrameSize} from '@library/components/photo/photoFrame';
import LevelIndexNumber from '@library/components/common/levelIndexNumber';
import LivesIndicator from '@library/components/game/livesIndicator';
import CoinCounter from '@library/components/game/coinCounter';
import LettersBar from '@library/components/game/lettersBar';

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
    const {levels, currentLevel} = this.props.route.params;
    const level = levels[currentLevel];

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
            <View style={this.styles.navBarMiddle}>
              <LivesIndicator lives={1} />
            </View>
            <View style={this.styles.navBarRight}>
              <CoinCounter totalCoins={200} onPress={() => {}} />
            </View>
          </View>
          <View style={this.styles.titleBar}>
            <Text
              style={this.styles.titleText}
              adjustsFontSizeToFit
              numberOfLines={1}>
              Parc Nacional d'Aigüestortes i llac de Sant Maurici
            </Text>

            <LevelIndexNumber
              totalLevels={levels.length}
              currentLevel={currentLevel}
            />
          </View>
          <View style={this.styles.photoBar}>
            <PhotoFrame size={PhotoFrameSize.big} level={level} />
            <Text style={this.styles.sourceText}>
              Font fotografia: pirineosconninos.es
            </Text>
          </View>
          <View style={this.styles.solutionBar}>
            <Image
              style={this.styles.separator}
              resizeMode="contain"
              source={R.img(Images.separator_line_down)}></Image>
            <View style={this.styles.solutionView}></View>
            <Image
              style={this.styles.separator}
              resizeMode="contain"
              source={R.img(Images.separator_line_up)}></Image>
          </View>
          <View style={this.styles.powerUpsBar}></View>
          <LettersBar style={this.styles.lettersBar} word={level.word} />
        </NoNotchView>
      </LinearGradient>
    );
  }
}

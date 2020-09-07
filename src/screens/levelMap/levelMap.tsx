import React, {Component} from 'react';
import {View, ImageBackground, Text, Animated} from 'react-native';

import {getStyles} from './levelMap.style';
import NoNotchView from '@library/components/common/noNotchView';
import R, {Images} from '@res/R';

import {strings} from '@library/services/i18nService';
import MapLayer from '@library/components/map/mapLayer';
import LevelService, {Level, Pack} from '@library/services/levelService';

import LevelChooser from '@library/components/map/levelChooser';
import RectButton, {
  RectButtonEnum,
} from '@library/components/button/rectButton';
import CircleButton from '@library/components/button/circleButton';

type State = {
  mapNavigationMode: boolean;
  currentLevel: number;
  pack: Pack;
  fadeAnim: Animated.Value;
};

type Props = {
  navigation: any;
  route: any;
};

export default class LevelMap extends Component<Props, State> {
  styles: any;
  mapLayer: any;

  constructor(props: Props) {
    super(props);
    this.styles = {};
    this.setNextLevel = this.setNextLevel.bind(this);
    this.setPrevLevel = this.setPrevLevel.bind(this);
    this.onMapPanDrag = this.onMapPanDrag.bind(this);
    this.mapLoaded = this.mapLoaded.bind(this);

    const {pack} = this.props.route.params;

    this.state = {
      mapNavigationMode: false,
      currentLevel: 0,
      fadeAnim: new Animated.Value(1),
      pack,
    };
  }

  mapLoaded() {
    Animated.timing(this.state.fadeAnim, {
      toValue: 0,
      delay: 0,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }

  setNextLevel() {
    let nextLevel: number;
    if (this.state.currentLevel === this.state.pack.levels!.length - 1) {
      nextLevel = 0;
    } else {
      nextLevel = this.state.currentLevel + 1;
    }
    this.setCurrentLevel(nextLevel);
  }

  setPrevLevel() {
    let nextLevel: number;
    if (this.state.currentLevel === 0) {
      nextLevel = this.state.pack.levels!.length - 1;
    } else {
      nextLevel = this.state.currentLevel - 1;
    }
    this.setCurrentLevel(nextLevel);
  }

  setCurrentLevel(level: number) {
    this.setState(
      {
        ...this.state,
        currentLevel: level,
      },
      () => {
        this.mapLayer.setCurrentLevel(level);
        this.mapLayer.resetToLevel();
      },
    );
  }

  onMapPanDrag() {
    if (!this.state.mapNavigationMode) {
      this.setState({
        mapNavigationMode: !this.state.mapNavigationMode,
      });
    }
  }

  render() {
    this.styles = getStyles();

    return (
      <NoNotchView>
        <View style={this.styles.container}>
          <MapLayer
            ref={(ref: any) => {
              this.mapLayer = ref;
            }}
            levels={this.state.pack.levels!}
            controlsEnabled={this.state.mapNavigationMode}
            onPanDrag={this.onMapPanDrag}
            onMapLoaded={this.mapLoaded}
          />

          {this.state.mapNavigationMode ? null : (
            <View style={this.styles.titleOverlay}>
              <ImageBackground
                source={R.img(Images.map_title_container)}
                style={this.styles.mapTitleContainerImage}>
                <Text style={this.styles.mapTitleText}>
                  {this.state.pack.title}
                </Text>
              </ImageBackground>
            </View>
          )}

          {this.state.mapNavigationMode ? null : (
            <View style={this.styles.backButtonContainer}>
              <CircleButton
                style={this.styles.backButton}
                image={Images.back_button}
              />
            </View>
          )}

          <RectButton
            hide={this.state.mapNavigationMode}
            type={RectButtonEnum.Yellow}
            text={strings('play')}
            style={this.styles.playButtonOverlay}
            onPress={() => {
              this.props.navigation.navigate('Game', {
                pack: this.state.pack,
                currentLevel: this.state.currentLevel,
              });
            }}
          />

          <RectButton
            hide={!this.state.mapNavigationMode}
            type={RectButtonEnum.Blue}
            text={strings('back')}
            style={this.styles.closeMapButtonOverlay}
            onPress={() => {
              this.setState({
                mapNavigationMode: !this.state.mapNavigationMode,
              });

              setTimeout(() => {
                this.mapLayer.resetToLevel();
              }, 200);
            }}
          />

          <LevelChooser
            currentLevel={this.state.currentLevel}
            levels={this.state.pack.levels!}
            hide={this.state.mapNavigationMode}
            onNextLevel={this.setNextLevel}
            onPrevLevel={this.setPrevLevel}
          />
        </View>
        <Animated.View
          pointerEvents="none"
          style={[
            this.styles.overlayLoad,
            {
              opacity: this.state.fadeAnim,
            },
          ]}>
          <ImageBackground
            source={R.img(Images.mountain_bg)}
            style={this.styles.overlayLoad}></ImageBackground>
        </Animated.View>
      </NoNotchView>
    );
  }
}

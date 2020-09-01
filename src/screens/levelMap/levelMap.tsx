import React, {Component} from 'react';
import {View, ImageBackground, Text} from 'react-native';

import {getStyles} from './levelMap.style';
import NoNotchView from 'src/library/components/noNotchView';
import R from 'src/res';

import {strings} from 'src/library/services/i18nService';
import MapLayer from 'src/library/components/map/mapLayer';
import LevelService, {Level} from 'src/library/services/levelService';

import LevelChooser from 'src/library/components/map/levelChooser';
import RectButton, {
  RectButtonEnum,
} from 'src/library/components/button/rectButton';
import CircleButton from 'src/library/components/button/circleButton';

type State = {
  mapNavigationMode: boolean;
  currentLevel: number;
  levels: Array<Level>;
};

type Props = {
  navigation: any;
};

export default class LevelMap extends Component<Props, State> {
  styles: any;
  mapLayer: any;

  state = {
    mapNavigationMode: false,
    currentLevel: 0,
    levels: LevelService.getLevels(),
  };

  constructor(props: Props) {
    super(props);
    this.styles = {};
    this.setNextLevel = this.setNextLevel.bind(this);
    this.setPrevLevel = this.setPrevLevel.bind(this);
    this.onMapPanDrag = this.onMapPanDrag.bind(this);
  }

  setNextLevel() {
    let nextLevel: number;
    if (this.state.currentLevel === this.state.levels.length - 1) {
      nextLevel = 0;
    } else {
      nextLevel = this.state.currentLevel + 1;
    }
    this.setState(
      {
        ...this.state,
        currentLevel: nextLevel,
      },
      () => {
        this.mapLayer.setCurrentLevel(nextLevel);
        this.mapLayer.resetToLevel();
      },
    );
  }

  setPrevLevel() {
    let nextLevel: number;
    if (this.state.currentLevel === 0) {
      nextLevel = this.state.levels.length - 1;
    } else {
      nextLevel = this.state.currentLevel - 1;
    }
    this.setState(
      {
        ...this.state,
        currentLevel: nextLevel,
      },
      () => {
        this.mapLayer.setCurrentLevel(nextLevel);
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
            levels={this.state.levels}
            controlsEnabled={this.state.mapNavigationMode}
            onPanDrag={this.onMapPanDrag}
          />

          {this.state.mapNavigationMode ? null : (
            <View style={this.styles.titleOverlay}>
              <ImageBackground
                source={R.images['mapTitleContainer']}
                style={this.styles.mapTitleContainerImage}
                resizeMode="contain">
                <Text style={this.styles.mapTitleText}>
                  Parc Nacional d'Aigüestortes i llac de Sant Maurici
                </Text>
              </ImageBackground>
            </View>
          )}

          {this.state.mapNavigationMode ? null : (
            <View style={this.styles.backButtonContainer}>
              <CircleButton
                imageStyle={this.styles.backButton}
                style={this.styles.backButton}
                image="mapNavBackButton"
              />
            </View>
          )}

          <RectButton
            hide={this.state.mapNavigationMode}
            type={RectButtonEnum.Yellow}
            text={strings('play')}
            style={this.styles.playButtonOverlay}
            onPress={() => {
              this.props.navigation.navigate('Game');
            }}
          />

          <RectButton
            hide={!this.state.mapNavigationMode}
            type={RectButtonEnum.Blue}
            text={strings('back')}
            style={this.styles.closeMapButtonOverlay}
            onPress={() => {
              setTimeout(() => {
                this.mapLayer.resetToLevel();
              }, 500);

              setTimeout(() => {
                this.setState({
                  mapNavigationMode: !this.state.mapNavigationMode,
                });
              }, 300);
            }}
          />

          <LevelChooser
            currentLevel={this.state.currentLevel}
            levels={this.state.levels}
            hide={this.state.mapNavigationMode}
            onNextLevel={this.setNextLevel}
            onPrevLevel={this.setPrevLevel}
          />
        </View>
      </NoNotchView>
    );
  }
}

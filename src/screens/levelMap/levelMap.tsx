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
import MapNavButton, {
  MapNavButtonEnum,
} from 'src/library/components/button/mapNavButton';

type State = {
  mapNavigationMode: boolean;
  currentLevel: number;
  levels: Array<Level>;
};

export default class LevelMap extends Component<State> {
  styles: any;
  mapLayer: any;

  state = {
    mapNavigationMode: false,
    currentLevel: 0,
    levels: LevelService.getLevels(),
  };

  constructor(props: any) {
    super(props);
    this.styles = {};
    this.setNextLevel = this.setNextLevel.bind(this);
    this.setPrevLevel = this.setPrevLevel.bind(this);
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

          <MapNavButton
            type={MapNavButtonEnum.Back}
            style={this.styles.leftButtonOverlay}
            hide={this.state.mapNavigationMode}
          />

          <MapNavButton
            type={MapNavButtonEnum.Map}
            style={this.styles.rightButtonOverlay}
            hide={this.state.mapNavigationMode}
            right
            onPress={() => {
              setTimeout(() => {
                this.setState({
                  mapNavigationMode: !this.state.mapNavigationMode,
                });
              }, 500);
            }}
          />

          <RectButton
            hide={this.state.mapNavigationMode}
            type={RectButtonEnum.Yellow}
            text={strings('play')}
            style={this.styles.playButtonOverlay}
          />

          <RectButton
            hide={!this.state.mapNavigationMode}
            type={RectButtonEnum.Yellow}
            text={strings('closeMap')}
            style={this.styles.closeMapButtonOverlay}
            onPress={() => {
              this.mapLayer.resetToLevel();

              setTimeout(() => {
                this.setState({
                  mapNavigationMode: !this.state.mapNavigationMode,
                });
              }, 500);
            }}
          />

          <LevelChooser
            currentLevel={this.state.currentLevel}
            totalLevels={this.state.levels.length}
            hide={this.state.mapNavigationMode}
            onNextLevel={this.setNextLevel}
            onPrevLevel={this.setPrevLevel}
          />
        </View>
      </NoNotchView>
    );
  }
}

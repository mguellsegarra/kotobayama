import React, {Component} from 'react';
import {View, ImageBackground, Text, Animated} from 'react-native';

import {getStyles} from './levelMap.style';
import NoNotchView from '@library/components/common/noNotchView';
import R, {Images} from '@res/R';

import {strings} from '@library/services/i18nService';
import MapLayer from '@library/components/map/mapLayer';
import {Level} from '@library/models/level';
import {Pack} from '@library/models/pack';

import LevelChooser from '@library/components/map/levelChooser';
import RectButton, {
  RectButtonEnum,
} from '@library/components/button/rectButton';
import CircleButton from '@library/components/button/circleButton';

import {observer, inject} from 'mobx-react';
import LevelProgressStore, {
  getFirstIncompleteLevelIdForPack,
} from '@library/mobx/levelProgressStore';
import LevelMapStore from '@library/mobx/levelMapStore';

import LevelService from '@library/services/levelService';

type State = {
  mapNavigationMode: boolean;
  fadeAnim: Animated.Value;
};

type Props = {
  navigation: any;
  route: any;
  levelProgressStore: LevelProgressStore;
  levelMapStore: LevelMapStore;
};

@inject('levelProgressStore')
@inject('levelMapStore')
@observer
export default class LevelMap extends Component<Props, State> {
  styles: any;
  mapLayer: any;
  packId: string;
  pack: Pack;
  levels: Array<Level>;
  prevCurrentLevel: number;

  constructor(props: Props) {
    super(props);
    this.styles = {};
    this.onMapPanDrag = this.onMapPanDrag.bind(this);
    this.mapLoaded = this.mapLoaded.bind(this);
    this.getCurrentLevel = this.getCurrentLevel.bind(this);

    const {packId} = this.props.route.params;
    this.packId = packId;
    this.pack = LevelService.getPackWithId(this.packId);
    this.levels = LevelService.getLevelsForPack(packId);

    const {idx} = this.getFirstIncompleteLevel();
    this.props.levelMapStore.setCurrentLevelForPack(idx, this.pack);
    this.prevCurrentLevel = idx;

    this.state = {
      mapNavigationMode: false,
      fadeAnim: new Animated.Value(1),
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

  componentDidMount() {
    this.updateMapLayer();
  }

  componentDidUpdate() {
    const actualCurrentLevel = this.props.levelMapStore.currentLevelForPack[
      this.pack.id
    ];
    if (this.prevCurrentLevel !== actualCurrentLevel) {
      this.updateMapLayer();
      this.prevCurrentLevel = actualCurrentLevel;
    }
  }

  updateMapLayer() {
    const actualCurrentLevel = this.props.levelMapStore.currentLevelForPack[
      this.pack.id
    ];
    this.mapLayer.setCurrentLevel(actualCurrentLevel);
    this.mapLayer.resetToLevel();
  }

  onMapPanDrag() {
    if (!this.state.mapNavigationMode) {
      this.setState({
        mapNavigationMode: !this.state.mapNavigationMode,
      });
    }
  }

  getFirstIncompleteLevel() {
    let levelIdx: number = 0;

    const {levelId} = getFirstIncompleteLevelIdForPack(
      this.props.levelProgressStore.levelsProgress,
      this.pack,
    );

    const level = this.levels.find((lvl, lvlIdx) => {
      const found = lvl.id === levelId;

      if (found) {
        levelIdx = lvlIdx;
      }
      return found;
    });

    return {idx: levelIdx, level};
  }

  getCurrentLevel() {
    return this.props.levelMapStore.currentLevelForPack[this.packId];
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
            initialLevel={this.getCurrentLevel()}
            levels={this.levels}
            controlsEnabled={this.state.mapNavigationMode}
            onPanDrag={this.onMapPanDrag}
            onMapLoaded={this.mapLoaded}
          />

          {this.state.mapNavigationMode ? null : (
            <View style={this.styles.titleOverlay}>
              <ImageBackground
                source={R.img(Images.map_title_container)}
                style={this.styles.mapTitleContainerImage}>
                <Text style={this.styles.mapTitleText}>{this.pack.title}</Text>
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
                packId: this.packId,
                levels: this.levels,
                currentLevel: this.getCurrentLevel(),
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
            currentLevel={this.getCurrentLevel()}
            levels={this.levels}
            packId={this.packId}
            hide={this.state.mapNavigationMode}
            onNextLevel={() => {
              this.props.levelMapStore.nextLevelForPack(this.pack);
            }}
            onPrevLevel={() => {
              this.props.levelMapStore.prevLevelForPack(this.pack);
            }}
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

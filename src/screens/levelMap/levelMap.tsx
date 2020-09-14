import React, {Component} from 'react';
import {View, ImageBackground, Animated} from 'react-native';
import {View as AnimatableView} from 'react-native-animatable';

import {styles} from './levelMap.style';
import R, {Images} from '@res/R';

import {strings} from '@library/services/i18nService';
import MapLayer from '@library/components/map/mapLayer';
import MapTitleBanner from '@library/components/map/mapTitleBanner';
import CoinCounter from '@library/components/game/coinCounter';

import {Level} from '@library/models/level';
import {Pack} from '@library/models/pack';

import LevelChooser from '@library/components/map/levelChooser';
import RectButton, {
  RectButtonEnum,
} from '@library/components/button/rectButton';
import CircleButton from '@library/components/button/circleButton';
import MapTypeButton from '@library/components/map/mapTypeButton';

import {observer, inject} from 'mobx-react';
import LevelProgressStore, {
  getFirstIncompleteLevelIdForPack,
  getProgressForPack,
  getLevelProgress,
} from '@library/mobx/levelProgressStore';
import LevelMapStore from '@library/mobx/levelMapStore';
import UserStore from '@library/mobx/userStore';

import LevelService from '@library/services/levelService';
import LevelCompletedBanner from '@library/components/map/levelCompletedBanner';
import PlayButton from '@library/components/map/playButton';

type State = {
  mapNavigationMode: boolean;
  fadeAnim: Animated.Value;
};

type Props = {
  navigation: any;
  route: any;
  levelProgressStore: LevelProgressStore;
  levelMapStore: LevelMapStore;
  userStore: UserStore;
};

@inject('levelProgressStore')
@inject('levelMapStore')
@inject('userStore')
@observer
export default class LevelMap extends Component<Props, State> {
  mapLayer: any;
  packId: string;
  pack: Pack;
  levels: Array<Level>;
  prevCurrentLevel: number;
  levelChooser: any;
  navbar: any;
  mapTitleBanner: any;
  playButton: any;
  closeMapButton: any;
  levelCompletedBanner: any;

  constructor(props: Props) {
    super(props);
    this.onMapPanDrag = this.onMapPanDrag.bind(this);
    this.mapLoaded = this.mapLoaded.bind(this);
    this.getCurrentLevel = this.getCurrentLevel.bind(this);

    this.handleAnimsForMapNavigationMode = this.handleAnimsForMapNavigationMode.bind(
      this,
    );

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
      this.handleAnimsForMapNavigationMode();
      this.setState({
        mapNavigationMode: !this.state.mapNavigationMode,
      });
    }
  }

  handleAnimsForMapNavigationMode() {
    const currentLevelId = this.levels[
      this.props.levelMapStore.currentLevelForPack[this.packId]
    ].id;

    const {levelProgress} = getLevelProgress(
      this.props.levelProgressStore.levelsProgress,
      currentLevelId,
      this.packId,
    );

    if (this.state.mapNavigationMode) {
      this.closeMapButton.animate('fadeOut', 300);
      this.navbar.animate('fadeIn', 300);
      this.mapTitleBanner.animate('fadeIn', 300);
      this.levelChooser.animate('fadeIn', 300);

      if (levelProgress?.completed) {
        this.levelCompletedBanner?.animate('fadeIn', 300);
      } else {
        this.playButton.animate('fadeIn', 300);
      }
    } else {
      this.closeMapButton.animate('fadeIn', 300);
      this.navbar.animate('fadeOut', 300);
      this.mapTitleBanner?.animate('fadeOut', 300);
      this.levelChooser.animate('fadeOut', 300);

      if (levelProgress?.completed) {
        this.levelCompletedBanner?.animate('fadeOut', 300);
      } else {
        this.playButton.animate('fadeOut', 300);
      }
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
    const currentLevelId = this.levels[
      this.props.levelMapStore.currentLevelForPack[this.packId]
    ].id;
    const {levelProgress} = getLevelProgress(
      this.props.levelProgressStore.levelsProgress,
      currentLevelId,
      this.packId,
    );

    return (
      <View style={styles.root}>
        <View style={styles.container}>
          <MapLayer
            ref={(ref: any) => {
              this.mapLayer = ref;
            }}
            initialLevel={this.getCurrentLevel()}
            levels={this.levels}
            controlsEnabled={this.state.mapNavigationMode}
            onPanDrag={this.onMapPanDrag}
            onMapLoaded={this.mapLoaded}
            packId={this.packId}
          />

          <AnimatableView
            useNativeDriver
            style={styles.navBar}
            ref={(ref) => {
              this.navbar = ref;
            }}
            pointerEvents={this.state.mapNavigationMode ? 'none' : 'auto'}>
            <View style={styles.navBarLeft}>
              <CircleButton
                style={styles.backButton}
                image={Images.back_button}
                onPress={() => {}}></CircleButton>
            </View>
            <View style={styles.navBarMiddle}></View>
            <View style={styles.navBarRight}>
              <CoinCounter
                totalCoins={this.props.userStore.coins}
                onPress={() => {}}
              />
            </View>
          </AnimatableView>

          <MapTitleBanner
            ref={(ref) => {
              this.mapTitleBanner = ref;
            }}
            pointerEvents={this.state.mapNavigationMode ? 'none' : 'auto'}
            title={this.pack.title}
            progress={getProgressForPack(
              this.props.levelProgressStore.levelsProgress,
              this.pack,
            )}
          />

          <View style={styles.mapTypeButtonContainer}>
            <MapTypeButton
              mapMode={this.props.userStore.mapTypeMode}
              onPress={() => {
                this.props.userStore.toggleMapTypeMode();
              }}
            />
          </View>

          {levelProgress?.completed ? (
            <LevelCompletedBanner
              style={styles.levelCompletedBanner}
              ref={(ref) => {
                this.levelCompletedBanner = ref;
              }}
              pointerEvents={this.state.mapNavigationMode ? 'none' : 'auto'}
              title={this.levels[this.getCurrentLevel()].title}
              stars={levelProgress?.stars!}
            />
          ) : (
            <PlayButton
              ref={(ref) => {
                this.playButton = ref;
              }}
              pointerEvents={this.state.mapNavigationMode ? 'none' : 'auto'}
              navigation={this.props.navigation}
              levels={this.levels}
              currentLevel={this.getCurrentLevel()}
              packId={this.packId}
            />
          )}

          <RectButton
            ref={(ref) => {
              this.closeMapButton = ref;
            }}
            pointerEvents={!this.state.mapNavigationMode ? 'none' : 'auto'}
            type={RectButtonEnum.Blue}
            text={strings('back')}
            style={styles.closeMapButtonOverlay}
            onPress={() => {
              this.handleAnimsForMapNavigationMode();
              this.setState({
                mapNavigationMode: !this.state.mapNavigationMode,
              });

              setTimeout(() => {
                this.mapLayer.resetToLevel();
              }, 200);
            }}
          />

          <LevelChooser
            ref={(ref) => {
              this.levelChooser = ref;
            }}
            currentLevel={this.getCurrentLevel()}
            levels={this.levels}
            packId={this.packId}
            pointerEvents={this.state.mapNavigationMode ? 'none' : 'auto'}
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
            styles.overlayLoad,
            {
              opacity: this.state.fadeAnim,
            },
          ]}>
          <ImageBackground
            source={R.img(Images.mountain_bg)}
            style={styles.overlayLoad}></ImageBackground>
        </Animated.View>
      </View>
    );
  }
}

import React, {Component} from 'react';
import {View} from 'react-native';
import {observer, inject} from 'mobx-react';

import {styles} from './levelMap.style';
const gameConfig = require('@assets/gameConfig');

import {Level} from '@library/models/level';
import {Pack} from '@library/models/pack';

import {Images} from '@res/R';
import {strings} from '@library/services/i18nService';

import LevelService from '@library/services/levelService';
import delayPromise from '@library/utils/delayPromise';

import Navbar from '@library/components/map/navbar';
import MapLayer from '@library/components/map/mapLayer';
import MapTitleBanner from '@library/components/map/mapTitleBanner';
import LevelChooser from '@library/components/map/levelChooser';
import RectButton, {
  RectButtonEnum,
} from '@library/components/button/rectButton';
import MapTypeButton from '@library/components/map/mapTypeButton';
import LevelCompletedBanner from '@library/components/map/levelCompletedBanner';
import PlayButton from '@library/components/map/playButton';
import LoadingView from '@library/components/common/loadingView';
import Popup from '@library/components/common/popup';
import MapboxLogo from '@library/components/map/mapboxLogo';
import MapboxCreditsText from '@library/components/map/mapcreditsText';

import {
  getFirstIncompleteLevel,
  getProgressForPack,
  getLevelProgress,
} from '@library/helpers/levelHelper';
import {checkIfEnoughCoins} from '@library/helpers/coinHelper';

import LevelProgressStore from '@library/mobx/levelProgressStore';
import LevelMapStore from '@library/mobx/levelMapStore';
import UserStore from '@library/mobx/userStore';
import {MapTypeMode} from '@library/models/mapTypeMode';

type State = {
  mapNavigationMode: boolean;
  showPopup: boolean;
  popupAmount: number;
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
  packId: string;
  pack: Pack;
  levels: Array<Level>;
  prevCurrentLevel: number;
  // Views
  mapLayer: any;
  levelChooser: any;
  navbar: any;
  mapTitleBanner: any;
  playButton: any;
  closeMapButton: any;
  levelCompletedBanner: any;
  loadingView: any;
  popup: any;
  mapCreditsText: any;

  constructor(props: Props) {
    super(props);

    this.onMapPanDrag = this.onMapPanDrag.bind(this);
    this.mapLoaded = this.mapLoaded.bind(this);
    this.getCurrentLevel = this.getCurrentLevel.bind(this);
    this.handleAnimsForMapNavigationMode = this.handleAnimsForMapNavigationMode.bind(
      this,
    );
    this.popupConfirm = this.popupConfirm.bind(this);
    this.popupCancel = this.popupCancel.bind(this);
    this.restoreLives = this.restoreLives.bind(this);
    this.showPopup = this.showPopup.bind(this);
    this.onMarkerPress = this.onMarkerPress.bind(this);

    const {packId} = this.props.route.params;
    this.packId = packId;
    this.pack = LevelService.getPackWithId(this.packId);
    this.levels = LevelService.getLevelsForPack(packId);

    const {idx} = getFirstIncompleteLevel({
      pack: this.pack,
      levelsProgress: this.props.levelProgressStore.levelsProgress,
      levels: this.levels,
    });
    this.props.levelMapStore.setCurrentLevelForPack(idx, this.pack);
    this.prevCurrentLevel = idx;

    this.state = {
      mapNavigationMode: false,
      showPopup: false,
      popupAmount: 0,
    };
  }

  mapLoaded() {
    this.loadingView.fadeOut();
  }

  componentDidUpdate() {
    const actualCurrentLevel = this.props.levelMapStore.currentLevelForPack.get(
      this.pack.id,
    );
    if (this.prevCurrentLevel !== actualCurrentLevel) {
      this.updateMapLayer();
      this.prevCurrentLevel = actualCurrentLevel!;
    }
  }

  updateMapLayer() {
    const actualCurrentLevel = this.props.levelMapStore.currentLevelForPack.get(
      this.pack.id,
    );
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
      this.props.levelMapStore.currentLevelForPack.get(this.packId)!
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
      this.mapCreditsText.animate('fadeIn', 300);

      if (levelProgress?.completed) {
        this.levelCompletedBanner?.animate('fadeIn', 300);
      } else {
        this.playButton?.animate('fadeIn', 300);
      }
    } else {
      this.closeMapButton.animate('fadeIn', 300);
      this.navbar.animate('fadeOut', 300);
      this.mapTitleBanner?.animate('fadeOut', 300);
      this.levelChooser.animate('fadeOut', 300);
      this.mapCreditsText.animate('fadeOut', 300);

      if (levelProgress?.completed) {
        this.levelCompletedBanner?.animate('fadeOut', 300);
      } else {
        this.playButton?.animate('fadeOut', 300);
      }
    }
  }

  getCurrentLevel() {
    return this.props.levelMapStore.currentLevelForPack.get(this.packId)!;
  }

  showPopup() {
    this.setState({
      showPopup: true,
      popupAmount: this.playButton.calculatePrice(),
    });
    this.popup.animate('fadeIn', 300);
  }

  restoreLives() {
    const level = this.levels[
      this.props.levelMapStore.currentLevelForPack.get(this.packId)!
    ];

    this.props.userStore?.decrementCoins(this.playButton.calculatePrice());
    this.props.levelProgressStore?.unsetLevelCooldown(level.id, this.packId);
  }

  async popupConfirm() {
    const {userStore} = this.props;

    if (!checkIfEnoughCoins({userStore, amount: gameConfig.priceSolveLetter})) {
      this.props.navigation.navigate('AddCoins', {noCoins: true});
      return;
    }

    this.setState({showPopup: false});
    this.popup.animate('fadeOut', 300);
    await delayPromise(300);
    this.restoreLives();
  }

  popupCancel() {
    this.setState({showPopup: false});
    this.popup.animate('fadeOut', 300);
  }

  onMarkerPress(marker: any) {
    let idx = 0;

    this.levels.find((level: Level, index: number) => {
      const found = level.id === marker.id;
      if (found) {
        idx = index;
      }
      return level.id === marker.id;
    });

    this.props.levelMapStore.setCurrentLevelForPack(idx, this.pack);
  }

  render() {
    const currentLevelId = this.levels[
      this.props.levelMapStore.currentLevelForPack.get(this.packId)!
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
            onMarkerPress={this.onMarkerPress}
          />

          <MapboxLogo
            style={styles.mapboxLogo}
            show={this.props.userStore.mapTypeMode === MapTypeMode.Topo}
          />

          <Navbar
            style={styles.navBar}
            animatedRef={(ref: any) => {
              this.navbar = ref;
            }}
            totalCoins={this.props.userStore.coins}
            onBack={() => {
              this.props.navigation.goBack();
            }}
            onCoinTap={() => {
              this.props.navigation.navigate('AddCoins', {noCoins: false});
            }}
            pointerEvents={this.state.mapNavigationMode ? 'none' : 'auto'}
          />

          <MapTitleBanner
            style={styles.titleOverlay}
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

          <MapTypeButton
            style={styles.mapTypeButtonContainer}
            mapMode={this.props.userStore.mapTypeMode}
            onPress={() => {
              this.props.userStore.toggleMapTypeMode();
            }}
          />

          {levelProgress?.completed && !this.state.mapNavigationMode ? (
            <LevelCompletedBanner
              style={styles.levelCompletedBanner}
              type={this.levels[this.getCurrentLevel()].type}
              ref={(ref) => {
                this.levelCompletedBanner = ref;
              }}
              pointerEvents={this.state.mapNavigationMode ? 'none' : 'auto'}
              title={this.levels[this.getCurrentLevel()].title}
              stars={levelProgress?.stars!}
            />
          ) : !this.state.mapNavigationMode ? (
            <PlayButton
              style={styles.playButtonOverlay}
              ref={(ref) => {
                this.playButton = ref;
              }}
              pointerEvents={this.state.mapNavigationMode ? 'none' : 'auto'}
              navigation={this.props.navigation}
              levels={this.levels}
              currentLevel={this.getCurrentLevel()}
              packId={this.packId}
              restoreLives={this.showPopup}
            />
          ) : null}

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

          <MapboxCreditsText
            animatedRef={(ref: any) => {
              this.mapCreditsText = ref;
            }}
            style={styles.mapcreditsText}
            mode={this.props.userStore.mapTypeMode}
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

        <LoadingView
          ref={(ref: any) => {
            this.loadingView = ref;
          }}
          devMode={__DEV__}
          image={Images.mountain_bg}
        />

        <Popup
          title={strings('restoreLives')}
          pointerEvents={this.state.showPopup ? 'auto' : 'none'}
          animatedRef={(ref: any) => {
            this.popup = ref;
          }}
          mode={'buyLives'}
          amount={this.state.popupAmount}
          showCancelButton={true}
          onConfirm={this.popupConfirm}
          onCancel={this.popupCancel}
        />
      </View>
    );
  }
}

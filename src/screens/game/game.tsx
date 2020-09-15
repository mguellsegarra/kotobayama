import React, {Component} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {observer, inject} from 'mobx-react';

import {Level} from '@library/models/level';
import {Pack} from '@library/models/pack';

import {Colors} from '@res/R';
import {styles} from './game.style';

import NoNotchView from '@library/components/common/noNotchView';
import Navbar from '@library/components/game/navbar';
import Title from '@library/components/game/title';
import Photo from '@library/components/game/photo';
import PowerUpsBar from '@library/components/game/powerUpsBar';
import SolutionBar, {
  SolutionBarElement,
} from '@library/components/game/solutionBar';
import LettersBar, {
  LettersBarElement,
} from '@library/components/game/lettersBar';
import Popup from '@library/components/common/popup';
import {AvailableLetterType} from '@library/models/availableLetter';
import {SolutionLetterType} from '@library/models/solutionLetter';

import LivesIndicator from '@library/components/game/livesIndicator';

import LevelService from '@library/services/levelService';
import {getLevelProgress} from '@library/helpers/levelHelper';
import {
  handleAvailableLetterHasTapped,
  handleSolutionLetterHasTapped,
} from '@library/helpers/gameHelper';

import {
  handleOnAskFriendPress,
  handleOnDestroyLettersPress,
  handleOnSolveLetterPress,
} from '@library/helpers/powerupHelper';

import LevelProgressStore from '@library/mobx/levelProgressStore';
import UserStore from '@library/mobx/userStore';
import LevelMapStore from '@library/mobx/levelMapStore';
import {strings} from '@library/services/i18nService';

type Props = {
  navigation: any;
  route: any;
  levelProgressStore: LevelProgressStore;
  userStore: UserStore;
  levelMapStore: LevelMapStore;
};
type State = {
  showPopup: boolean;
};

@inject('levelProgressStore')
@inject('userStore')
@inject('levelMapStore')
@observer
export default class Game extends Component<Props, State> {
  level: Level;
  pack: Pack;
  currentLevel: number;
  totalLevels: number;

  solutionBar: SolutionBarElement | SolutionBar | null;
  lettersBar: LettersBarElement | LettersBar | null;
  livesIndicator: LivesIndicator | null;
  mapLayer: any;
  confirmPopup: any;

  state = {showPopup: false};

  constructor(props: Props) {
    super(props);
    this.solutionBar = null;
    this.lettersBar = null;
    this.livesIndicator = null;

    this.availableLetterHasTapped = this.availableLetterHasTapped.bind(this);
    this.solutionLetterHasTapped = this.solutionLetterHasTapped.bind(this);
    this.getLevelProgress = this.getLevelProgress.bind(this);
    this.onNoLives = this.onNoLives.bind(this);
    this.onLevelComplete = this.onLevelComplete.bind(this);
    this.onDestroyLettersPress = this.onDestroyLettersPress.bind(this);
    this.onSolveLetterPress = this.onSolveLetterPress.bind(this);
    this.onAskFriendPress = this.onAskFriendPress.bind(this);
    this.popupCancel = this.popupCancel.bind(this);
    this.popupConfirm = this.popupConfirm.bind(this);

    const {currentLevel, levels, packId} = this.props.route.params;
    this.level = levels[currentLevel];
    this.pack = LevelService.getPackWithId(packId);
    this.currentLevel = currentLevel;
    this.totalLevels = levels.length;
  }

  onLevelComplete() {
    const {level, pack} = this;

    this.props.navigation.navigate('LevelComplete', {
      level,
      pack,
    });
  }

  onNoLives() {
    const {level, pack} = this;

    this.props.navigation.navigate('NoLives', {
      level,
      pack,
    });
  }

  async availableLetterHasTapped(letter: AvailableLetterType) {
    const {
      solutionBar,
      lettersBar,
      level,
      pack,
      livesIndicator,
      onLevelComplete,
      onNoLives,
    } = this;
    const {levelProgressStore} = this.props;

    handleAvailableLetterHasTapped({
      letter,
      solutionBar,
      lettersBar,
      level,
      pack,
      levelProgressStore,
      livesIndicator,
      onLevelComplete,
      onNoLives,
    });
  }

  async solutionLetterHasTapped(letter: SolutionLetterType) {
    const {solutionBar, lettersBar} = this;

    handleSolutionLetterHasTapped({
      letter,
      solutionBar,
      lettersBar,
    });
  }

  getLevelProgress() {
    return getLevelProgress(
      this.props.levelProgressStore.levelsProgress,
      this.level.id,
      this.pack.id,
    ).levelProgress;
  }

  async onSolveLetterPress() {
    const {
      solutionBar,
      lettersBar,
      level,
      pack,
      livesIndicator,
      onLevelComplete,
      onNoLives,
    } = this;
    const {levelProgressStore, userStore} = this.props;

    // FIXME: TODO:
    this.showPopup();
    return;
    // FIXME: TODO:
    handleOnSolveLetterPress({
      solutionBar,
      lettersBar,
      level,
      pack,
      levelProgressStore,
      userStore,
      livesIndicator,
      onLevelComplete,
      onNoLives,
    });
  }

  async onDestroyLettersPress() {
    const {solutionBar, lettersBar} = this;
    const {userStore} = this.props;

    handleOnDestroyLettersPress({solutionBar, lettersBar, userStore});
  }

  async onAskFriendPress() {
    handleOnAskFriendPress();
  }

  showPopup() {
    this.setState({...this.state, showPopup: true});
    this.confirmPopup.animate('fadeIn', 300);
  }

  hidePopup() {
    this.setState({...this.state, showPopup: false});
    this.confirmPopup.animate('fadeOut', 300);
  }

  popupConfirm() {}

  popupCancel() {
    this.hidePopup();
  }

  render() {
    return (
      <LinearGradient
        colors={[Colors.purpleGradientStart, Colors.purpleGradientEnd]}
        style={styles.background}>
        <NoNotchView>
          <Navbar
            style={styles.navBar}
            onBackPress={this.props.navigation.goBack}
            onCoinsTap={() => {}}
            coins={this.props.userStore.coins}
            lives={
              this.props.levelProgressStore?.getCurrentLives(
                this.getLevelProgress()?.id!,
                this.pack.id,
              )!
            }
            livesIndicatorRef={(ref: any) => {
              this.livesIndicator = ref;
            }}
          />
          <Title
            style={styles.titleBar}
            title={this.pack?.title!}
            totalLevels={this.totalLevels}
            currentLevel={this.currentLevel}
          />
          <Photo style={styles.photoBar} level={this.level} />
          <SolutionBar
            ref={(ref) => {
              this.solutionBar = ref;
            }}
            onLetterPress={this.solutionLetterHasTapped}
            style={styles.solutionBar}
            word={this.level.word}
            level={this.level}
            pack={this.pack}
          />
          <PowerUpsBar
            style={styles.powerUpsBar}
            bombDisabled={false}
            onDestroyLettersPress={this.onDestroyLettersPress}
            onSolveLetterPress={this.onSolveLetterPress}
            onAskFriendPress={this.onAskFriendPress}
          />
          <LettersBar
            ref={(ref) => {
              this.lettersBar = ref;
            }}
            style={styles.lettersBar}
            word={this.level.word}
            availableLetterHasTapped={this.availableLetterHasTapped}
            level={this.level}
            pack={this.pack}
          />
        </NoNotchView>
        <Popup
          title={strings('usePowerup')}
          pointerEvents={this.state.showPopup ? 'auto' : 'none'}
          animatedRef={(ref: any) => {
            this.confirmPopup = ref;
          }}
          amount={500}
          showCancelButton
          onConfirm={this.popupConfirm}
          onCancel={this.popupCancel}
        />
      </LinearGradient>
    );
  }
}

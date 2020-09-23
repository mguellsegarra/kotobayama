import Share from 'react-native-share';
import delayPromise from '@library/utils/delayPromise';

const gameConfig = require('@assets/gameConfig');

import WordHelper from '@library/helpers/wordHelper';
import {checkResult} from '@library/helpers/gameHelper';

import {Level} from '@library/models/level';
import {Pack} from '@library/models/pack';
import {AvailableLetterState} from '@library/models/availableLetter';
import {SolutionLetterState} from '@library/models/solutionLetter';

import SolutionBar, {
  SolutionBarElement,
} from '@library/components/game/solutionBar';
import LettersBar, {
  LettersBarElement,
} from '@library/components/game/lettersBar';
import LivesIndicator from '@library/components/game/livesIndicator';

import LevelProgressStore from '@library/mobx/levelProgressStore';
import UserStore from '@library/mobx/userStore';

export const handleOnSolveLetterPress = async ({
  solutionBar,
  level,
  pack,
  levelProgressStore,
  userStore,
  onLevelComplete,
  livesIndicator,
  lettersBar,
  onNoLives,
}: {
  solutionBar: SolutionBarElement | SolutionBar | null;
  level: Level;
  pack: Pack;
  levelProgressStore: LevelProgressStore;
  userStore: UserStore;
  lettersBar: LettersBarElement | LettersBar | null;
  onLevelComplete: Function;
  onNoLives: Function;
  livesIndicator: LivesIndicator | null;
}) => {
  await solutionBar?.removeAllLetters();
  lettersBar?.restoreNonBoughtLetters();

  await delayPromise(50);

  const {
    randomLetter,
    availableLetterId,
    position,
  } = WordHelper.getRandomSolveLetter({
    word: level.word,
    boughtLetters: solutionBar?.getBoughtLetters(),
    getAvailableLetterWithChar: lettersBar?.getAvailableLetterWithChar,
  });

  await solutionBar?.addLetterAtPosition(
    randomLetter,
    availableLetterId,
    position,
    SolutionLetterState.Bought,
  );

  lettersBar?.zoomOutLetterWithId(availableLetterId);
  await delayPromise(100);
  lettersBar?.setLetterState(availableLetterId, AvailableLetterState.Bought);
  lettersBar?.updateStore();

  userStore.decrementCoins(gameConfig.priceSolveLetter);

  await checkResult({
    solutionBar,
    level,
    pack,
    levelProgressStore,
    onLevelComplete,
    livesIndicator,
    lettersBar,
    onNoLives,
  });
};

export const handleOnDestroyLettersPress = async ({
  solutionBar,
  lettersBar,
  userStore,
}: {
  solutionBar: SolutionBarElement | SolutionBar | null;
  lettersBar: LettersBarElement | LettersBar | null;
  userStore: UserStore;
}) => {
  await solutionBar?.removeAllLetters();
  await lettersBar?.restoreNonBoughtLetters();

  await delayPromise(50);

  lettersBar?.powerUpDestroyLetters();

  userStore.decrementCoins(gameConfig.priceDestroyLetters);
};

export const handleOnAskFriendPress = () => {
  Share.open({
    // url: this.snapshot,
    message: 'Tegami: Saps quina muntanya és?',
    filename: 'guessMountain',
  });
};

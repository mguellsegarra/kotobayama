import delayPromise from '@library/utils/delayPromise';

import {Level} from '@library/models/level';
import {Pack} from '@library/models/pack';
import SolutionBar, {
  SolutionBarElement,
} from '@library/components/game/solutionBar';
import LettersBar, {
  LettersBarElement,
} from '@library/components/game/lettersBar';
import LevelProgressStore from '@library/mobx/levelProgressStore';
import LivesIndicator from '@library/components/game/livesIndicator';
import {
  AvailableLetterType,
  AvailableLetterState,
} from '@library/models/availableLetter';
import {
  SolutionLetterType,
  SolutionLetterState,
} from '@library/models/solutionLetter';

export const checkResult = async ({
  solutionBar,
  level,
  pack,
  levelProgressStore,
  onLevelComplete,
  livesIndicator,
  lettersBar,
  onNoLives,
}: {
  solutionBar: SolutionBarElement | SolutionBar | null;
  level: Level;
  pack: Pack;
  levelProgressStore: LevelProgressStore;
  lettersBar: LettersBarElement | LettersBar | null;
  onLevelComplete: Function;
  onNoLives: Function;
  livesIndicator: LivesIndicator | null;
}) => {
  if (!solutionBar?.allLettersAreFull()) {
    return;
  }

  if (solutionBar?.isWordCorrect()) {
    await correct({
      level,
      solutionBar,
      pack,
      levelProgressStore,
      onLevelComplete,
    });
  } else {
    await incorrect({
      solutionBar,
      level,
      pack,
      levelProgressStore,
      livesIndicator,
      lettersBar,
      onNoLives,
    });
  }
};

const correct = async ({
  solutionBar,
  level,
  pack,
  levelProgressStore,
  onLevelComplete,
}: {
  solutionBar: SolutionBarElement | SolutionBar | null;
  level: Level;
  pack: Pack;
  levelProgressStore: LevelProgressStore;
  onLevelComplete: Function;
}) => {
  solutionBar?.animateLetters('flash', 1000);
  await delayPromise(1000);

  levelProgressStore.setLevelCompleted(level.id, pack.id);
  levelProgressStore.calculateLevelStars(level.id, pack.id);

  onLevelComplete();
};

const incorrect = async ({
  solutionBar,
  level,
  pack,
  levelProgressStore,
  livesIndicator,
  lettersBar,
  onNoLives,
}: {
  solutionBar: SolutionBarElement | SolutionBar | null;
  level: Level;
  pack: Pack;
  levelProgressStore: LevelProgressStore;
  livesIndicator: LivesIndicator | null;
  lettersBar: LettersBarElement | LettersBar | null;
  onNoLives: Function;
}) => {
  solutionBar?.animateLetters('shake', 1000);

  levelProgressStore.decrementLivesForLevel(level.id, pack.id);
  levelProgressStore.incrementInvestedLivesForLevel(level.id, pack.id);

  livesIndicator?.animate('tada', 1000);

  await delayPromise(500);

  if (levelProgressStore?.getCurrentLives(level.id, pack.id) === 0) {
    levelProgressStore.setLevelCooldown(level.id, pack.id);
    onNoLives();
  }
};

export const handleAvailableLetterHasTapped = async ({
  letter,
  solutionBar,
  level,
  pack,
  levelProgressStore,
  onLevelComplete,
  livesIndicator,
  lettersBar,
  onNoLives,
}: {
  letter: AvailableLetterType;
  solutionBar: SolutionBarElement | SolutionBar | null;
  level: Level;
  pack: Pack;
  levelProgressStore: LevelProgressStore;
  lettersBar: LettersBarElement | LettersBar | null;
  onLevelComplete: Function;
  onNoLives: Function;
  livesIndicator: LivesIndicator | null;
}) => {
  if (solutionBar?.allLettersAreFull()) {
    return;
  }

  lettersBar?.zoomOutLetterWithId(letter.id);
  await delayPromise(90);
  lettersBar?.setLetterState(letter.id, AvailableLetterState.Selected);

  lettersBar?.updateStore();

  await solutionBar?.addLetter(letter.character, letter.id);
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

export const handleSolutionLetterHasTapped = async ({
  letter,
  solutionBar,
  lettersBar,
}: {
  letter: SolutionLetterType;
  solutionBar: SolutionBarElement | SolutionBar | null;
  lettersBar: LettersBarElement | LettersBar | null;
}) => {
  if (letter.letterState === SolutionLetterState.Filled) {
    await solutionBar?.removeLetterWithId(letter.id);
    solutionBar?.updateStore();

    lettersBar?.restoreLetterWithId(letter.availableLetterId!);

    lettersBar?.updateStore();
  }
};

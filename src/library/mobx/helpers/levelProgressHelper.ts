import {LevelProgress, LevelProgressInitialState} from '@library/models/level';
import {Pack} from '@library/models/pack';
import {toJS} from 'mobx';

export const getLevelProgress = (
  levelsProgress: LevelProgress[],
  levelId: string,
  packId: string,
) => {
  let lvlIdx = 0;
  let found = false;

  let levelProgress = levelsProgress.find((lvlProgress, idx) => {
    let foundLevel = levelId === lvlProgress.id;
    let foundPack = lvlProgress.packId === packId;
    found = foundLevel && foundPack;

    if (found) {
      lvlIdx = idx;
    }
    return found;
  });

  if (found) {
    return {levelProgress, lvlIdx};
  } else {
    levelProgress = Object.assign(
      {
        id: levelId,
        packId: packId,
      },
      LevelProgressInitialState,
    );
    return {levelProgress, idx: levelsProgress.length};
  }
};

export const getLevelsForPack = (
  levelsProgress: LevelProgress[],
  packId: string,
) => {
  return levelsProgress.filter((lvlProgress) => {
    return lvlProgress.packId === packId;
  });
};

export const getFirstIncompleteLevelIdForPack = (
  levelsProgress: LevelProgress[],
  pack: Pack,
) => {
  let firstIncompleteLevel;
  let found = false;
  let lvlIdx = 0;

  pack.levels.forEach((lvlId, idx) => {
    if (found) {
      return;
    }

    const level = toJS(levelsProgress).find((lvlProgress) => {
      return lvlProgress.id === lvlId && lvlProgress.completed;
    });

    if (!level) {
      firstIncompleteLevel = lvlId;
      lvlIdx = idx;
      found = true;
    }
  });
  return {idx: lvlIdx, levelId: firstIncompleteLevel};
};

export const areAllLevelsCompletedForPack = (
  levelsProgress: LevelProgress[],
  pack: Pack,
) => {
  const completedLevels = levelsProgress.filter((lvlProgress) => {
    return lvlProgress.packId === pack.id && lvlProgress.completed;
  });
  return completedLevels.length === pack.levels.length;
};

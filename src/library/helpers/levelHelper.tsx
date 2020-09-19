import {
  Level,
  LevelProgress,
  LevelProgressInitialState,
} from '@library/models/level';
import {Pack} from '@library/models/pack';
import {toJS} from 'mobx';

export const getFirstIncompleteLevel = ({
  levels,
  levelsProgress,
  pack,
}: {
  levels: Array<Level>;
  levelsProgress: LevelProgress[];
  pack: Pack;
}) => {
  let levelIdx: number = 0;

  const {levelId} = getFirstIncompleteLevelIdForPack({
    levelsProgress: levelsProgress,
    pack: pack,
  });

  const level = levels.find((lvl, lvlIdx) => {
    const found = lvl.id === levelId;

    if (found) {
      levelIdx = lvlIdx;
    }
    return found;
  });

  return {idx: levelIdx, level};
};

export const getFirstIncompleteLevelIdForPack = ({
  levelsProgress,
  pack,
}: {
  levelsProgress: LevelProgress[];
  pack: Pack;
}) => {
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

export const getNextIncompleteLevelIdForPack = ({
  currentLevelIdx,
  levelsProgress,
  pack,
}: {
  currentLevelIdx: number;
  levelsProgress: LevelProgress[];
  pack: Pack;
}) => {
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

    if (!level && idx > currentLevelIdx) {
      firstIncompleteLevel = lvlId;
      lvlIdx = idx;
      found = true;
    }
  });

  if (lvlIdx === 0) {
    return getFirstIncompleteLevelIdForPack({levelsProgress, pack});
  }

  return {idx: lvlIdx, levelId: firstIncompleteLevel};
};

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

export const areAllLevelsCompletedForPack = (
  levelsProgress: LevelProgress[],
  pack: Pack,
) => {
  const completedLevels = levelsProgress.filter((lvlProgress) => {
    return lvlProgress.packId === pack.id && lvlProgress.completed;
  });
  return completedLevels.length === pack.levels.length;
};

export const getProgressForPack = (
  levelsProgress: LevelProgress[],
  pack: Pack,
) => {
  let totalLevels = pack.levels.length;

  const completedLevels = getLevelsForPack(levelsProgress, pack.id).filter(
    (levelProgress: LevelProgress) => {
      return levelProgress.completed;
    },
  ).length;

  return (completedLevels / totalLevels) * 100;
};

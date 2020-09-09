import {LevelProgress, LevelProgressInitialState} from '@library/models/level';

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

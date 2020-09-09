import {observable, action} from 'mobx';
import {LevelProgress} from '@library/models/level';
import {toJS} from 'mobx';

export const LevelProgressInitialState = {
  lives: 3,
  completed: false,
  stars: 3,
  emptyLivesTimestamp: '',
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
    const test = toJS(levelsProgress);

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

export default class LevelProgressStore {
  @observable public levelsProgress: LevelProgress[] = [];

  constructor() {
    this.levelsProgress = [];
  }

  @action
  decrementLivesForLevel = (levelId: string, packId: string) => {
    const {idx, levelProgress} = getLevelProgress(
      this.levelsProgress,
      levelId,
      packId,
    );

    levelProgress!.lives--;
    this.levelsProgress[idx as number] = levelProgress!;
  };
}

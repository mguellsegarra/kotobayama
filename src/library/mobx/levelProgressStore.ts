import {observable, computed, action} from 'mobx';
import {LevelProgress} from '@library/models/level';
import {getLevelProgress} from './helpers/levelProgressHelper';

export default class LevelProgressStore {
  @observable public levelsProgress: LevelProgress[] = [];

  constructor() {
    this.levelsProgress = [];
  }

  @action
  setLevelCompleted = (levelId: string, packId: string) => {
    const {idx, levelProgress} = getLevelProgress(
      this.levelsProgress,
      levelId,
      packId,
    );

    levelProgress!.completed = true;
    this.levelsProgress[idx as number] = levelProgress!;
  };

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

  @action
  fillLevelsProgress = (content: LevelProgress[]) => {
    this.levelsProgress = content;
  };
}

export * from './helpers/levelProgressHelper';

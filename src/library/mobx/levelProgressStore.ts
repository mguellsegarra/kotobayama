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
  setLevelStars = (levelId: string, packId: string, stars: number) => {
    const {idx, levelProgress} = getLevelProgress(
      this.levelsProgress,
      levelId,
      packId,
    );

    levelProgress!.stars = stars;
    this.levelsProgress[idx as number] = levelProgress!;
  };

  @action
  calculateLevelStars = (levelId: string, packId: string) => {
    const {idx, levelProgress} = getLevelProgress(
      this.levelsProgress,
      levelId,
      packId,
    );

    if (levelProgress!.investedLives === 0) {
      levelProgress!.stars = 3;
    } else if (levelProgress!.investedLives === 1) {
      levelProgress!.stars = 2;
    } else {
      levelProgress!.stars = 1;
    }

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
  incrementInvestedLivesForLevel = (levelId: string, packId: string) => {
    const {idx, levelProgress} = getLevelProgress(
      this.levelsProgress,
      levelId,
      packId,
    );

    levelProgress!.investedLives++;
    this.levelsProgress[idx as number] = levelProgress!;
  };

  @action
  fillLevelsProgress = (content: LevelProgress[]) => {
    this.levelsProgress = content;
  };
}

export * from './helpers/levelProgressHelper';

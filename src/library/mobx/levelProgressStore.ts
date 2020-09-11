import {observable, computed, action} from 'mobx';
import {computedFn} from 'mobx-utils';

import {LevelProgress} from '@library/models/level';
import {getLevelProgress} from './helpers/levelProgressHelper';
import moment from 'moment';
const gameConfig = require('@assets/gameConfig');

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
    this.restoreLevelCooldownAndLivesIfNeededForLevel(levelProgress!, idx!);

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
    this.restoreLevelCooldownAndLivesIfNeededForLevel(levelProgress!, idx!);

    levelProgress!.investedLives++;
    this.levelsProgress[idx as number] = levelProgress!;
  };

  @action
  setLevelCooldown = (levelId: string, packId: string) => {
    const {idx, levelProgress} = getLevelProgress(
      this.levelsProgress,
      levelId,
      packId,
    );

    levelProgress!.emptyLivesTimestamp = moment().add(gameConfig.coolDownMinutes.toString(), 'minutes').unix();

    this.levelsProgress[idx as number] = levelProgress!;
  };

  getCurrentLives = computedFn(function getCurrentLives(
    this: LevelProgressStore,
    levelId: string,
    packId: string,
  ) {
    const {levelProgress} = getLevelProgress(
      this.levelsProgress,
      levelId,
      packId,
    );

    if (levelProgress!.emptyLivesTimestamp === null) {
      return levelProgress!.lives;
    } else {
      if (levelProgress!.emptyLivesTimestamp <= moment().unix()) {
        return 3;
      } else {
        return 0;
      }
    }
  });

  @action
  restoreLevelCooldownAndLivesIfNeeded = (levelId: string, packId: string) => {
    const {idx, levelProgress} = getLevelProgress(
      this.levelsProgress,
      levelId,
      packId,
    );

    this.restoreLevelCooldownAndLivesIfNeededForLevel(levelProgress!, idx!);
  };

  restoreLevelCooldownAndLivesIfNeededForLevel = (levelProgress: LevelProgress, idx: number) => {
    if (levelProgress!.emptyLivesTimestamp === null) {
      return;
    }

    if (levelProgress!.emptyLivesTimestamp <= moment().unix()) {
      levelProgress!.emptyLivesTimestamp = null;
      levelProgress!.lives = 3;
      this.levelsProgress[idx as number] = levelProgress!;
    }
  } 

  @action
  fillLevelsProgress = (content: LevelProgress[]) => {
    this.levelsProgress = content;
  };
}

export * from './helpers/levelProgressHelper';

import {observable, action} from 'mobx';
import {computedFn} from 'mobx-utils';

import {LevelProgress} from '@library/models/level';
import {getLevelProgress} from '@library/helpers/levelHelper';
import moment from 'moment';
import SyncService from '@library/services/syncService';
import {AvailableLetterType} from '@library/models/availableLetter';
import {SolutionLetterType} from '@library/models/solutionLetter';

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
    SyncService.persistLevelsProgress(this);
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
    SyncService.persistLevelsProgress(this);
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
    SyncService.persistLevelsProgress(this);
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
    SyncService.persistLevelsProgress(this);
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
    SyncService.persistLevelsProgress(this);
  };

  @action
  setLevelCooldown = (levelId: string, packId: string) => {
    const {idx, levelProgress} = getLevelProgress(
      this.levelsProgress,
      levelId,
      packId,
    );

    levelProgress!.emptyLivesTimestamp = moment()
      .add(gameConfig.coolDownMinutes.toString(), 'minutes')
      .unix();

    this.levelsProgress[idx as number] = levelProgress!;
    SyncService.persistLevelsProgress(this);
  };

  @action
  unsetLevelCooldown = (levelId: string, packId: string) => {
    const {idx, levelProgress} = getLevelProgress(
      this.levelsProgress,
      levelId,
      packId,
    );

    levelProgress!.emptyLivesTimestamp = null;
    levelProgress!.lives = 3;

    this.levelsProgress[idx as number] = levelProgress!;
    SyncService.persistLevelsProgress(this);
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
    SyncService.persistLevelsProgress(this);
  };

  @action
  setAvailableLetters = (
    levelId: string,
    packId: string,
    letters: AvailableLetterType[],
  ) => {
    const {idx, levelProgress} = getLevelProgress(
      this.levelsProgress,
      levelId,
      packId,
    );

    levelProgress!.availableLetters = letters;

    this.levelsProgress[idx as number] = levelProgress!;
    SyncService.persistLevelsProgress(this);
  };

  @action
  setSolutionLetters = (
    levelId: string,
    packId: string,
    letters: Map<string, SolutionLetterType>,
  ) => {
    const {idx, levelProgress} = getLevelProgress(
      this.levelsProgress,
      levelId,
      packId,
    );

    levelProgress!.solutionLetters = letters;

    this.levelsProgress[idx as number] = levelProgress!;
    SyncService.persistLevelsProgress(this);
  };

  restoreLevelCooldownAndLivesIfNeededForLevel = (
    levelProgress: LevelProgress,
    idx: number,
  ) => {
    if (levelProgress!.emptyLivesTimestamp === null) {
      return;
    }

    if (levelProgress!.emptyLivesTimestamp <= moment().unix()) {
      levelProgress!.emptyLivesTimestamp = null;
      levelProgress!.lives = 3;
      this.levelsProgress[idx as number] = levelProgress!;
    }
  };

  @action
  fillLevelsProgress = (content: LevelProgress[]) => {
    this.levelsProgress = content;
  };
}

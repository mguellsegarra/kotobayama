import {observable, action, IObservableArray} from 'mobx';
import {Level} from '@library/models/level';
import LevelService from '@library/services/levelService';

export default class LevelStore {
  @observable public levels: Level[] = [];

  constructor() {
    this.levels = [...LevelService.getLevels()];
  }

  @action
  decrementLivesForLevel = (levelId: any) => {
    let lvlIdx = 0;

    const level = this.levels.find((lvl, idx) => {
      const found = levelId === lvl.id;
      if (found) lvlIdx = idx;
      return found;
    });

    level!.lives--;
    this.levels[lvlIdx] = level!;
  };
}

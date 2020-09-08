import {observable, action, IObservableArray} from 'mobx';
import {LevelProgress, Level} from '@library/models/level';
import LevelService from '@library/services/levelService';

export default class LevelProgressStore {
  @observable public levelsProgress: LevelProgress[] = [];

  // constructor() {
  // this.levelsProgress = [
  //   ...LevelService.levels.map((level: Level) => {
  //     return {
  //       id: level.id,
  //       lives: 3,
  //       completed: false,
  //       stars: 0,
  //       emptyLivesTimestamp: '',
  //     };
  //   }),
  // ];
  // }

  @action
  decrementLivesForLevel = (levelId: any) => {
    let lvlIdx = 0;

    const level = this.levelsProgress.find((lvl, idx) => {
      const found = levelId === lvl.id;
      if (found) lvlIdx = idx;
      return found;
    });

    level!.lives--;
    this.levelsProgress[lvlIdx] = level!;
  };
}

import {observable, action} from 'mobx';
import {Pack} from '@library/models/pack';
import {getNextIncompleteLevelIdForPack} from '@library/helpers/levelHelper';
import {LevelProgress} from '@library/models/level';

export default class LevelMapStore {
  @observable public currentLevelForPack: Map<string, number>;

  constructor() {
    this.currentLevelForPack = new Map<string, number>();
  }

  @action
  setCurrentLevelForPack = (currentLevel: number, pack: Pack) => {
    this.currentLevelForPack.set(pack.id, currentLevel);
  };

  @action
  nextLevelForPack = (pack: Pack) => {
    let nextLevel: number;
    if (this.currentLevelForPack.get(pack.id) === pack.levels.length! - 1) {
      nextLevel = 0;
    } else {
      const currentLevel = this.currentLevelForPack.get(pack.id);
      nextLevel = currentLevel! + 1;
    }
    this.currentLevelForPack.set(pack.id, nextLevel);
  };

  @action
  prevLevelForPack = (pack: Pack) => {
    let nextLevel: number;
    if (this.currentLevelForPack.get(pack.id) === 0) {
      nextLevel = pack.levels.length! - 1;
    } else {
      const currentLevel = this.currentLevelForPack.get(pack.id);
      nextLevel = currentLevel! - 1;
    }
    this.currentLevelForPack.set(pack.id, nextLevel);
  };

  @action
  nextIncompleteLevelForPack = (
    levelsProgress: LevelProgress[],
    pack: Pack,
  ) => {
    const {idx} = getNextIncompleteLevelIdForPack({
      currentLevelIdx: this.currentLevelForPack.get(pack.id),
      levelsProgress,
      pack,
    });
    this.setCurrentLevelForPack(idx, pack);
  };
}

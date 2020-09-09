import {observable, action} from 'mobx';
import {Pack} from '@library/models/pack';
import {getFirstIncompleteLevelIdForPack} from './levelProgressStore';
import {LevelProgress} from '@library/models/level';

export type CurrentLevelForPackType = {
  [index: string]: number; // <packId, currentLevel>
};

export default class LevelMapStore {
  @observable public currentLevelForPack: CurrentLevelForPackType;

  constructor() {
    this.currentLevelForPack = {};
  }

  @action
  setCurrentLevelForPack = (currentLevel: number, pack: Pack) => {
    this.currentLevelForPack[pack.id] = currentLevel;
  };

  @action
  nextLevelForPack = (pack: Pack) => {
    let nextLevel: number;
    if (this.currentLevelForPack[pack.id] === pack.levels.length! - 1) {
      nextLevel = 0;
    } else {
      nextLevel = this.currentLevelForPack[pack.id] + 1;
    }
    this.currentLevelForPack[pack.id] = nextLevel;
  };

  @action
  prevLevelForPack = (pack: Pack) => {
    let nextLevel: number;
    if (this.currentLevelForPack[pack.id] === 0) {
      nextLevel = pack.levels.length! - 1;
    } else {
      nextLevel = this.currentLevelForPack[pack.id] - 1;
    }
    this.currentLevelForPack[pack.id] = nextLevel;
  };

  @action
  nextIncompleteLevelForPack = (levelsProgress: LevelProgress[], pack: Pack) => {
    const {idx} = getFirstIncompleteLevelIdForPack(levelsProgress, pack);
    this.setCurrentLevelForPack(idx, pack);
  };
}

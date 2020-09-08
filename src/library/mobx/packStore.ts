import {observable, action, IObservableArray} from 'mobx';
import {Pack} from '@library/models/pack';
import LevelService from '@library/services/levelService';

export default class LevelStore {
  @observable public packs: Pack[] = [];

  constructor() {
    this.packs = [...LevelService.getPacks()];
  }

  @action
  updatePacks = (packs: any) => {
    this.packs = packs;
  };
}

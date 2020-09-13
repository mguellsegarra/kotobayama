import {observable, action, autorun} from 'mobx';
import SyncService from '@library/services/syncService';
import {MapTypeMode} from '@library/models/mapTypeMode';
const gameConfig = require('@assets/gameConfig');
import {LevelProgress} from '@library/models/level';

export default class UserStore {
  @observable public coins: number = gameConfig.initialCoins;
  @observable public mapTypeMode: MapTypeMode = MapTypeMode.Topo;

  @action
  decrementCoins = (amount: number) => {
    this.coins -= amount;
    SyncService.persistUser(this);
  };

  @action
  incrementCoins = (amount: number) => {
    this.coins += amount;
    SyncService.persistUser(this);
  };

  @action
  setMapTypeMode = (mapTypeMode: MapTypeMode) => {
    this.mapTypeMode = mapTypeMode;
  };

  @action
  setCoins = (coins: number) => {
    this.coins = coins;
  };

  @action
  toggleMapTypeMode = () => {
    if (this.mapTypeMode === MapTypeMode.Sat) {
      this.setMapTypeMode(MapTypeMode.Topo);
    } else {
      this.setMapTypeMode(MapTypeMode.Sat);
    }
    SyncService.persistUser(this);
  };

  getCoinsToAddForLives = (levelProgress: LevelProgress) => {
    let coins = (3 - levelProgress?.investedLives!) * gameConfig.coinsPerLive;
    if (coins <= 0) {
      coins = gameConfig.minCoinsLevelWin;
    }
    return coins;
  };
}

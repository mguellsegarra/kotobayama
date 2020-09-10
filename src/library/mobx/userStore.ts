import {observable, action, autorun} from 'mobx';
import SyncService from '@library/services/syncService';
import {MapTypeMode} from '@library/models/mapTypeMode';

export default class UserStore {
  @observable public coins: number = 200;
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
}

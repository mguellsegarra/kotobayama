import {observable, action, autorun} from 'mobx';
import SyncService from '@library/services/syncService';

export enum MapStyleMode {
  Sat = 'sat',
  Topo = 'topo',
}

export default class UserStore {
  @observable public coins: number = 200;
  @observable public mapStyleMode: MapStyleMode = MapStyleMode.Topo;

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
  setMapStyleMode = (mapStyleMode: MapStyleMode) => {
    this.mapStyleMode = mapStyleMode;
  };

  @action
  setCoins = (coins: number) => {
    this.coins = coins;
  };

  @action
  toggleMapStyleMode = () => {
    if (this.mapStyleMode === MapStyleMode.Sat) {
      this.setMapStyleMode(MapStyleMode.Topo);
    } else {
      this.setMapStyleMode(MapStyleMode.Sat);
    }
    SyncService.persistUser(this);
  };
}

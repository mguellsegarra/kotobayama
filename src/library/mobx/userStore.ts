import {observable, action} from 'mobx';
import {MapStyleMode} from '@library/components/map/mapStyleButton';

export default class UserStore {
  @observable public coins: number = 200;
  @observable public mapStyleMode: MapStyleMode = MapStyleMode.Sat;

  @action
  decrementCoins = (amount: number) => {
    this.coins -= amount;
  };

  @action
  incrementCoins = (amount: number) => {
    this.coins += amount;
  };

  @action
  setMapStyleMode = (mapStyleMode: MapStyleMode) => {
    this.mapStyleMode = mapStyleMode;
  };

  @action
  toggleMapStyleMode = () => {
    if (this.mapStyleMode === MapStyleMode.Sat) {
      this.setMapStyleMode(MapStyleMode.Topo);
    } else {
      this.setMapStyleMode(MapStyleMode.Sat);
    }
  };
}

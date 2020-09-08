import {observable, action} from 'mobx';

export default class CoinsStore {
  @observable public coins: number = 200;

  @action
  decrementCoins = (amount: number) => {
    this.coins -= amount;
  };

  @action
  incrementCoins = (amount: number) => {
    this.coins += amount;
  };
}

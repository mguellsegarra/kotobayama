import LevelProgressStore from './levelProgressStore';
import CoinStore from './coinsStore';

class StoreRoot {
  public levelProgressStore = new LevelProgressStore();
  public coinStore = new CoinStore();
}

export default new StoreRoot();

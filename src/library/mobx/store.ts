import LevelProgressStore from './levelProgressStore';
import CoinStore from './coinsStore';
import LevelMapStore from './levelMapStore';

class StoreRoot {
  public levelProgressStore = new LevelProgressStore();
  public coinStore = new CoinStore();
  public levelMapStore = new LevelMapStore();
}

export default new StoreRoot();

import LevelStore from './levelStore';
import PackStore from './packStore';
import CoinStore from './coinsStore';

class StoreRoot {
  public levelStore = new LevelStore();
  public packStore = new PackStore();
  public coinStore = new CoinStore();
}

export default new StoreRoot();

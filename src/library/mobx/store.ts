import LevelProgressStore from './levelProgressStore';
import UserStore from './userStore';
import LevelMapStore from './levelMapStore';

class StoreRoot {
  public levelProgressStore = new LevelProgressStore();
  public userStore = new UserStore();
  public levelMapStore = new LevelMapStore();
}

export default new StoreRoot();

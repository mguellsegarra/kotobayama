import LevelStore from "./levelStore";

class StoreRoot {
  public levelStore = new LevelStore();
}

export default new StoreRoot();

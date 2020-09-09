import {LevelProgress, LevelProgressInitialState} from '@library/models/level';
import LevelProgressStore from '@library/mobx/levelProgressStore';

type SyncServiceType = {
  hydrateLevelsProgress: Function;
};

const SyncService: SyncServiceType = {
  hydrateLevelsProgress: (store: LevelProgressStore) => {
    return new Promise((resolve) => {
      store.fillLevelsProgress([
        {
          id: '10001',
          packId: '1',
          lives: 0,
          completed: false,
          stars: 3,
          emptyLivesTimestamp: '',
        },
      ]);
      resolve();
    });
  },
};

export default SyncService;

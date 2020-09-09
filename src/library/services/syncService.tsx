import {LevelProgress, LevelProgressInitialState} from '@library/models/level';
import LevelProgressStore from '@library/mobx/levelProgressStore';
import StorageService from '@library/services/storageService';
import {toJS} from 'mobx';

type SyncServiceType = {
  hydrateLevelsProgress: Function;
  persistLevelsProgress: Function;
};

const SyncService: SyncServiceType = {
  hydrateLevelsProgress: (store: LevelProgressStore) => {
    return StorageService.read({key: 'levelProgress'})
      .then((parsedObject: any) => {
        store.fillLevelsProgress(parsedObject);
        return Promise.resolve();
      })
      .catch((err: any) => {
        if (err === 'Not found') {
          // New file will be created.
          return Promise.resolve();
        } else {
          return Promise.reject(err);
        }
      });
  },
  persistLevelsProgress: (store: LevelProgressStore) => {
    return StorageService.write({
      key: 'levelProgress',
      object: toJS(store.levelsProgress),
    });
  },
};

export default SyncService;

import LevelProgressStore from '@library/mobx/levelProgressStore';
import UserStore from '@library/mobx/userStore';
import StorageService from '@library/services/storageService';
import {toJS} from 'mobx';

import RNFetchBlob from 'rn-fetch-blob';
import {LevelProgress} from '@library/models/level';
// RNFetchBlob.fetch(
//   'GET',
//   'https://tegami-mountains-content.s3-eu-west-1.amazonaws.com/levels.json',
// )
//   .progress({count: 5}, (received, total) => {
//     const progress = (received / total) * 100;
//     this.setState({...this.state, downloadProgress: progress});
//   })
//   .then((res) => {
//     let status = res.info().status;
//     if (status == 200) {
//       let json = res.json();
//       LevelService.setLevelSource(json);
//       setTimeout(() => {
//         this.props.navigation.navigate('LevelMap');
//       }, 2000);
//     }
//   })
//   .catch((e) => {
//     console.log(e);
//   });

type SyncServiceType = {
  hydrate: Function;
  hydrateLevelsProgress: Function;
  persistLevelsProgress: Function;
  hydrateUser: Function;
  persistUser: Function;
};

const SyncService: SyncServiceType = {
  hydrate: (
    progressStore: LevelProgressStore,
    userStore: UserStore,
    progress: Function,
  ) => {
    return SyncService.hydrateLevelsProgress(
      progressStore,
      (levelsProgress: number) => {
        progress(levelsProgress / 2);
      },
    ).then(() => {
      return SyncService.hydrateUser(userStore, (userProgress: number) => {
        progress(50 + userProgress / 2);
      });
    });
  },
  hydrateLevelsProgress: (store: LevelProgressStore, progress: Function) => {
    progress(0);
    return StorageService.read({key: 'levelProgress'})
      .then((parsedObject: any) => {
        parsedObject = parsedObject.map((element: LevelProgress) => {
          if (element.solutionLetters) {
            element.solutionLetters = new Map(
              Object.entries(element.solutionLetters),
            );
          }
          return element;
        });
        progress(70);
        store.fillLevelsProgress(parsedObject);
        progress(100);
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
  hydrateUser: (store: UserStore, progress: Function) => {
    progress(0);
    return StorageService.read({key: 'user'})
      .then((parsedObject: any) => {
        progress(70);
        store.setCoins(parsedObject.coins);
        store.setMapTypeMode(parsedObject.mapTypeMode);
        progress(100);
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
  persistUser: (store: UserStore) => {
    const payload = {
      coins: store.coins,
      mapTypeMode: store.mapTypeMode,
    };

    return StorageService.write({
      key: 'user',
      object: payload,
    });
  },
};

export default SyncService;

import {LevelProgress, LevelProgressInitialState} from '@library/models/level';
import LevelProgressStore from '@library/mobx/levelProgressStore';
import StorageService from '@library/services/storageService';
import {toJS} from 'mobx';
import RNFetchBlob from 'rn-fetch-blob';
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
  hydrateLevelsProgress: Function;
  persistLevelsProgress: Function;
};

const SyncService: SyncServiceType = {
  hydrateLevelsProgress: (store: LevelProgressStore, progress: Function) => {
    progress(0);
    return StorageService.read({key: 'levelProgress'})
      .then((parsedObject: any) => {
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
};

export default SyncService;

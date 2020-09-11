const CryptoJS = require('crypto-js');
import {getUniqueId} from 'react-native-device-info';
import AsyncStorage from '@react-native-community/async-storage';

type StorageServiceType = {
  write: Function;
  read: Function;
};

type StorageServiceReadPayload = {
  key: string;
};

type StorageServiceWritePayload = {
  key: string;
  object: any;
};

const StorageService: StorageServiceType = {
  read: async (payload: StorageServiceReadPayload) => {
    const {key} = payload;

    return AsyncStorage.getItem('@' + key).then((value) => {
      if (value !== null) {
        const bytes = CryptoJS.AES.decrypt(value, getUniqueId());
        const plaintext = bytes.toString(CryptoJS.enc.Utf8);
        if (plaintext === "") {
          return Promise.reject('Not found');
        }
        const parsed = JSON.parse(plaintext);
        return Promise.resolve(parsed);
      } else {
        return Promise.reject('Not found');
      }
    });
  },
  write: async (payload: StorageServiceWritePayload) => {
    const {key, object} = payload;

    const serialized: string = JSON.stringify(object);
    const encrypted: string = CryptoJS.AES.encrypt(
      serialized,
      getUniqueId(),
    ).toString();

    return AsyncStorage.setItem('@' + key, encrypted);
  },
};

export default StorageService;

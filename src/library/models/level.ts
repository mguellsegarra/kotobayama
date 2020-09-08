import {LatLng} from 'react-native-maps';

export type LevelSource = {
  id: string;
  word: string;
  packId: number;
  latlon: string;
};

export type Level = {
  id: string;
  word: string;
  packId: string;
  latlon: LatLng;
};

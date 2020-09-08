import {LatLng} from 'react-native-maps';

export type LevelSource = {
  id: string;
  word: string;
  latlon: string;
};

export type Level = {
  id: string;
  word: string;
  latlon: LatLng;
};

export type LevelProgress = {
  id: string;
  packId: string;
  lives: number;
  completed: boolean;
  stars: number;
  emptyLivesTimestamp: string;
};

import {LatLng} from 'react-native-maps';

export type LevelSource = {
  id: string;
  word: string;
  title: string;
  latlon: string;
  sourcePhoto: string;
  wikipediaExcerpt: string;
  wikipediaLink: string;
};

export type Level = {
  id: string;
  word: string;
  title: string;
  latlon: LatLng;
  sourcePhoto: string;
  wikipediaExcerpt: string;
  wikipediaLink: string;
};

export type LevelProgress = {
  id: string;
  packId: string | null;
  lives: number;
  completed: boolean;
  stars: number;
  investedLives: number;
  emptyLivesTimestamp: number | null;
};

export const LevelProgressInitialState = {
  lives: 3,
  completed: false,
  stars: 0,
  investedLives: 0,
  emptyLivesTimestamp: null,
};

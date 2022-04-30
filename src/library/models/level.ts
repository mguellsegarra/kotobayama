import {LatLng} from 'react-native-maps';
import {AvailableLetterType} from '@library/models/availableLetter';
import {SolutionLetterType} from '@library/models/solutionLetter';

export type LevelSource = {
  id: string;
  word: string;
  title: string;
  latlon: string;
  sourcePhoto: string;
  wikipediaExcerpt: string;
  wikipediaLink: string;
  type: string;
};

export type Level = {
  id: string;
  word: string;
  title: string;
  latlon: LatLng;
  sourcePhoto: string;
  wikipediaExcerpt: string;
  wikipediaLink: string;
  type: string;
};

export type LevelProgress = {
  id: string;
  packId: string | null;
  lives: number;
  completed: boolean;
  stars: number;
  investedLives: number;
  emptyLivesTimestamp: number | null;
  bombUsed: boolean;
  availableLetters: Array<AvailableLetterType>;
  solutionLetters: Map<string, SolutionLetterType>;
};

export const LevelProgressInitialState = {
  lives: 3,
  completed: false,
  stars: 0,
  investedLives: 0,
  emptyLivesTimestamp: null,
  bombUsed: false,
  availableLetters: [],
  solutionLetters: new Map<string, SolutionLetterType>(),
};

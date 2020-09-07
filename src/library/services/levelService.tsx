import {LatLng} from 'react-native-maps';
import WordHelper from '../components/helpers/wordHelper';

const getCoordinateFromLatLonString = (latLonString: string): LatLng => {
  const splitted = latLonString.split(',');
  return {
    latitude: parseFloat(splitted[0]),
    longitude: parseFloat(splitted[1]),
  };
};

export type LevelSource = {
  id: number;
  word: string;
  pack: number;
  latlon: string;
};

export type Level = {
  id: string;
  word: string;
  pack: number;
  latlon: LatLng;
};

export interface MemoryRandomLetters {
  [index: string]: Array<Array<string>>;
}

type LevelServiceType = {
  loaded: boolean;
  levels: Array<Level>;
  init: Function;
  getLevels: Function;
  inMemoryRandomLetters: MemoryRandomLetters;
  getLettersForWord: Function;
  setLevelSource: Function;
  levelSource: any;
};

const LevelService: LevelServiceType = {
  loaded: false,
  levels: [],
  levelSource: [],
  inMemoryRandomLetters: {},
  setLevelSource: (levelSource: string) => {
    LevelService.levelSource = levelSource;
  },
  init: () => {
    LevelService.levels = LevelService.levelSource.map((lvl: LevelSource) => {
      return {
        id: lvl.id.toString(),
        word: lvl.word,
        pack: lvl.word,
        latlon: getCoordinateFromLatLonString(lvl.latlon),
      };
    });
  },
  getLevels: (): Array<Level> => {
    if (!LevelService.loaded) {
      LevelService.init();
    }
    return LevelService.levels;
  },
  getLettersForWord: (word: string) => {
    if (LevelService.inMemoryRandomLetters[word]) {
      return LevelService.inMemoryRandomLetters[word];
    }

    LevelService.inMemoryRandomLetters[word] = WordHelper.getLettersForWord(
      word,
    );
    return LevelService.inMemoryRandomLetters[word];
  },
};

export default LevelService;

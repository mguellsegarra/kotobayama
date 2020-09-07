import {LatLng} from 'react-native-maps';
import WordHelper from '../components/helpers/wordHelper';
const levelSource = require('@assets/levels');
const packSource = require('@assets/packs');

const getCoordinateFromLatLonString = (latLonString: string): LatLng => {
  const splitted = latLonString.split(',');
  return {
    latitude: parseFloat(splitted[0]),
    longitude: parseFloat(splitted[1]),
  };
};

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

export type PackSource = {
  id: string;
  title: string;
  levels: Array<string>;
};

export type Pack = {
  id: string;
  title: string;
  levels: Array<Level> | undefined;
};

export interface MemoryRandomLetters {
  [index: string]: Array<Array<string>>;
}

type LevelServiceType = {
  loaded: boolean;
  levels: Array<Level>;
  packs: Array<Pack>;
  init: Function;
  inMemoryRandomLetters: MemoryRandomLetters;
  getLettersForWord: Function;
  getPackWithId: Function;
  getLevelWithId: Function;
};

const LevelService: LevelServiceType = {
  loaded: false,
  levels: [],
  packs: [],
  inMemoryRandomLetters: {},
  init: () => {
    LevelService.levels = levelSource.map((lvl: LevelSource) => {
      return {
        id: lvl.id,
        word: lvl.word,
        packId: lvl.packId.toString(),
        latlon: getCoordinateFromLatLonString(lvl.latlon),
      };
    });

    LevelService.packs = packSource.map((pack: PackSource) => {
      return {
        id: pack.id,
        title: pack.title,
        levels: LevelService.levels.filter((lvl: Level) => {
          return lvl?.packId === pack.id.toString();
        }),
      };
    });
  },
  getPackWithId: (packId: string): Pack | undefined => {
    return LevelService.packs.find((pack: Pack) => {
      return pack?.id === packId;
    });
  },
  getLevelWithId: (id: string): Level | undefined => {
    return LevelService.levels.find((level: Level) => {
      return level?.id === id;
    });
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

import {LatLng} from 'react-native-maps';
import WordHelper from '../components/helpers/wordHelper';
import {Level, LevelSource} from '@library/models/level';
import {Pack} from '@library/models/pack';

const levelSource = require('@assets/levels');
const packSource = require('@assets/packs');

const getCoordinateFromLatLonString = (latLonString: string): LatLng => {
  const splitted = latLonString.split(',');
  return {
    latitude: parseFloat(splitted[0]),
    longitude: parseFloat(splitted[1]),
  };
};

export interface MemoryRandomLetters {
  [index: string]: Array<Array<string>>;
}

type LevelServiceType = {
  levels: Array<Level>;
  packs: Array<Pack>;
  getPackWithId: Function;
  getLevelWithId: Function;
  getLevelsForPack: Function;
  inMemoryRandomLetters: MemoryRandomLetters;
  getLettersForWord: Function;
};

const LevelService: LevelServiceType = {
  levels: levelSource.map((lvl: LevelSource) => {
    return {
      id: lvl.id,
      word: lvl.word,
      latlon: getCoordinateFromLatLonString(lvl.latlon),
    };
  }),
  packs: packSource,
  inMemoryRandomLetters: {},
  getPackWithId: (packId: string): Pack | undefined => {
    return packSource.find((pack: Pack) => {
      return pack?.id === packId;
    });
  },
  getLevelWithId: (id: string): Level | undefined => {
    return LevelService.levels.find((level: Level) => {
      return level?.id === id;
    });
  },
  getLevelsForPack: (packId: string): Array<Level> => {
    const pack = LevelService.getPackWithId(packId);
    return pack.levels.map((levelId: string) => {
      return LevelService.getLevelWithId(levelId);
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

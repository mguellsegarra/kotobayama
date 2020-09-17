import {LatLng} from 'react-native-maps';
import WordHelper from '../helpers/wordHelper';
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

type LevelServiceType = {
  levels: Array<Level>;
  packs: Array<Pack>;
  getPackWithId: Function;
  getLevelWithId: Function;
  getLevelsForPack: Function;
};

const LevelService: LevelServiceType = {
  levels: levelSource.map((lvl: LevelSource) => {
    return {
      id: lvl.id,
      word: lvl.word,
      title: lvl.title,
      latlon: getCoordinateFromLatLonString(lvl.latlon),
      sourcePhoto: lvl.sourcePhoto,
      wikipediaExcerpt: lvl.wikipediaExcerpt,
      wikipediaLink: lvl.wikipediaLink,
      type: lvl.type,
    };
  }),
  packs: packSource,
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
};

export default LevelService;

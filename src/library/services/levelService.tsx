const levelSource = require('@tegami/assets/levels');
import {LatLng} from 'react-native-maps';

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

type LevelServiceType = {
  loaded: boolean;
  levels: Array<Level>;
  init: Function;
  getLevels: Function;
};

const LevelService: LevelServiceType = {
  loaded: false,
  levels: [],
  init: () => {
    LevelService.levels = levelSource.map((lvl: LevelSource) => {
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
};
export default LevelService;

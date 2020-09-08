import {Level} from './level';

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
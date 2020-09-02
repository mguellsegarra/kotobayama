export {Images} from './images';
export {Colors} from './colors';
export {Fonts} from './fonts';

interface RInterface {
  img: Function;
}

const R: RInterface = {
  img: (key: string) => {
    return {uri: key};
  },
};

export default R;

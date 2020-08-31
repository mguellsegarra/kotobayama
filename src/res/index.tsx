import images from './images';
import colors from './colors';
import fonts from './fonts';
import {ImageSourcePropType} from 'react-native';

interface ImagesInterface {
  [index: string]: ImageSourcePropType;
}

interface StringKVInterface {
  [index: string]: string;
}

interface RInterface {
  images: ImagesInterface;
  colors: StringKVInterface;
  fonts: StringKVInterface;
}

const R: RInterface = {
  images,
  colors,
  fonts,
};

export default R;

import {StyleSheet} from 'react-native';
import {Colors} from '@res/R';
import {hp} from '@library/services/deviceService';

const getStyles: any = () => {
  return StyleSheet.create({
    levelDetailsImageFrame: {
      zIndex: 2,
    },
    levelDetailsImagePic: {
      borderRadius: hp('1%'),
      overflow: 'hidden',
      borderWidth: hp('0.3%'),
      borderColor: 'white',
    },
  });
};

const styles = getStyles();

export {styles};

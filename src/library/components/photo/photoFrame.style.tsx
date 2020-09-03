import {StyleSheet} from 'react-native';

const getStyles: any = () => {
  return StyleSheet.create({
    levelDetailsImageFrame: {
      zIndex: 2,
    },
    levelDetailsImagePic: {
      position: 'absolute',
      zIndex: 1,
      borderRadius: 20,
      overflow: 'hidden',
    },
  });
};

export {getStyles};

import {StyleSheet} from 'react-native';

const getStyles = () => {
  return StyleSheet.create({
    map: {
      ...StyleSheet.absoluteFillObject,
      zIndex: 1,
    },
  });
};

const styles = getStyles();

export {styles};

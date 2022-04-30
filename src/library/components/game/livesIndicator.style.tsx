import {StyleSheet} from 'react-native';

import {wp, hp} from '@library/services/deviceService';

const getStyles: any = () => {
  const heartSize = hp('4%');

  return StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    image: {
      width: heartSize,
      height: heartSize,
      margin: 2,
    },
  });
};

const styles = getStyles();

export {styles};

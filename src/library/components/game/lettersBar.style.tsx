import {StyleSheet} from 'react-native';

import {wp, hp} from '@library/services/deviceService';

const getStyles: any = () => {
  return StyleSheet.create({
    row: {
      flex: 1,
      flexDirection: 'row',
      width: wp('100%'),
      justifyContent: 'center',
      alignItems: 'center',
    },
    bottomMargin: {
      flex: 0.3,
    },
  });
};

const styles = getStyles();

export {styles};

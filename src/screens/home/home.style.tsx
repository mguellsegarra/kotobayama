/**
 * @format
 * @flow strict-local
 */
import {StyleSheet} from 'react-native';

import {wp, hp, isTablet} from '@library/services/deviceService';

const getStyles = () => {
  return StyleSheet.create({
    background: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 2,
      position: 'absolute',
      width: wp('100%'),
      height: hp('100%'),

    },
  });
};

const styles = getStyles();

export {styles};

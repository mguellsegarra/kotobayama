/**
 * @format
 * @flow strict-local
 */
import {StyleSheet} from 'react-native';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

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

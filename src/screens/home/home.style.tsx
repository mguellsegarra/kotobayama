/**
 * @format
 * @flow strict-local
 */
import {StyleSheet} from 'react-native';

import {wp, hp, isTablet} from '@library/services/deviceService';

const logoImageK = 0.706896551724138;

const getStyles = () => {
  const logoImageWidth = isTablet() ? wp('55%') : wp('70%');

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
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
      opacity: 0,
    },
    navBar: {
      flex: 1,
      flexDirection: 'row',
    },
    top: {
      flex: 0.28,
      width: wp('100%'),
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
    },
    logo: {
      flex: 2,
      width: wp('100%'),
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
    },
    logoImage: {
      width: logoImageWidth,
      height: logoImageWidth * logoImageK,
    },
    buttons: {
      flex: 1,
      width: wp('100%'),
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
    },
    bottom: {
      flex: 1,
      width: wp('100%'),
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
    },
    buttonOption: {
      width: isTablet() ? wp('50%') : wp('70%'),
      height: isTablet() ? wp('30%') : wp('50%'),
    },
    progressBar: {
      position: 'absolute',
      zIndex: 4,
      width: wp('100%'),
      height: hp('100%'),
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',

    }
  });
};

const styles = getStyles();

export {styles};

import {StyleSheet} from 'react-native';
import {Fonts, } from '@res/R';

import {
  isAndroid,
  isTablet,
  wp,
  hp,
  isIosAndNotch,
} from '@library/services/deviceService';

const getStyles: any = () => {
  const containerK = 1.780913978494624;
  const containerHeight = hp('68%');
  const containerWidth = containerHeight / containerK;

  return StyleSheet.create({
    background: {
      backgroundColor: '#000000cc',
      flex: 1,
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    },
    top: {
      width: wp('100%'),
      flex: 1,
    },
    ribbon: {
      width: wp('100%'),
      height: hp('6.5%'),
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'flex-end',
      paddingLeft: wp('4%'),
      paddingRight: wp('4%'),
    },
    ribbonImage: {
      flex: 1,
      width: '100%',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'flex-start',
    },
    ribbonText: {
      marginLeft: '15%',
      marginRight: '15%',
      color: '#ffffff',
      fontSize: isTablet() ? wp('3.3%') : isAndroid ? wp('3.5%') : wp('4%'),
      textAlign: 'center',
      fontFamily: Fonts.league,
      marginTop: isAndroid
        ? hp('0.8%')
        : isIosAndNotch
        ? hp('1.6%')
        : hp('1.3%'),
    },
    container: {
      flex: 10,
      flexDirection: 'column',
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
    },
    containerImage: {
      width: containerWidth,
      height: containerHeight,
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      paddingLeft: hp('0.9%'),
      paddingRight: hp('0.9%'),
      paddingTop: hp('4%'),
      paddingBottom: hp('4.4%'),
    },
    cell: {
      backgroundColor: '#000000cc',
      width: '100%',
      flex: 1,
      marginBottom: 10,
      flexDirection: 'row',
      height: '100%',
      alignItems: 'center',
      justifyContent: 'center',
    },
    lastCell: {
      marginBottom: 0,
    },
    bottom: {
      width: wp('100%'),
      flex: 2,
      alignItems: 'center',
      justifyContent: 'flex-start',
    },
    bottomButton: {
      width: wp('40%'),
    },
  });
};

const styles = getStyles();

export {styles};

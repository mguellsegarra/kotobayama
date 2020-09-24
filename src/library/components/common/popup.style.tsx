import {StyleSheet} from 'react-native';
import {Fonts} from '@res/R';
import {defaultButtonSize} from '@library/components/button/rectButton';

import {
  wp,
  hp,
  isAndroid,
  isTablet,
  isIosAndNotch,
} from '@library/services/deviceService';

const getStyles: any = () => {
  return StyleSheet.create({
    background: {
      position: 'absolute',
      zIndex: 2,
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: '#000000cc',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      opacity: 0,
    },
    top: {
      width: wp('100%'),
      flex: 1,
    },
    ribbon: {
      width: wp('90%'),
      flex: 0.65,
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'flex-end',
    },
    ribbonImage: {
      flex: 1,
      width: '100%',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    },
    ribbonText: {
      marginLeft: '15%',
      marginRight: '15%',
      color: '#ffffff',
      fontSize: isTablet() ? wp('3.1%') : wp('3.5%'),
      textAlign: 'center',
      fontFamily: Fonts.league,
      marginBottom: isAndroid ? hp('1.5%') : hp('1%'),
    },
    container: {
      flex: 2,
      flexDirection: 'row',
      alignItems: 'flex-start',
      justifyContent: 'flex-start',
    },
    containerImage: {
      flex: 1,
      alignSelf: 'stretch',
      width: undefined,
      height: undefined,
    },
    containerImageWrap: {
      flex: 1,
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    },
    containerButtonTop: {
      marginBottom: '5%',
    },
    containerButtonBottom: {
      marginTop: '10%',
    },
    bottom: {
      width: wp('100%'),
      flex: 2,
    },
    description: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
    },
    coinPair: {
      maxWidth: wp('15%'),
      flexDirection: 'row',
      flex: 1,
      marginTop: hp('1%'),
      alignItems: 'flex-start',
      justifyContent: 'flex-end',
    },
    coinPairImage: {
      marginRight: hp('1%'),
      width: isTablet() ? wp('3%') : wp('4%'),
      marginTop: hp('0.2%'),
      height: isTablet() ? wp('3%') : wp('4%'),
    },
    coinPairText: {
      textAlign: 'left',
      fontFamily: Fonts.alata,
      color: 'white',
      fontSize: hp('1.5%'),
      marginBottom: isAndroid ? hp('0.1%') : 0,
    },
    confirm: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    cancel: {
      flex: 1,
    },
    amountTextContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'flex-end',
    },
    amountText: {
      fontFamily: Fonts.alata,
      textAlign: 'center',
      color: '#ffffff88',
      fontSize: isTablet() ? hp('2%') : hp('2.5%'),
    },
    descriptionTextContainer: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    descriptionText: {
      width: '50%',
      fontFamily: Fonts.alata,
      textAlign: 'center',
      color: '#ffffff88',
      fontSize: isTablet() ? hp('2%') : hp('2.5%'),
    },
    button: {
      width: defaultButtonSize.width,
      height: defaultButtonSize.height,
    },
  });
};

const styles = getStyles();

export {styles};

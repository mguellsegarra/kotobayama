import {StyleSheet} from 'react-native';
import {Fonts} from '@res/R';
import {defaultButtonSize} from '@library/components/button/rectButton';
import {watchAddConstant} from '@library/components/button/rectButtonWatchAd';

import {isAndroid, isTablet, wp, hp} from '@library/services/deviceService';

const getStyles: any = () => {
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
      justifyContent: 'flex-start',
    },
    ribbonText: {
      marginLeft: '15%',
      marginRight: '15%',
      color: '#ffffff',
      fontSize: isTablet() ? wp('2.3%') : isAndroid ? wp('3%') : wp('3.5%'),
      textAlign: 'center',
      fontFamily: Fonts.league,
      marginTop: isAndroid ? hp('0.5%') : hp('1.1%'),
    },
    container: {
      flex: 4,
      flexDirection: 'row',
      alignItems: 'center',
    },
    containerImage: {
      width: '100%',
      height: '100%',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    },
    containerButtonTop: {
      marginBottom: '5%',
      width: defaultButtonSize.width,
      height: defaultButtonSize.height,
    },
    containerButtonBottom: {
      marginTop: '10%',
      width: defaultButtonSize.width,
      height: defaultButtonSize.height,
    },
    watchAdButton: {
      width: defaultButtonSize.width,
      height: defaultButtonSize.height,
    },
    bottom: {
      width: wp('100%'),
      flex: 2,
    },
  });
};

const styles = getStyles();

export {styles};

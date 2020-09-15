import {StyleSheet} from 'react-native';
import {Fonts} from '@res/R';

import {isAndroid, isTablet} from '@library/services/deviceService';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const getStyles: any = () => {
  return StyleSheet.create({
    background: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: '#000000cc',
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
      backgroundColor: 'red',
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
  });
};

const styles = getStyles();

export {styles};

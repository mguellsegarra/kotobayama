import {StyleSheet, Platform} from 'react-native';
import {Fonts, Colors} from '@res/R';

const isAndroid = Platform.OS === 'android';
import DeviceInfo, {isTablet} from 'react-native-device-info';
const iOSandNotch = Platform.OS === 'ios' && DeviceInfo.hasNotch();

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

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
      fontSize: isTablet() ? wp('2.3%') : isAndroid ? wp('2.4%') : wp('3.5%'),
      textAlign: 'center',
      fontFamily: Fonts.league,
      marginTop: isAndroid ? hp('1%') : hp('1.3%'),
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

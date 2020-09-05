import {StyleSheet} from 'react-native';
import {isTablet} from 'react-native-device-info';
import {Platform} from 'react-native';

import {Fonts} from '@res/R';
const isAndroid = Platform.OS === 'android';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const getStyles: any = () => {
  const letterSize = isTablet() ? wp('11%') : wp('12%');

  return StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignContent: 'center',
    },
    letter: {
      width: letterSize,
      height: letterSize,
      margin: wp('0.7%'),
    },
    characterContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    character: {
      marginTop: isAndroid ? 0 : hp('1%'),
      textAlign: 'center',
      fontFamily: Fonts.league,
      fontSize: wp('6%'),
    },
  });
};

const styles = getStyles();

export {getStyles, styles};
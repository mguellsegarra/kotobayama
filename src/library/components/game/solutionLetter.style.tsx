import {StyleSheet} from 'react-native';
import {isTablet} from 'react-native-device-info';
import {Platform} from 'react-native';
import {Colors} from '@res/R';

import {Fonts} from '@res/R';
const isAndroid = Platform.OS === 'android';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const getStyles: any = (letterSize: number, margin: number) => {
  // const letterSize = isTablet() ? wp('9%') : wp('10%');
  // margin: wp('0.7%'),

  return StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignContent: 'center',
    },
    letter: {
      width: letterSize,
      height: letterSize,
      margin,
    },
    characterContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    character: {
      color: 'white',
      marginTop: isAndroid ? 0 : hp('1%'),
      textAlign: 'center',
      fontFamily: Fonts.league,
      fontSize: wp('6%'),
    },
    characterGold: {
      color: Colors.gold,
    },
  });
};

export {getStyles};

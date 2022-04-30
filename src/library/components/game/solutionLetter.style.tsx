import {StyleSheet} from 'react-native';
import {Colors} from '@res/R';

import {Fonts} from '@res/R';
import {wp, hp, isAndroid} from '@library/services/deviceService';

const getStyles: any = (letterSize: number, margin: number) => {
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
      marginTop: isAndroid ? 0 : hp('0.7%'),
      textAlign: 'center',
      fontFamily: Fonts.league,
      fontSize: letterSize * 0.5,
    },
    characterGold: {
      color: Colors.gold,
    },
  });
};

export {getStyles};

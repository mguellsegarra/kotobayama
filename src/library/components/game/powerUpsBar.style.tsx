import {StyleSheet} from 'react-native';
import {Fonts} from '@res/R';
import {isAndroid, isIosAndNotch} from '@library/services/deviceService';

import {wp, hp} from '@library/services/deviceService';

const getStyles: any = () => {
  const squareBgSize = hp('7%') - (isIosAndNotch ? 3 : 0);

  return StyleSheet.create({
    container: {
      flex: 1,
      height: '100%',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      paddingBottom: hp('1%'),
    },
    powerUpContainer: {
      flex: 1,
      height: '100%',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    },
    topLabel: {
      flex: 1,
      width: '100%',
      justifyContent: 'flex-start',
      alignItems: 'center',
    },
    topLabelText: {
      width: '90%',
      color: 'white',
      fontFamily: Fonts.alata,
      fontSize: squareBgSize * 0.2,
      textAlign: 'center',
    },
    midImage: {
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
    },
    bottomPrice: {
      flex: 0.9,
      width: '100%',
      justifyContent: 'center',
      alignItems: 'flex-end',
      flexDirection: 'row',
    },
    coin: {
      width: squareBgSize * 0.25,
      height: squareBgSize * 0.25,
    },
    coinText: {
      marginTop: isAndroid ? 0 : 2,
      fontFamily: Fonts.alata,
      color: 'white',
      fontSize: squareBgSize * 0.2,
      textAlign: 'left',
      marginLeft: wp('0.5%'),
    },
    square_bg: {
      width: squareBgSize,
      height: squareBgSize,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    powerupImage: {
      width: '80%',
      height: '80%',
    },
  });
};

const styles = getStyles();

export {styles};

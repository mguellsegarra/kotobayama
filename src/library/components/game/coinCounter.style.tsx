import {StyleSheet} from 'react-native';
import {Fonts} from '@res/R';

import {wp, hp, isAndroid, isTablet} from '@library/services/deviceService';

const getStyles: any = () => {
  const imageSize = hp('2%');

  return StyleSheet.create({
    container: {
      maxHeight: hp('4%'),
      maxWidth: isTablet() ? wp('18%') : wp('23%'),
      flex: 1,
      backgroundColor: '#000000cc',
      borderRadius: hp('3%'),
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 10,
    },
    image: {
      marginLeft: hp('1%'),
      flex: 1,
      width: imageSize,
      marginTop: hp('0.2%'),
      height: imageSize,
    },
    text: {
      flex: 3,
      textAlign: 'right',
      fontFamily: Fonts.alata,
      color: 'white',
      fontSize: hp('1.5%'),
      marginBottom: isAndroid ? hp('0.1%') : 0,
    },
    plus: {
      flex: 1,
      marginRight: wp('1%'),
      textAlign: 'center',
      fontFamily: Fonts.alata,
      color: '#ffffff88',
      fontSize: hp('4.1%'),
      marginBottom: isAndroid ? hp('0.44%') : hp('0.2%'),
      marginLeft: 2,
    },
  });
};

const styles = getStyles();

export {styles};

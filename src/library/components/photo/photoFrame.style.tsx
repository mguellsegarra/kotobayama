import {StyleSheet} from 'react-native';
import {hp, wp, isTablet} from '@library/services/deviceService';
import {defaultButtonSize} from '@library/components/button/rectButton';
import {Fonts, Colors} from '@res/R';

const getStyles: any = () => {
  return StyleSheet.create({
    levelDetailsImageFrame: {
      zIndex: 2,
    },
    modal: {
      backgroundColor: 'black',
      position: 'absolute',
      width: '100%',
      height: '100%',
    },
    levelDetailsImagePic: {
      position: 'absolute',
      zIndex: 1,
      borderRadius: 20,
      overflow: 'hidden',
      // borderWidth: hp('0.3%'),
      // borderColor: 'white',
    },
    sourcePhoto: {
      position: 'absolute',
      marginTop: hp('5%'),
      top: 0,
      width: wp('100%'),
      zIndex: 2,
      color: 'white',
      fontFamily: Fonts.alata,
      fontSize: wp('3%'),
      textAlign: 'center',
      backgroundColor: 'black',
      paddingBottom: hp('0.5%'),
      shadowColor: '#000',
      shadowOffset: {width: 0, height: 2},
      shadowOpacity: 0.8,
      shadowRadius: 2,
      elevation: 1,
    },
    close: {
      position: 'absolute',
      marginTop: hp('10%'),
      top: 0,
      width: defaultButtonSize.width * 0.8,
      zIndex: 2,
      left: wp('50%') - (defaultButtonSize.width * 0.8) / 2,
      color: 'white',
      fontFamily: Fonts.league,
      fontSize: wp('3%'),
      textAlign: 'center',
      alignSelf: 'center',
      paddingTop: hp('1%'),
      paddingBottom: hp('0.8%'),
      borderRadius: isTablet() ? 25 : 15,
      backgroundColor: Colors.darkGray,
      overflow: 'hidden',
    },
  });
};

const styles = getStyles();

export {styles};

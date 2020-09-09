import {StyleSheet} from 'react-native';
import R, {Fonts} from '@res/R';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const getStyles: any = () => {
  const backButtonSize = hp('5%');

  return StyleSheet.create({
    background: {
      flex: 1,
    },
    navBar: {
      flex: 1,
      flexDirection: 'row',
    },
    navBarLeft: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'flex-start',
    },
    navBarRight: {
      flex: 1,
      // backgroundColor: 'green',
      justifyContent: 'center',
      alignItems: 'flex-end',
    },
    navBarMiddle: {
      flex: 2,
      // backgroundColor: 'blue',
      justifyContent: 'center',
      alignItems: 'center',
    },
    titleBar: {
      flex: 1.3,
      justifyContent: 'center',
      alignItems: 'center',
    },
    photoBar: {
      flex: 5,
      justifyContent: 'center',
      alignItems: 'center',
    },
    powerUpsBar: {
      flex: 2,
      // backgroundColor: 'pink',
    },
    backButton: {
      width: backButtonSize,
      height: backButtonSize,
      marginLeft: 4,
    },
    sourceText: {
      marginTop: hp('0.5%'),
      color: '#ffffffcc',
      fontSize: hp('1.4%'),
      fontFamily: Fonts.josefin_light,
    },
    titleText: {
      width: wp('100%'),
      padding: hp('1%'),
      paddingLeft: hp('2%'),
      paddingRight: hp('2%'),
      backgroundColor: '#000000aa',
      fontFamily: Fonts.league,
      fontSize: hp('1.6%'),
      color: 'white',
      textAlign: 'center',
      marginBottom: hp('0.5%'),
    },
    solutionBar: {
      flex: 3,
      // backgroundColor: 'green',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
    },
    separator: {
      flex: 1,
      width: wp('100%'),
    },
    solutionView: {
      flex: 4,
      width: wp('100%'),
    },
    lettersBar: {
      flex: 3,
      flexDirection: 'column',
      // backgroundColor: 'blue',
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
};

export {getStyles};

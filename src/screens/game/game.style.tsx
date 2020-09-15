import {StyleSheet} from 'react-native';
import {Fonts} from '@res/R';

import {wp, hp} from '@library/services/deviceService';

const getStyles: any = () => {

  return StyleSheet.create({
    background: {
      flex: 1,
    },
    navBar: {
      flex: 1,
      flexDirection: 'row',
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
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
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
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
};

const styles = getStyles();

export {styles};

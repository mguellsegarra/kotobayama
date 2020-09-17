import {StyleSheet} from 'react-native';
import {Fonts} from '@res/R';

import {wp, hp} from '@library/services/deviceService';

const getStyles: any = () => {
  const bottomHeight = hp('35%');

  return StyleSheet.create({
    container: {
      flex: 1,
      position: 'absolute',
      bottom: 0,
      width: wp('100%'),
      height: bottomHeight,
      backgroundColor: 'black',
      zIndex: 2,
    },
    levelBar: {
      flex: 1,
      // height: levelBarHeight,
      width: wp('100%'),
      backgroundColor: 'black',
    },
    levelBarFlex: {
      flex: 1,
      flexDirection: 'row',
    },
    levelBarArrow: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    levelBarMiddle: {
      flex: 5,
      alignItems: 'center',
      justifyContent: 'center',
    },
    levelDetailsIncomplete: {
      flex: 5,
      flexDirection: 'row',
    },
    levelDetailsComplete: {
      flex: 5,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    },
    levelDetailsImage: {
      flex: 3,
      alignItems: 'center',
      justifyContent: 'center',
    },
    levelDetailsRight: {
      flex: 1,
      flexDirection: 'column',
    },
    levelDetailsRightCell: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'flex-start',
      flexDirection: 'row',
    },
    detailRightCellImage: {
      width: hp('4%'),
      height: hp('4%'),
    },
    detailRightText: {
      color: 'white',
      fontFamily: Fonts.alata,
      marginTop: wp('1%'),
      marginLeft: hp('0.4%'),
      fontSize: hp('1.6%'),
    },
    sourceText: {
      marginTop: hp('0.5%'),
      color: '#ffffffcc',
      fontSize: hp('1.4%'),
      fontFamily: Fonts.josefin_light,
    },
  });
};

const styles = getStyles();

export {styles};

import {StyleSheet} from 'react-native';
import {Fonts, Colors} from '@res/R';

import {wp, hp, isAndroid} from '@library/services/deviceService';

const getStyles: any = () => {
  const bottomHeight = hp('35%');
  const wikipediaButtonHeight = hp('3.5%');
  const wikipediaButtonConstant = 0.15702479338843;
  const wikipediaButtonWidth = wikipediaButtonHeight / wikipediaButtonConstant;
  const wikipediaImageHeight = wikipediaButtonHeight * 0.5;
  const wikipediaImageConstant = 0.625;
  const wikipediaImageWidth = wikipediaImageHeight / wikipediaImageConstant;

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
    completeCell1: {
      flex: 0.5,
      width: '100%',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'flex-start',
      // backgroundColor: 'blue',
    },
    completeCell2: {
      flex: 1.2,
      width: '100%',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      // backgroundColor: 'green',
    },
    descriptionText: {
      maxWidth: '90%',
      fontSize: hp('20%'),
      textAlign: 'center',
      fontFamily: Fonts.alata,
      marginLeft: wp('5%'),
      // marginTop: hp('1%'),
      marginBottom: hp('1.9%'),
      marginRight: wp('5%'),
      color: 'white',
      textShadowColor: 'rgba(0, 0, 0, 1)',
      textShadowOffset: {width: -1, height: 1},
      textShadowRadius: 5,
    },
    wikipediaButton: {
      backgroundColor: Colors.darkGray,
      width: wikipediaButtonWidth,
      height: wikipediaButtonHeight,
      borderRadius: wikipediaButtonHeight,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: hp('2%'),
    },
    wikipediaImageContainer: {
      flex: 1,
      alignItems: 'flex-end',
      justifyContent: 'center',
    },
    wikipediaImage: {
      marginTop: wikipediaImageWidth * 0.1,
      marginRight: wikipediaImageWidth * 0.1,
      height: wikipediaImageHeight,
      width: wikipediaImageWidth,
    },
    wikipediaLabel: {
      flex: 4,
      height: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: isAndroid ? 0 : wikipediaImageWidth * 0.2,
    },
    wikipediaLabelText: {
      width: '95%',
      textAlign: 'center',
      color: '#ffffff',
      fontSize: wikipediaButtonHeight * 0.38,
      fontFamily: Fonts.league,
      marginRight: wikipediaImageWidth * 0.5,
      paddingLeft: wikipediaImageWidth * 0.2,
    },
  });
};

const styles = getStyles();

export {styles};

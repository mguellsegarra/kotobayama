import {StyleSheet} from 'react-native';
import {Fonts, Colors} from '@res/R';

import {
  isAndroid,
  isTablet,
  isIosAndNotch,
  wp,
  hp,
} from '@library/services/deviceService';
import {defaultButtonSize} from '@library/components/button/rectButton';

const getStyles: any = () => {
  const photoFrameConstant = 0.626373626373626;
  const photoFrameWidth = isTablet() ? wp('70%') : wp('85%');
  const photoFrameHeight = photoFrameWidth * photoFrameConstant;
  const starConstant = 0.963855421686747;
  const starWidth = hp('9%');
  const starHeight = starWidth * starConstant;
  const ribbonWidth = isTablet() ? wp('70%') : wp('85%');
  const ribbonConstant = 0.130212765957447;
  const ribbonHeight = ribbonWidth * ribbonConstant;
  const ribbonBottomConstant = 0.215686274509804;
  const ribbonBottomMargin = ribbonHeight * ribbonBottomConstant;

  const wikipediaButtonHeight = ribbonHeight * 0.5;
  const wikipediaButtonConstant = 0.15702479338843;
  const wikipediaButtonWidth = wikipediaButtonHeight / wikipediaButtonConstant;

  const wikipediaImageHeight = wikipediaButtonHeight * 0.5;
  const wikipediaImageConstant = 0.625;
  const wikipediaImageWidth = wikipediaImageHeight / wikipediaImageConstant;
  const coinRewardsConstant = 124 / 120;
  const coinRewardsHeight = hp('5%');
  const coinRewardsWidth = coinRewardsHeight / coinRewardsConstant;

  let starFlareY = isIosAndNotch ? 44 : 0;
  starFlareY += hp('1%');

  return StyleSheet.create({
    background: {
      backgroundColor: '#000000fb',
      flex: 1,
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    },
    container: {
      flex: 1,
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    },
    ribbon: {
      width: wp('100%'),
      flex: 1.1,
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    },
    ribbonImage: {
      width: ribbonWidth,
      height: ribbonHeight,
      justifyContent: 'center',
    },
    ribbonText: {
      marginLeft: ribbonWidth * 0.15,
      marginRight: ribbonWidth * 0.15,
      color: '#ffffff',
      fontSize: ribbonHeight * 0.35,
      textAlign: 'center',
      fontFamily: Fonts.league,
      marginBottom: ribbonBottomMargin - (isAndroid ? 0 : hp('0.7%')),
    },
    stars: {
      width: wp('100%'),
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    firstStar: {
      flex: 2,
      height: '100%',
      alignItems: 'flex-end',
      justifyContent: 'flex-start',
      marginRight: isAndroid ? 5 : 0,
    },
    secondStar: {
      flex: 1.1,
      height: '100%',
      alignItems: 'center',
      justifyContent: 'flex-start',
    },
    thirdStar: {
      marginLeft: isAndroid ? 5 : 0,
      height: '100%',
      flex: 2,
      alignItems: 'flex-start',
      justifyContent: 'flex-start',
    },
    starSmall: {
      marginTop: hp('0.6%'),
      height: starHeight * 0.8,
      width: starWidth * 0.8,
    },
    starBig: {
      height: starHeight,
      width: starWidth,
    },
    photo: {
      height: photoFrameHeight * 1.1,
      width: wp('100%'),
      alignItems: 'center',
      justifyContent: 'center',
    },
    info: {
      width: wp('100%'),
      flex: 2.2,
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    },
    infoTop: {
      flex: 0.8,
      width: '100%',
      flexDirection: 'row',
      alignItems: 'flex-end',
      justifyContent: 'center',
    },
    infoMiddle: {
      flex: 3,
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    titleText: {
      fontSize: hp('2%'),
      textAlign: 'center',
      fontFamily: Fonts.league,
      marginTop: isAndroid ? 0 : hp('0.2%'),
      color: 'white',
    },
    descriptionText: {
      width: '90%',
      fontSize: hp('20%'),
      textAlign: 'center',
      fontFamily: Fonts.alata,
      marginLeft: wp('5%'),
      marginTop: hp('1%'),
      marginBottom: hp('1%'),
      marginRight: wp('5%'),
      color: 'white',
    },
    wikipediaButton: {
      backgroundColor: Colors.darkGray,
      width: wikipediaButtonWidth,
      height: wikipediaButtonHeight,
      borderRadius: wikipediaButtonHeight,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: hp('1.5%'),
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
      color: '#ffffffcc',
      fontSize: wikipediaButtonHeight * 0.38,
      fontFamily: Fonts.league,
      marginRight: wikipediaImageWidth * 0.5,
      paddingLeft: wikipediaImageWidth * 0.2,
    },
    rewards: {
      width: wp('100%'),
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    rewardsTop: {
      flex: 1,
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
    },
    rewardsTopImage: {
      height: '80%',
      width: '100%',
    },
    rewardsTopImageContainer: {
      flex: 1,
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    },
    rewardsTopImageText: {
      height: '100%',
      color: Colors.gold,
      fontSize: hp('2%'),
      fontFamily: Fonts.alata,
      textAlign: 'center',
      marginBottom: isAndroid ? hp('0.2%') : hp('0.6%'),
    },
    rewardsBottom: {
      flex: 2,
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    rewardsBottomImage: {
      width: coinRewardsWidth,
      height: coinRewardsHeight,
      marginRight: wp('1%'),
    },
    rewardsBottomText: {
      marginTop: isAndroid ? 0 : hp('0.5%'),
      color: 'white',
      fontSize: hp('2%'),
      fontFamily: Fonts.league,
    },
    buttons: {
      width: wp('100%'),
      flex: 1,
      flexDirection: 'row',
      alignItems: 'flex-end',
      justifyContent: 'center',
    },
    bottomGap: {
      width: wp('100%'),
      flex: 0.2,
    },
    sourceText: {
      marginTop: hp('0.5%'),
      color: '#ffffffcc',
      fontSize: hp('1.4%'),
      fontFamily: Fonts.josefin_light,
    },
    buttonLeft: {
      marginRight: wp('1%'),
      width: defaultButtonSize.width * 0.99,
      height: defaultButtonSize.height * 0.99,
    },
    buttonRight: {
      marginLeft: wp('1%'),
    },
    starFlare: {
      position: 'absolute',
      zIndex: -1,
      top: starFlareY,
    },
    starFlareImage: {
      width: wp('100%'),
      height: hp('30%'),
    },
    confettiView: {
      position: 'absolute',
      height: hp('100%'),
      width: wp('100%'),
      zIndex: 2,
    },
  });
};

const styles = getStyles();

export {styles};

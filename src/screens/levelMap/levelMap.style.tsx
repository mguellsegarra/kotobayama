import {StyleSheet, Platform} from 'react-native';
import {Fonts} from '@res/R';
import DeviceInfo, {isTablet} from 'react-native-device-info';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Colors} from '@res/R';

const getStyles: any = () => {
  const bottomHeight = hp('35%');

  const titleBannerWidth = isTablet() ? wp('60%') : wp('82%');
  const titleBannerConstant = 0.2922;
  const titleHeight = titleBannerWidth * titleBannerConstant;
  const titleFont = titleHeight * 0.15;
  const titleMarginBottomConstant = 0.0;
  const titleMarginBottom = titleHeight * titleMarginBottomConstant;
  const titleMarginSides = titleBannerWidth * 0.05;
  const titleLineHeight = titleHeight * 0.3;
  const buttonWidth = isTablet() ? wp('30%') : wp('42%');
  const buttonRatioConstant = 0.3525;
  const buttonHeight = buttonWidth * buttonRatioConstant;

  const navbarHeight = hp('5%');
  const backButtonSize = hp('5%');
  const navbarMarginTop =
    Platform.OS === 'ios' && DeviceInfo.hasNotch() ? 44 : 5;

  const playButtonOverlayBottomMargin = hp('2%');
  const yBackButton =
    hp('100%') -
    (bottomHeight -
      playButtonOverlayBottomMargin +
      buttonHeight);
  const y = yBackButton * 0.5;

  return StyleSheet.create({
    root: {
      flex: 1,
    },
    container: {
      ...StyleSheet.absoluteFillObject,
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
    map: {
      ...StyleSheet.absoluteFillObject,
    },
    navBar: {
      position: 'absolute',
      top: navbarMarginTop,
      height: navbarHeight,
      width: wp('100%'),
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
    titleOverlay: {
      position: 'absolute',
      top: navbarHeight + navbarMarginTop + hp('2%'),
      width: titleBannerWidth,
      height: titleHeight,
    },
    mapTitleContainerImage: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      width: titleBannerWidth,
    },
    mapTitleText: {
      fontFamily: Fonts.league,
      fontSize: titleFont,
      color: 'white',
      textAlign: 'center',
      marginLeft: titleMarginSides,
      marginRight: titleMarginSides,
      marginBottom: titleMarginBottom,
      lineHeight: titleLineHeight,
    },
    mapTypeButtonContainer: {
      position: 'absolute',
      top: y,
      right: 0,
      backgroundColor: '#000000CC',
      padding: 7,
      borderTopLeftRadius: 10,
      borderBottomLeftRadius: 10,
    },
    playButtonOverlay: {
      position: 'absolute',
      marginBottom: bottomHeight + playButtonOverlayBottomMargin,
      bottom: 0,
    },
    closeMapButtonOverlay: {
      position: 'absolute',
      marginBottom: hp('5%'),
      bottom: 0,
    },
    backButton: {
      width: backButtonSize,
      height: backButtonSize,
      marginLeft: 4,
    },
    mapButton: {
      width: hp('7%'),
      height: hp('7%'),
    },
    overlayLoad: {
      zIndex: 2,
      position: 'absolute',
      width: wp('100%'),
      height: hp('100%'),
      backgroundColor: Colors.ondoriRed,
    },
  });
};

const styles = getStyles();
export {styles};

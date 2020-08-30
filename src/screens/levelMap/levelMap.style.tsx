import {StyleSheet} from 'react-native';
import Colors from '../../styles/colors.style';
import Fonts from '../../styles/fonts.style';
import {isTablet} from 'react-native-device-info';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const getStyles: any = () => {
  const navbarHeight = hp('7%');
  const bottomHeight = hp('35%');

  const titleBannerWidth = isTablet() ? wp('60%') : wp('82%');
  const titleBannerConstant = 0.2922;
  const titleHeight = titleBannerWidth * titleBannerConstant;
  const titleFont = titleHeight * 0.15;
  const titleMarginBottomConstant = 0.0;
  const titleMarginBottom = titleHeight * titleMarginBottomConstant;
  const titleMarginSides = titleBannerWidth * 0.05;
  const titleLineHeight = titleHeight * 0.3;
  const titleMarginTop = hp('1%');

  const playButtonOverlayBottomMargin = hp('2%');

  return StyleSheet.create({
    container: {
      ...StyleSheet.absoluteFillObject,
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
    map: {
      ...StyleSheet.absoluteFillObject,
    },
    titleOverlay: {
      position: 'absolute',
      top: 0,
      width: titleBannerWidth,
      marginTop: titleMarginTop,
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
    leftButtonOverlay: {
      position: 'absolute',
      top: titleMarginTop + titleHeight + hp('1%'),
      left: 0,
    },
    rightButtonOverlay: {
      position: 'absolute',
      top: titleMarginTop + titleHeight + hp('1%'),
      right: 0,
    },
    playButtonOverlay: {
      position: 'absolute',
      marginBottom: bottomHeight + playButtonOverlayBottomMargin,
      bottom: 0,
    },
    closeMapButtonOverlay: {
      position: 'absolute',
      marginBottom: 20,
      bottom: 0,
    },
  });
};

export {getStyles};

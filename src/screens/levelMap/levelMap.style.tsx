import {StyleSheet} from 'react-native';
import {
  isTablet,
  isIosAndNotch,
  isAndroid,
  wp,
  hp,
} from '@library/services/deviceService';
import {titleBannerOptions} from '@library/components/map/mapTitleBanner';
import {defaultButtonSize} from '@library/components/button/rectButton';

const getStyles: any = () => {
  const bottomHeight = hp('35%');

  const buttonWidth = isTablet() ? wp('30%') : wp('42%');
  const buttonRatioConstant = 0.3525;
  const buttonHeight = buttonWidth * buttonRatioConstant;

  const navbarHeight = isIosAndNotch ? hp('5.90%') : hp('6.5%');
  const navbarMarginTop = isIosAndNotch ? 44 : 0;

  const playButtonOverlayBottomMargin = hp('2%');
  const yBackButton =
    hp('100%') - (bottomHeight - playButtonOverlayBottomMargin + buttonHeight);
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
      zIndex: 2,
    },
    mapTypeButtonContainer: {
      position: 'absolute',
      top: y,
      zIndex: 2,
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
      width: defaultButtonSize.width,
      zIndex: 2,
    },
    closeMapButtonOverlay: {
      position: 'absolute',
      marginBottom: hp('5%'),
      bottom: 0,
      width: defaultButtonSize.width,
      height: defaultButtonSize.height,
      zIndex: 2,
    },
    titleOverlay: {
      position: 'absolute',
      zIndex: 2,
      top: navbarHeight + navbarMarginTop + hp('2%'),
      width: titleBannerOptions.width,
      height: titleBannerOptions.height,
    },
    levelCompletedBanner: {
      zIndex: 2,
      position: 'absolute',
      marginBottom: bottomHeight + playButtonOverlayBottomMargin,
      bottom: 0,
    },
    mapboxLogo: {
      position: 'absolute',
      bottom: isIosAndNotch ? wp('10%') : isAndroid ? wp('3%') : wp('4%'),
      right: wp('2%'),
      zIndex: 1,
      width: hp('9%'),
      height: hp('9%') * 0.272727272727273,
    },
    mapcreditsText: {
      position: 'absolute',
      zIndex: 2,
      width: wp('100%'),
      height: hp('2%'),
      bottom: hp('35%'),
    },
  });
};

const styles = getStyles();
export {styles};

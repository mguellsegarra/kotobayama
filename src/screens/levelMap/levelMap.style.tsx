import {StyleSheet} from 'react-native';
import {
  isTablet,
  isIosAndNotch,
  wp,
  hp,
} from '@library/services/deviceService';
import {titleBannerOptions} from '@library/components/map/mapTitleBanner';

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
    titleOverlay: {
      position: 'absolute',
      top: navbarHeight + navbarMarginTop + hp('2%'),
      width: titleBannerOptions.width,
      height: titleBannerOptions.height,
    },
    levelCompletedBanner: {
      position: 'absolute',
      marginBottom: bottomHeight + playButtonOverlayBottomMargin,
      bottom: 0,
    },

  });
};

const styles = getStyles();
export {styles};

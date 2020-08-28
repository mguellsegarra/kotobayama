import {StyleSheet} from 'react-native';
import colors from '../../styles/colors.style';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const getStyles = () => {
  const navbarHeight = hp('7%');
  const bottomHeight = hp('30%');

  const titleBannerWidth = hp('42%');
  const titleBannerConstant = 0.2922;
  const titleHeight = titleBannerWidth * titleBannerConstant;

  const topButtonSize = hp('5%');
  const buttonMargin = hp('1%');

  const playButtonWidth = 180;
  const playButtonConstant = 0.3525;
  const playButtonHeight = playButtonWidth * playButtonConstant;

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
    disableMapOverlay: {
      position: 'absolute',
      top: 0,
      width: wp('100%'),
      height: hp('100%'),
    },
    bottomOverlay: {
      position: 'absolute',
      bottom: 0,
      width: wp('100%'),
      height: bottomHeight,
      backgroundColor: 'black',
    },
    titleOverlay: {
      position: 'absolute',
      top: 0,
      width: titleBannerWidth,
      marginTop: navbarHeight,
      height: titleHeight,
    },
    mapTitleContainerImage: {
      flex: 1,
      width: titleBannerWidth,
    },
    leftButtonOverlay: {
      position: 'absolute',
      width: topButtonSize,
      height: topButtonSize,
      top: 0,
      left: 0,
      margin: buttonMargin,
    },
    topButtonImage: {
      flex: 1,
      width: topButtonSize,
    },
    rightButtonOverlay: {
      position: 'absolute',
      width: topButtonSize,
      height: topButtonSize,
      top: 0,
      right: 0,
      margin: buttonMargin,
    },
    playButtonOverlay: {
      position: 'absolute',
      width: playButtonWidth,
      height: playButtonHeight,
      marginBottom: bottomHeight + playButtonOverlayBottomMargin,
      bottom: 0,
    },
    playButtonImage: {
      flex: 1,
      width: playButtonWidth,
    },
  });
};

export {getStyles};

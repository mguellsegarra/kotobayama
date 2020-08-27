import {StyleSheet} from 'react-native';
import colors from '../../styles/colors.style';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const getStyles = () => {
  const navbarHeight = hp('7%');
  const titleHeight = hp('12%');
  const bottomHeight = hp('30%');

  const titleBannerWidth = 300;
  const topButtonSize = 40;
  const playButtonHeight = 50;
  const playButtonWidth = 160;

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
      marginTop: navbarHeight,
      height: titleHeight,
      backgroundColor: 'blue',
    },
    bottomOverlay: {
      position: 'absolute',
      bottom: 0,
      width: wp('100%'),
      height: bottomHeight,
      backgroundColor: 'yellow',
    },
    leftButtonOverlay: {
      position: 'absolute',
      width: topButtonSize,
      height: topButtonSize,
      backgroundColor: 'pink',
      top: 0,
      left: 0,
      margin: 10,
    },
    rightButtonOverlay: {
      position: 'absolute',
      width: topButtonSize,
      height: topButtonSize,
      backgroundColor: 'green',
      top: 0,
      right: 0,
      margin: 10,
    },
    playButtonOverlay: {
      position: 'absolute',
      width: playButtonWidth,
      height: playButtonHeight,
      backgroundColor: 'orange',
      marginBottom: bottomHeight + 20,
      bottom: 0,
    },
  });
};

export {getStyles};

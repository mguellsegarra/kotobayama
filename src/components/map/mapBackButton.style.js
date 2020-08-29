import {StyleSheet} from 'react-native';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const getStyles = () => {
  const topButtonSize = hp('5%');
  const buttonMargin = hp('1%');

  return StyleSheet.create({
    leftButtonOverlay: {
      position: 'absolute',
      width: topButtonSize,
      height: topButtonSize,
      top: 0,
      left: 0,
      margin: buttonMargin,
    },
  });
};

export {getStyles};

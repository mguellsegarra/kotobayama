import {StyleSheet} from 'react-native';
import Colors from '../../styles/colors.style';
import Fonts from '../../styles/fonts.style';
import {isTablet} from 'react-native-device-info';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const getStyles = () => {
  return StyleSheet.create({
    container: {
      ...StyleSheet.absoluteFillObject,
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
  });
};

export {getStyles};

import {StyleSheet} from 'react-native';
import R from '@tegami/res';
import {isTablet} from 'react-native-device-info';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const getStyles: any = () => {
  return StyleSheet.create({
    background: {
      flex: 1,
      backgroundColor: 'red',
    },
    backButton: {
      marginLeft: 10,
    },
  });
};

export {getStyles};

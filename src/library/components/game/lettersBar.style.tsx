import {StyleSheet} from 'react-native';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const getStyles: any = () => {
  return StyleSheet.create({
    row: {
      flex: 1,
      flexDirection: 'row',
      width: wp('100%'),
      justifyContent: 'center',
      alignItems: 'center',
    },
    bottomMargin: {
      flex: 0.3,
    },
  });
};

export {getStyles};

import {StyleSheet} from 'react-native';
import Fonts from '../../styles/fonts.style';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const getStyles: any = () => {
  const fontSize = hp('1.3%');

  return StyleSheet.create({
    buttonText: {
      fontFamily: Fonts.alata,
      fontSize: fontSize,
      color: 'white',
      textAlign: 'center',
    },
  });
};

export {getStyles};

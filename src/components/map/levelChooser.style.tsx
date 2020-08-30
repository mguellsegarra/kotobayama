import {StyleSheet} from 'react-native';
import Fonts from '../../styles/fonts.style';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const getStyles: any = () => {
  // const fontSize = hp('1.3%');
  const bottomHeight = hp('35%');
  const levelBarHeight = bottomHeight * 0.2;
  const levelChooserNumberWidth = hp('10%');
  const levelChooserNumberConstant = 0.322420634920635;
  const levelChooserNumberHeight =
    levelChooserNumberWidth * levelChooserNumberConstant;
  const levelChooserNumberMarginTop = levelChooserNumberHeight * 0.1;
  const levelChooserFont = hp('1.5%');

  return StyleSheet.create({
    container: {
      flex: 1,
      position: 'absolute',
      bottom: 0,
      width: wp('100%'),
      height: bottomHeight,
      backgroundColor: 'black',
    },
    levelBar: {
      height: levelBarHeight,
      width: wp('100%'),
      backgroundColor: 'black',
    },
    levelBarFlex: {
      flex: 1,
      flexDirection: 'row',
    },
    levelBarArrow: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    levelBarMiddle: {
      flex: 5,
      alignItems: 'center',
      justifyContent: 'center',
    },
    levelChooserImage: {
      width: levelChooserNumberWidth,
      height: levelChooserNumberHeight,
      alignItems: 'center',
      justifyContent: 'center',
    },
    levelChooserText: {
      textAlign: 'center',
      fontFamily: Fonts.league,
      color: 'white',
      fontSize: levelChooserFont,
    },
  });
};

export {getStyles};

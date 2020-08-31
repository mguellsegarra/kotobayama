import {StyleSheet} from 'react-native';
import R from '@res';

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
  const levelChooserFont = hp('1.5%');

  const photoFrameWidth = bottomHeight * 0.95;
  const photoFrameConstant = 0.626373626373626;
  const photoFrameHeight = photoFrameWidth * photoFrameConstant;
  const photoFramePicResizeConstant = 0.98;

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
      fontFamily: R.fonts.league,
      color: 'white',
      fontSize: levelChooserFont,
    },
    levelDetails: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      // backgroundColor: 'red',
    },
    levelDetailsImage: {
      // backgroundColor: 'yellow',
      width: photoFrameWidth,
      height: photoFrameHeight,
    },
    levelDetailsImageFrame: {
      width: photoFrameWidth,
      height: photoFrameHeight,
      zIndex: 2,
    },
    levelDetailsImagePic: {
      width: photoFrameWidth * photoFramePicResizeConstant,
      height: photoFrameHeight * photoFramePicResizeConstant,
      position: 'absolute',
      zIndex: 1,
      borderRadius: 20,
      overflow: 'hidden',
    },

    levelDetailsRight: {},
  });
};

export {getStyles};

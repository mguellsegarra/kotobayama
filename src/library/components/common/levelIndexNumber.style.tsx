import {StyleSheet} from 'react-native';
import {Fonts} from '@res/R';

import {wp, hp} from '@library/services/deviceService';

const getStyles: any = () => {
  const levelChooserNumberWidth = hp('10%');
  const levelChooserNumberConstant = 0.322420634920635;
  const levelChooserNumberHeight =
    levelChooserNumberWidth * levelChooserNumberConstant;
  const levelChooserFont = hp('1.5%');

  return StyleSheet.create({
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

const styles = getStyles();

export {styles};

import {StyleSheet} from 'react-native';
import R, {Fonts} from '@res/R';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const getStyles: any = () => {
  return StyleSheet.create({
    background: {
      flex: 1,
      backgroundColor: '#000000dd',
      alignItems: 'center',
      justifyContent: 'center',
    },
    container: {
      // flex: 1,
      // flexDirection: 'column',
    },
    top: {
      flex: 1,
      backgroundColor: 'red',
    },
    middle: {
      flex: 1,
      backgroundColor: 'green',
    },
    bottom: {
      flex: 1,
      backgroundColor: 'blue',
    },
  });
};

const styles = getStyles();

export {styles};

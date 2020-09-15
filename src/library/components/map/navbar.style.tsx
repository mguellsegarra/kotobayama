import {StyleSheet} from 'react-native';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';

const getStyles = () => {
  return StyleSheet.create({
    navBarLeft: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'flex-start',
    },
    navBarRight: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'flex-end',
    },
    navBarMiddle: {
      flex: 2,
      justifyContent: 'center',
      alignItems: 'center',
    },
    backButton: {
      width: hp('5%'),
      height: hp('5%'),
      marginLeft: 4,
    },
  });
};

const styles = getStyles();

export {styles};

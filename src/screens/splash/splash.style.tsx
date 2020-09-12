import {StyleSheet} from 'react-native';
import {Colors} from '@res/R';

const getStyles = () => {
  const k = 1.023569023569024;

  return StyleSheet.create({
    background: {
      flex: 1,
      backgroundColor: Colors.ondoriRed,
      justifyContent: 'center',
      alignItems: 'center',
    },
    logo: {
      width: 180 * k,
      height: 180,
      marginBottom: 100,
    },
  });
};

const styles = getStyles();

export {styles};

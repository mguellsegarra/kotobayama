/**
 * @format
 * @flow strict-local
 */
import {StyleSheet} from 'react-native';
import R from '@res/R';

const getStyles = () =>
  StyleSheet.create({
    background: {
      flex: 1,
      backgroundColor: R.colors.ondoriRed,
      justifyContent: 'center',
      alignItems: 'center',
    },
    logo: {
      height: 180,
      marginBottom: 100,
    },
  });

export {getStyles};

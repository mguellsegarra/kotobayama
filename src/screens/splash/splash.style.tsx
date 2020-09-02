/**
 * @format
 * @flow strict-local
 */
import {StyleSheet} from 'react-native';
import {Colors} from '@res/R';

const getStyles = () =>
  StyleSheet.create({
    background: {
      flex: 1,
      backgroundColor: Colors.ondoriRed,
      justifyContent: 'center',
      alignItems: 'center',
    },
    logo: {
      height: 180,
      marginBottom: 100,
    },
  });

export {getStyles};

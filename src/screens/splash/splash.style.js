/**
 * @format
 * @flow strict-local
 */
import {StyleSheet} from 'react-native';
import colors from '../../styles/colors.style';

const getStyles = () =>
  StyleSheet.create({
    background: {
      flex: 1,
      backgroundColor: colors.ondoriRed,
      justifyContent: 'center',
      alignItems: 'center',
    },
    logo: {
      height: 180,
      marginBottom: 100,
    },
  });

export {getStyles};

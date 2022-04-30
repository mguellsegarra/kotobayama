import {StyleSheet} from 'react-native';

const getStyles: any = () => {
  return StyleSheet.create({
    background: {
      flex: 1,
    },
    navBar: {
      flex: 1,
      flexDirection: 'row',
    },
    titleBar: {
      flex: 1.3,
      justifyContent: 'center',
      alignItems: 'center',
    },
    photoBar: {
      flex: 5,
      justifyContent: 'center',
      alignItems: 'center',
    },
    powerUpsBar: {
      flex: 2,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    solutionBar: {
      flex: 3,
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
    },
    lettersBar: {
      flex: 3,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
};

const styles = getStyles();

export {styles};

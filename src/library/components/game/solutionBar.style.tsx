import {StyleSheet} from 'react-native';

import {wp, isTablet} from '@library/services/deviceService';

const getStyles: any = () => {
  return StyleSheet.create({
    row: {
      flex: 1,
      flexDirection: 'row',
      width: wp('100%'),
      justifyContent: 'center',
      alignItems: 'center',
    },
    bottomMargin: {
      flex: 0.3,
    },
  });
};

const getLetterSizeOptionsForWordLines = (wordLines: Array<string>) => {
  const maxLetterSize = isTablet() ? wp('10%') : wp('12%');
  const margin = wp('0.7%');

  let longestWord = wordLines[0];

  if (wordLines.length > 1 && wordLines[1].length > wordLines[0].length) {
    longestWord = wordLines[1];
  }

  const longestWordLength = longestWord.length;

  const letterSize =
    (wp('90%') - longestWordLength * margin) / longestWordLength;

  return {
    letterSize: letterSize > maxLetterSize ? maxLetterSize : letterSize,
    margin,
  };
};

const styles = getStyles();

export {styles, getStyles, getLetterSizeOptionsForWordLines};

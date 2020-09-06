import {
  CharactersMap,
  CharactersMapObject,
} from '@library/components/game/solutionBar';
import {SolutionLetterState} from '@library/components/game/solutionLetter';

const getInitialCharacterMap = (word: string) => {
  const characterMap: CharactersMap = {};
  let idx = 0;

  Array.from(word.replace(' ', '')).forEach((char: string) => {
    characterMap[idx] = {
      character: '',
      availableLetterId: null,
      letterState: SolutionLetterState.Empty,
    };
    idx += 1;
  });

  return characterMap;
};

const isCharacterMapFull = (characterMap: CharactersMap, word: string) => {
  return (
    Object.values(characterMap)
      .map((element: CharactersMapObject) => {
        return element.character;
      })
      .join('').length === word.replace(' ', '').length
  );
};

const isWordCorrect = (characterMap: CharactersMap, word: string) => {
  return (
    Object.values(characterMap)
      .map((element: CharactersMapObject) => {
        return element.character;
      })
      .join('')
      .toUpperCase() === word.replace(' ', '').toUpperCase()
  );
};

const getFirstCharacterMapEmptyPos = (characterMap: CharactersMap) => {
  let foundPos = 0,
    idx = 0,
    found = false;

  Object.values(characterMap).forEach((element: CharactersMapObject) => {
    if (element.character === '' && !found) {
      foundPos = idx;
      found = true;
    }
    idx += 1;
  });

  return foundPos;
};

export {
  isCharacterMapFull,
  getFirstCharacterMapEmptyPos,
  getInitialCharacterMap,
  isWordCorrect
};

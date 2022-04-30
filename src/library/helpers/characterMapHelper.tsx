import {CharactersMap} from '@library/components/game/solutionBar';
import {
  SolutionLetterState,
  SolutionLetterType,
} from '@library/models/solutionLetter';

const getInitialCharacterMap = (word: string) => {
  const characterMap: CharactersMap = new Map();
  let idx = 0;

  Array.from(word.replace(' ', '')).forEach((char: string) => {
    characterMap.set(idx.toString(), {
      id: idx.toString(),
      character: '',
      availableLetterId: null,
      letterState: SolutionLetterState.Empty,
    });
    idx += 1;
  });

  return characterMap;
};

const isCharacterMapFull = (characterMap: CharactersMap, word: string) => {
  return (
    Array.from(characterMap, ([name, value]) => (value))
      .map((element: SolutionLetterType) => {
        return element.character;
      })
      .join('').length === word.replace(' ', '').length
  );
};

const isWordCorrect = (characterMap: CharactersMap, word: string) => {
  return (
    Array.from(characterMap, ([name, value]) => (value))
      .map((element: SolutionLetterType) => {
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

  for (let element of characterMap.values()) {
    if (element.character === '' && !found) {
      foundPos = idx;
      found = true;
    }
    idx += 1;
  }

  return foundPos;
};

export {
  isCharacterMapFull,
  getFirstCharacterMapEmptyPos,
  getInitialCharacterMap,
  isWordCorrect,
};

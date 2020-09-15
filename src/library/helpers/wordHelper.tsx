import {SolutionLetterType} from '@library/models/solutionLetter';

const vocals = 'AEIOU';
const consonants = 'BCDFGHJKLMNPQRSTVWXYZ';

type WordServiceType = {
  shuffle: Function;
  getLettersForWord: Function;
  getRandomCharacter: Function;
  getRandomSolveLetter: Function;
};

const WordService: WordServiceType = {
  shuffle: (array: Array<string>) => {
    var currentIndex = array.length,
      temporaryValue,
      randomIndex;

    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  },
  getLettersForWord: (word: string) => {
    const totalLetters = [];
    const wordWithoutSpace = word.replace(' ', '');
    const wordLength = wordWithoutSpace.length;
    const numberOfRandomLetters = 14 - wordLength;

    for (let i = 0; i < wordWithoutSpace.length; i += 1) {
      totalLetters.push(wordWithoutSpace.substr(i, 1).toUpperCase());
    }

    const numberOfRandomVocals =
      numberOfRandomLetters % 2 === 0
        ? numberOfRandomLetters / 2
        : (numberOfRandomLetters + 1) / 2;
    const numberOfRandomConsonants =
      numberOfRandomLetters - numberOfRandomVocals;

    for (let i = 0; i < numberOfRandomVocals; i += 1) {
      totalLetters.push(WordService.getRandomCharacter(vocals));
    }

    for (let i = 0; i < numberOfRandomConsonants; i += 1) {
      totalLetters.push(WordService.getRandomCharacter(consonants));
    }

    return WordService.shuffle(totalLetters);
  },
  getRandomCharacter: (characters: string) => {
    return characters.charAt(Math.floor(Math.random() * characters.length));
  },
  getRandomSolveLetter: ({
    word,
    boughtLetters,
    getAvailableLetterWithChar,
  }: {
    word: string;
    boughtLetters: Array<SolutionLetterType>;
    getAvailableLetterWithChar: Function;
  }) => {
    const cleanWord = word.replace(' ', '').toUpperCase();
    const wordBoughtLetters: any = cleanWord.split('').map((character) => {
      return {bought: false, character};
    });

    boughtLetters.forEach((boughtLetter) => {
      wordBoughtLetters[boughtLetter.id] = {
        bought: true,
        character: boughtLetter.character,
      };
    });

    const wordWithWildcards = cleanWord.split('');

    const wordMinusBoughtLetters = wordBoughtLetters.filter(
      (element: any, idx: number) => {
        if (element.bought) {
          wordWithWildcards[idx] = '*';
        }
        return !element.bought;
      },
    );

    const randomIndex = Math.floor(
      Math.random() * wordMinusBoughtLetters.length,
    );
    const randomLetter = wordMinusBoughtLetters[randomIndex].character;
    const position = wordWithWildcards.indexOf(randomLetter);

    const availableLetterId = getAvailableLetterWithChar(randomLetter).id;

    return {randomLetter, position, availableLetterId};
  },
};

export default WordService;

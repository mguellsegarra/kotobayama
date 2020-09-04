const vocals = 'AEIOU';
const consonants = 'BCDFGHJKLMNPQRSTVWXYZ';

type WordServiceType = {
  shuffle: Function;
  getLetterLinesForWord: Function;
  getRandomCharacter: Function;
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
  getLetterLinesForWord: (word: string) => {
    const letterLines = [];
    const totalLetters = [];
    const wordWithoutSpace = word.replace(' ', '');
    const wordLength = wordWithoutSpace.length;
    const numberOfRandomLetters = 14 - wordLength;

    for (let i = 0; i < wordWithoutSpace.length; i += 1) {
      totalLetters.push(wordWithoutSpace.substr(i, 1));
    }

    const numberOfRandomVocals =
      numberOfRandomLetters % 2
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

    const shuffledLetters = WordService.shuffle(totalLetters);

    const line1 = [];
    const line2 = [];

    for (let i = 0; i < 7; i += 1) {
      line1.push(shuffledLetters[i]);
    }

    for (let i = 7; i < 14; i += 1) {
      line2.push(shuffledLetters[i]);
    }

    letterLines.push(line1);
    letterLines.push(line2);

    return letterLines;
  },
  getRandomCharacter: (characters: string) => {
    return characters.charAt(Math.floor(Math.random() * characters.length));
  },
};

export default WordService;

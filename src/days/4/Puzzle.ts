import { MinQueue } from 'heapify';

const first = (input: string) => {
  return input
    .split('\n')
    .map((line: string) => {
      line = line.split(':')[1];
      const lineSplit = line.split('|');
      const winningValues = new Set(lineSplit[0].split(' ').map(stringValue => parseInt(stringValue, 10) || 0));
      const numbers = lineSplit[1].split(' ').map(stringValue => parseInt(stringValue, 10));
      let numbersInWinningValues = 0;
      
      for (const number of numbers) {
        if (winningValues.has(number)) {
          numbersInWinningValues++;
        }
      }
      return (numbersInWinningValues > 1) ? 2 << (numbersInWinningValues - 2) : numbersInWinningValues;
    })
    .reduce((sum, val: number) => sum + val || 0, 0);
};

const expectedFirstSolution = 'solution 1';

type Cards = {
  [id: number]: {
    score: number | null,
    copies: number,
  }
}
const second = (input: string) => {
  const cards: Cards = {};
  const lines = input.split('\n');
  lines.forEach(line => {
    const lineSplit = line.split(':');
    const number = parseInt(lineSplit[0].split(/\ +/)[1], 10);
    cards[number] = { score: null, copies: 0 };
  });

  lines
    .forEach(line => {
      const lineSplit = line.split(':');
      const number = parseInt(lineSplit[0].split(/\ +/)[1], 10);
      const lineSplitSplit = lineSplit[1].split('|');
      const winningValues = new Set(lineSplitSplit[0].split(' ').map(stringValue => parseInt(stringValue, 10) || 0));
      const numbers = lineSplitSplit[1].split(' ').map(stringValue => parseInt(stringValue, 10) || 0);

      let numbersInWinningValues = 0;
      
      for (const number of numbers) {
        if (winningValues.has(number)) {
          numbersInWinningValues++;
        }
      }
      cards[number].score = (numbersInWinningValues > 1) ? 2 << (numbersInWinningValues - 2) : numbersInWinningValues;
      cards[number].copies++;
      for (let i = number + 1; i < number + 1 + numbersInWinningValues; i++) {
        if (cards[i]) {
          cards[i].copies += cards[number].copies;
        }
      }
    });
  
  return Object.values(cards).reduce((sum, card) => sum + (card.copies), 0);
};

const expectedSecondSolution = 'solution 2';

export { first, expectedFirstSolution, second, expectedSecondSolution };

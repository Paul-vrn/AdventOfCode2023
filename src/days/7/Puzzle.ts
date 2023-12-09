import PriorityQueue from 'ts-priority-queue';

type Hand = {
  cards: string[],
  score: number
};

const cardValues: Record<string, number> = {
  'A': 14,
  'K': 13,
  'Q': 12,
  'J': 11,
  'T': 10,
  '9': 9,
  '8': 8,
  '7': 7,
  '6': 6,
  '5': 5,
  '4': 4,
  '3': 3,
  '2': 2,
};

const first = (input: string) => {
  const queue = new PriorityQueue<Hand>({ comparator: handComparator });
  input
    .split('\n')
    .forEach(line => {
      const lineSplit = line.split(' ');
      const hand: Hand = {
        cards: lineSplit[0].split(''),
        score: parseInt(lineSplit[1]),
      };
      queue.queue(hand);
    });
  let result = 0;
  let i = 1;
  while (queue.length > 0) {
    const hand = queue.dequeue();
    result += hand.score*i;
    i++;
  }
  return result;
};

const expectedFirstSolution = '248113761';

const second = (input: string) => {
  cardValues['J'] = 1;
  const queue = new PriorityQueue<Hand>({ comparator: handComparator2 });
  input
    .split('\n')
    .forEach(line => {
      const lineSplit = line.split(' ');
      const hand: Hand = {
        cards: lineSplit[0].split(''),
        score: parseInt(lineSplit[1]),
      };
      queue.queue(hand);
    });
  let result = 0;
  let i = 1;
  while (queue.length > 0) {
    const hand = queue.dequeue();
    result += hand.score*i;
    i++;
  }
  return result;
};

const expectedSecondSolution = '246285222';

export { first, expectedFirstSolution, second, expectedSecondSolution };


const handComparator = (a: Hand, b: Hand) => {
  const evalA = evaluateHand(a);
  const evalB = evaluateHand(b);
  if (evalA !== evalB) {
    return evalA - evalB;
  }
  return compareLevels(a.cards, b.cards);
};

const handComparator2 = (a: Hand, b: Hand) => {
  const evalA = evaluateHand2(a);
  const evalB = evaluateHand2(b);
  if (evalA !== evalB) {
    return evalA - evalB;
  }
  return compareLevels(a.cards, b.cards);
};

const evaluateHand2 = (hand: Hand) => {
  const counts = new Map<string, number>();
  hand.cards
  .filter(card => card !== 'J')
  .forEach(card => {
    counts.set(card, (counts.get(card) || 0) + 1);
  });

  const frequencies = Array.from(counts.values()).sort((a, b) => b - a);
  const freqJ = hand.cards.filter(card => card === 'J').length;
  let score;

  if (frequencies[0] === 5) score = 50;
  else if (frequencies[0] === 4) score = 40;
  else if (frequencies[0] === 3 && frequencies[1] === 2) score = 35;
  else if (frequencies[0] === 3) score = 30;
  else if (frequencies[0] === 2 && frequencies[1] === 2) score = 25;
  else if (frequencies[0] === 2) score = 20;
  else if (frequencies[0] === 1) score = 10;
  else score = 0;

  score += (freqJ * 10);
  return score;
};

const evaluateHand = (hand: Hand) => {
  const counts = new Map<string, number>();
  hand.cards
  .forEach(card => {
    counts.set(card, (counts.get(card) || 0) + 1);
  });

  const frequencies = Array.from(counts.values()).sort((a, b) => b - a);

  // Five of a kind
  if (frequencies[0] === 5) return 8000000;
  // Four of a kind
  if (frequencies[0] === 4) return 7000000;
  // Full house
  if (frequencies[0] === 3 && frequencies[1] === 2) return 6000000;
  // Three of a kind
  if (frequencies[0] === 3) return 5000000;
  // Two pair
  if (frequencies[0] === 2 && frequencies[1] === 2) return 4000000;
  // One pair
  if (frequencies[0] === 2) return 3000000;

return 2000000;
};

const compareLevels = (a: string[], b: string[]) => {
  let i = 0;
  while (i < a.length && i < b.length) {
    if (a[i] !== b[i]) {
      return cardValues[a[i]] - cardValues[b[i]];
    }
    i++;
  }
  return 0;
};

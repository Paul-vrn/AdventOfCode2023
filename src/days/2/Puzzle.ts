const maxColors: Record<string, number> = {
  'red': 12,
  'green': 13,
  'blue': 14,
};
const first = (input: string) => {
  
  return input
    .split('\n')
    .map(line => {
      const lineSplit = line.split(':');
      const gameId = lineSplit[0].split(' ')[1];
      const games = lineSplit[1].split(';');
      const isGameValid = games.map((party: string) => {
        const values = party.split(',');
        for (const value of values) {
          const valueSplit = value.trim().split(' ');
          if (maxColors[valueSplit[1]] < parseInt(valueSplit[0])) {
            return false;
          }
        }
        return true;
      })
        .reduce((isValid, gameValid) => isValid && gameValid, true);
      if (isGameValid) {
        return parseInt(gameId, 10);
      }
    })
    .reduce((sum, val) => sum + (val || 0), 0);
};

const expectedFirstSolution = 'solution 1';

const second = (input: string) => {
  return input
  .split('\n')
  .map(line => {
    const lineSplit = line.split(':');
    const games = lineSplit[1].split(';');
    const minColors: Record<string, number> = {
      'red': 0,
      'green': 0,
      'blue': 0,
    };
    for (const party of games) {
      const values = party.split(',');
      for (const value of values) {
        const valueSplit = value.trim().split(' ');
        const valueInt = parseInt(valueSplit[0]);
        if (minColors[valueSplit[1]] < valueInt) {
          minColors[valueSplit[1]] = valueInt;
        }
      }
    }
    return minColors['red'] * minColors['green'] * minColors['blue'];
  })
    .reduce((sum, val) => sum + (val || 0), 0);
};

const expectedSecondSolution = 'solution 2';

export { first, expectedFirstSolution, second, expectedSecondSolution };

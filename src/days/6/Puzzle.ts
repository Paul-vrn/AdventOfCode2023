const first = (input: string) => {
  let result = 1;
  const inputSplit = input.split('\n');
  const times = inputSplit[0].split(':')[1].split(/\ +/).filter(val => val !== '').map(valString => parseInt(valString));
  const distances = inputSplit[1].split(':')[1].split(/\ +/).filter(val => val !== '').map(valString => parseInt(valString));
  for (let i = 0; i < times.length; i++) {
    let count = 0;
    const time = times[i];
    const distance = distances[i];
    for (let j = 1; j < time; j++) {
      if ((time - j) * j >= distance) {
        count++;
      }
    }
    result *= count;
  }
  return result;
};

const expectedFirstSolution = '440000';

const second = (input: string) => {
  const inputSplit = input.split('\n');
  const time = parseInt(inputSplit[0].split(':')[1].replaceAll(' ', ''));
  const distance = parseInt(inputSplit[1].split(':')[1].replaceAll(' ', ''));
  let count = 0;
  for (let j = 1; j < time; j++) {
    if ((time - j) * j >= distance) {
      count++;
    }
  }
  return count;
};

const expectedSecondSolution = '26187338';

export { first, expectedFirstSolution, second, expectedSecondSolution };

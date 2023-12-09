type Nodes = {
  [id: string]: {
    [direction: string]: string
  }
}

const first = (input: string) => {
  const nodes: Nodes = {};
  const lines = input.split('\n');
  const instructions = lines[0].split('');

  for (let i = 2; i < lines.length; i++) {
    const line = lines[i];
    const lineSplit = line.split(' = ');
    nodes[lineSplit[0]] = {
      'L': lineSplit[1].substring(1, 4),
      'R': lineSplit[1].substring(6, 9),
    };
  }
  let step = 0;
  let current = 'AAA';
  while (current !== 'ZZZ') {
    for (const direction of instructions) {
      current = nodes[current][direction];
      step++;
    }
  }
  return step;
};

const expectedFirstSolution = '14429';

const second = (input: string) => {
  const nodes: Nodes = {};
  const lines = input.split('\n');
  const instructions = lines[0].split('');
  let currentNodes: string[] = [];

  for (let i = 2; i < lines.length; i++) {
    const line = lines[i];
    const lineSplit = line.split(' = ');
    nodes[lineSplit[0]] = {
      'L': lineSplit[1].substring(1, 4),
      'R': lineSplit[1].substring(6, 9),
    };
    if (lineSplit[0].charAt(2) === 'A') {
      currentNodes.push(lineSplit[0]);
    }
  }
  console.log(currentNodes);
  const result = [];
  let step = 0;
  while (currentNodes.length > 0) {
    for (const direction of instructions) {
      for (let i = 0; i < currentNodes.length; i++) {
        currentNodes[i] = nodes[currentNodes[i]][direction];
      }
      step++;
    }
    const nbNodesBefore = currentNodes.length;
    currentNodes = currentNodes.filter(node => node.charAt(2) !== 'Z');
    console.log(currentNodes);
    if (nbNodesBefore > currentNodes.length) {
      for (let i = 0; i < nbNodesBefore - currentNodes.length; i++) {
        result.push(step);
      }
    }
  }
  return lcmArray(result);
};

const expectedSecondSolution = '10921547990923';

export { first, expectedFirstSolution, second, expectedSecondSolution };


function gcd(a: number, b: number): number {
  while (b !== 0) {
      const t = b;
      b = a % b;
      a = t;
  }
  return a;
}

function lcm(a: number, b: number): number {
  return Math.abs(a * b) / gcd(a, b);
}

function lcmArray(arr: number[]): number {
  return arr.reduce((acc, val) => lcm(acc, val), 1);
}

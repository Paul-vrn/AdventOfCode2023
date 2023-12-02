const patternNumber = /\d/;
const SPELLED_DIGITS: Record<string, string> = {
  'one': '1',
  'two': '2',
  'three': '3',
  'four': '4',
  'five': '5',
  'six': '6',
  'seven': '7',
  'eight': '8',
  'nine': '9',
};
const first = (input: string) => {
  return input
    .split('\n')
    .map((line: string) => {
      let p1 = 0;
      let p2 = line.length - 1;
      let a = null, b = null;
      while (p1 <= p2) {
        if (a === null) {
          a = getNumber(line, p1);
          p1++;
        }
        if (b === null) {
          b = getNumber(line, p2);
          p2--;
        }

        if (a && b) {
          return parseInt(`${a}${b}`, 10);
        }
      }
      if (!a && b) {
        a = b;
      }
      if (!b && a) {
        b = a;
      }
    
      return parseInt(`${a}${b}`, 10);
    })
    .reduce((sum, val) => sum + (val || 0), 0);
};

const expectedFirstSolution = '56042';

const second = (input: string) => {
  return input
    .split('\n')
    .map((line: string) => {
      let p1 = 0;
      let p2 = line.length - 1;
      let a = null, b = null;
      while (p1 <= p2) {
        if (a === null) {
          a = getNumberAndTextNumber(line, p1);
          p1++;
        }
        if (b === null) {
          b = getNumberAndTextNumber(line, p2);
          p2--;
        }

        if (a && b) {
          return parseInt(`${a}${b}`, 10);
        }
      }
      if (!a && b) {
        a = b;
      }
      if (!b && a) {
        b = a;
      }
    
      return parseInt(`${a}${b}`, 10);
    })
    .reduce((sum, val) => sum + (val || 0), 0);
};

const expectedSecondSolution = '55358';

function getNumber(line: string, index: number): string {
  if (line[index].match(patternNumber)) {
    return line[index];
  }
  return null;
}
function getNumberAndTextNumber(line: string, index: number): string {
  const val = getNumber(line, index);
  if (val !== null) {
    return val;
  }

  for (const key in SPELLED_DIGITS) {
    if (index + key.length > line.length) {
      continue;
    }
    if (line.substring(index, index + key.length) === key) {
      return SPELLED_DIGITS[key] || null;
    }
  }
  return null;
}

export { first, expectedFirstSolution, second, expectedSecondSolution };

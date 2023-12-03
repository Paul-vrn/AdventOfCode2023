const patternNumber = /\d/;

const first = (input: string) => {
  const matrix = input.split('\n');
  let result = 0;
  for (let i = 0; i < matrix.length; i++) {
    result += parseLine(matrix, i);
  }

  return result;
};

const expectedFirstSolution = 'solution 1';

const second = (input: string) => {
  const matrix = input.split('\n');
  let result = 0;
  for (let i = 0; i < matrix.length; i++) {
    result += parseLineGear(matrix, i);
  }

  return result;
};

const expectedSecondSolution = 'solution 2';

export { first, expectedFirstSolution, second, expectedSecondSolution };


const parseLine = (matrix: string[], index: number): number => {
  const line = matrix[index];
  let lineResult = 0;
  let i = 0;
  let startIndex, endIndex;
  while (i < line.length) {
    if (!line.charAt(i).match(patternNumber)) {
      i++;
    } else {
      startIndex = i;
      while (line.charAt(i).match(patternNumber)) {
        i++;
      }
      endIndex = i;
      lineResult += parseNumber(matrix, index, startIndex, endIndex);;
    }
  }
  return lineResult;
};


const parseNumber = (matrix: string[], lineIndex: number, startIndex: number, endIndex: number): number => {
  let start;
  let end;
  if (startIndex > 0) {
    start = startIndex - 1;
    if (matrix[lineIndex].charAt(start) !== '.') {
      return parseInt(matrix[lineIndex].substring(startIndex, endIndex));
    }
  } else {
    start = startIndex;
  }
  if (endIndex < matrix[lineIndex].length - 1) {
    end = endIndex;
    if (matrix[lineIndex].charAt(end) !== '.') {
      return parseInt(matrix[lineIndex].substring(startIndex, endIndex));
    }
  } else {
    end = endIndex - 1;
  }
  if (lineIndex > 0) {
    for (let i = start; i <= end; i++) {
      if (matrix[lineIndex-1].charAt(i) !== '.') {
        return parseInt(matrix[lineIndex].substring(startIndex, endIndex));
      }
    }
  }
  if (lineIndex < matrix.length - 1) {
    for (let i = start; i <= end; i++) {
      if (matrix[lineIndex+1].charAt(i) !== '.') {
        return parseInt(matrix[lineIndex].substring(startIndex, endIndex));
      }
    }
  }

  return 0;
};

const parseLineGear = (matrix: string[], index: number): number => {
  const line = matrix[index];
  let lineResult = 0;
  let i = 0;
  while (i < line.length) {
    if (line.charAt(i) === '*') {
      lineResult += parseGear(matrix, index, i);
    }
    i++;
  }
  return lineResult;
};

const parseGear = (matrix: string[], lineIndex: number, index: number): number => {
  const numbers = new Set<number>();
  if (lineIndex > 0) {
    for (let i = index-1; i <= index+1; i++) {
      if (matrix[lineIndex-1].charAt(i).match(patternNumber)) {
        numbers.add(getNumber(matrix[lineIndex-1], i));
      }
    }
  }
  
  if (index > 0) {
    numbers.add(getNumber(matrix[lineIndex], index - 1));
  }
  
  if (index <= matrix[lineIndex].length) {
    numbers.add(getNumber(matrix[lineIndex], index + 1));
  }

  if (lineIndex < matrix[lineIndex].length) {
    for (let i = index-1; i <= index+1; i++) {
      if (matrix[lineIndex+1].charAt(i).match(patternNumber)) {
        numbers.add(getNumber(matrix[lineIndex+1], i));
      }
    }
  }
  numbers.delete(0);
  if (numbers.size === 2) {
    const vals: number[] = Array.from(numbers);
    return vals[0] * vals[1];
  } else {
    return 0;
  }
};

const getNumber = (line: string, i: number): number => {
  let start = i, end = i;
  while (line.charAt(start).match(patternNumber)) {
    start--;
  }
  while (line.charAt(end).match(patternNumber)) {
    end++;
  }
  return parseInt(line.substring(start+1, end), 10) || 0;
};

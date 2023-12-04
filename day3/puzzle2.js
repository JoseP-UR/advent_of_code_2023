const fs = require('fs');

const input = fs.readFileSync('./input.txt', 'utf-8').split('\n');

function getParallelChars(element, index, num, lines) {
  return element.slice(
    index === 0 ? 0 : index - 1,
    Math.min(index + num.length + 1, lines[index].length)
  ).split('')
}

function getNeighbours(num, index, lines, lineIndex) {

  const topChars = lines[lineIndex - 1] ? getParallelChars(lines[lineIndex - 1], index, num, lines) : [];
  const bottomChars = lines[lineIndex + 1] ? getParallelChars(lines[lineIndex + 1], index, num, lines) : [];
  const leftChar = lines[lineIndex][index - 1];
  const rightChar = lines[lineIndex][index + num.length];

  return {
    topChars,
    leftChar,
    rightChar,
    bottomChars,
    all: [...topChars, leftChar, rightChar, ...bottomChars].filter(Boolean),
  };
}

function parseGears(
  gears,
  num,
  numIndex,
  lineIndex,
  neighbours
) {
  let position = '';

  if (neighbours.leftChar === '*') {
    position = `${numIndex - 1},${lineIndex}`;
  }

  if (neighbours.rightChar === '*') {
    position = `${numIndex + `${num}`.length},${lineIndex}`;
  }

  if (neighbours.topChars.includes('*')) {
    position = `${
      Math.max(numIndex - 1, 0) + neighbours.topChars.indexOf('*')
    },${lineIndex - 1}`;
  }

  if (neighbours.bottomChars.includes('*')) {
    position = `${
      Math.max(numIndex - 1, 0) + neighbours.bottomChars.indexOf('*')
    },${lineIndex + 1}`;
  }

  gears[position] = [...(gears[position] || []), num];

  return gears;
}

function getValidParts(inputLines) {
  let gears = {};

  for (let lineIndex = 0; lineIndex <= inputLines.length; lineIndex++) {
    const regex = /(\d+)/g;
    const line = inputLines[lineIndex];

    let match = null;
    while ((match = regex.exec(line))) {
      const numStr = match[0];
      const numIndex = match.index;

      const neighbours = getNeighbours(numStr, numIndex, inputLines, lineIndex);

      const isValid = neighbours.all.some(
        (char) => char !== '.' && isNaN(parseInt(char, 10))
      );

      if (isValid) {
        const num = parseInt(numStr, 10);

        const isGearPart = neighbours.all.some((char) => char === '*');
        if (isGearPart) {
          gears = parseGears(gears, num, numIndex, lineIndex, neighbours);
        }
      }
    }
  }

  const result = Object.values(gears).reduce((acc, nums) => {
    if (nums.length < 2) {
      return acc;
    }
    acc += nums.reduce((acc2, n) => acc2 * n, 1);
    return acc;
  }, 0);

  console.log(result);
}

getValidParts(input);
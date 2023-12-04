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

function sumValidNumbers(inputLines) {
  let sum = 0;

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
        sum += num;
      }
    }
  }

  console.log(sum);
}

sumValidNumbers(input);

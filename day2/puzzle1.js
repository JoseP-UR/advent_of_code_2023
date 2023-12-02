const fs = require('fs');


const MAX_RED_CUBES = 12;
const MAX_GREEN_CUBES = 13;
const MAX_BLUE_CUBES = 14;

const inputText = fs.readFileSync('./input.txt', 'utf-8');
const inputArray = inputText.split('\n');

function serializeGame(game) {
    const gameName = game.split(':')[0].trim();
    const gameData = game.split(':')[1].trim();
    const gameRounds = gameData.split(';').map((round) => round.trim());
    const gameDataObject = {
        gameNumber: Number(gameName.split(' ')[1]),
        rounds: []
    };

    gameRounds.forEach((round) => {
        const roundColors = round.split(',').map((color) => color.trim());
        const roundObject = {
            red: 0,
            green: 0,
            blue: 0
        };

        roundColors.forEach((color) => {
            const colorName = color.split(' ')[1];
            const colorCount = color.split(' ')[0];
            roundObject[colorName] = Number(colorCount);
        });

        
        gameDataObject.rounds.push(roundObject);
      });
      

    return gameDataObject;
}

function isRoundValid(round) {
  const redCount = round.red;
  const greenCount = round.green;
  const blueCount = round.blue;

  if (redCount > MAX_RED_CUBES || greenCount > MAX_GREEN_CUBES || blueCount > MAX_BLUE_CUBES) {
    return false;
  }

  return true;
}


function isGameValid(rounds) {
  let isValid = true;
  rounds.forEach((round) => {
    if (!isRoundValid(round)) {
      isValid = false;
    }
  });

  return isValid;
}

let gameIdSum = 0;

inputArray.forEach((game) => {
  const gameData = serializeGame(game);
  
  if (isGameValid(gameData.rounds)) {
    gameIdSum += gameData.gameNumber;
  }
});

console.log(gameIdSum);
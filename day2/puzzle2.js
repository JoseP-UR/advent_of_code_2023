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
function getMinimumRequiredCubes(rounds) {
  const minimumRequiredCubes = {
    red: 0,
    green: 0,
    blue: 0
  };

  rounds.forEach((round) => {
    minimumRequiredCubes.red = Math.max(minimumRequiredCubes.red, round.red);
    minimumRequiredCubes.green = Math.max(minimumRequiredCubes.green, round.green);
    minimumRequiredCubes.blue = Math.max(minimumRequiredCubes.blue, round.blue);
  });

  return minimumRequiredCubes;
}

let gameIdSum = 0;

let powerSum = 0;
inputArray.forEach((game) => {
  const gameData = serializeGame(game);
  const minimumRequiredCubes = getMinimumRequiredCubes(gameData.rounds);
  
  const roundPower = minimumRequiredCubes.red * minimumRequiredCubes.green * minimumRequiredCubes.blue;
  powerSum += roundPower;
});

console.log(powerSum);


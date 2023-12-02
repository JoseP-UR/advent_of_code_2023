const fs = require('fs')

const numberStrings = {
  'one': 1,
  'two': 2,
  'three': 3,
  'four': 4,
  'five': 5,
  'six': 6,
  'seven': 7,
  'eight': 8,
  'nine': 9
}

const regex = new RegExp(`${Object.keys(numberStrings).join('|')}|\\d`, 'g');

const getAnswer = async () => {
  const inputData = await fs.promises.readFile('./input.txt', 'utf8');

  const inputArray = inputData.split('\n')
  
  let sum = 0

  inputArray.forEach((element) => {
    let elementNumbers = [];

    for (let i = 0; i < element.length; i++) {
        for (let pattern of Object.keys(numberStrings)) {
            let regex = new RegExp(`${pattern}|\\d`, 'g');
            regex.lastIndex = i;
            let match = regex.exec(element);
            if (match && match.index === i) {
                elementNumbers.push(numberStrings[match[0]] ? numberStrings[match[0]] : match[0]);
                break;
            }
        }
    }
    console.log(elementNumbers)
    const firstNumber = elementNumbers[0]
    const lastNumber = elementNumbers[elementNumbers.length - 1]

    const twoDigitNumber = Number(`${firstNumber}${lastNumber}`)

    sum += twoDigitNumber
  })

  console.log(sum)
}



getAnswer()
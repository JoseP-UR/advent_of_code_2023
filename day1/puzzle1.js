const fs = require('fs')

const getAnswer = async () => {
  const inputData = await fs.promises.readFile('./input.txt', 'utf8');

  const inputArray = inputData.split('\n')
  
  let sum = 0

  inputArray.forEach((element) => {
    const elementNumbers = element.split('').filter((char) => !isNaN(char));
    const firstNumber = elementNumbers[0]
    const lastNumber = elementNumbers[elementNumbers.length - 1]

    const twoDigitNumber = Number(`${firstNumber}${lastNumber}`)

    sum += twoDigitNumber
  })

  console.log(sum)
}



getAnswer()
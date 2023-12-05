const fs = require('fs')

const input = fs.readFileSync('input.txt', 'utf8')

const cards = input.split('\n')


let sum = 0

cards.forEach((card) => {

  const cardName = card.split(':')[0].trim()
  const cardNumbers = card.split(':')[1].trim()
  
  const winningNumbers = cardNumbers.split('|')[0].trim().split(' ').filter((number) => number !== '')
  const playedNumbers = cardNumbers.split('|')[1].trim().split(' ').filter((number) => number !== '')

  let cardPoints = 0
  playedNumbers.forEach((playedNumber) => {
    if (winningNumbers.includes(playedNumber)) {
      if (cardPoints === 0) {
        cardPoints = 1
        return
      }
      cardPoints = cardPoints + cardPoints
    }
  })

  sum += cardPoints
})

console.log(sum)


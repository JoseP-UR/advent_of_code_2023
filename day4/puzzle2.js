const fs = require('fs')

const input = fs.readFileSync('input.txt', 'utf8')

const cards = input.split('\n')
const cardData = cards.map(card => {
  const [cardNumber, cardData] = card.split(':').map(str => str.trim())
  const id = parseInt(cardNumber.replace('Card ', ''))
  const [winners, owned] = cardData.split('|').map(str => str.trim())
  const winningNumbers = new Set(winners.split(' ').map(num => parseInt(num)).filter(num => !isNaN(num)))
  const playedNumbers = owned.split(' ').map(num => parseInt(num)).filter(num => !isNaN(num))
  
  const cardPoints = playedNumbers.filter(num => winningNumbers.has(num)).length || 0
  
  return {
    id, 
    winningNumbers, 
    playedNumbers, 
    cardPoints
  }
})

const cardArr = [...cardData]

for (let i = 0; i < cardArr.length; i++) {
  for (let j = 0; j < cardArr[i].cardPoints; j++) {
    cardArr.push(cardData[cardArr[i].id + j])
  }
}

console.log(cardArr.length)

const fs = require('fs')

const part1 = () => {
  const calcHandValue = (hand) => {
    let handValue = 0

    const handTypeValue = {
      5: 700_000_000, // FIVE_OF_A_KIND
      41: 600_000_000, // FOUR_OF_A_KIND
      32: 500_000_000, //  FULL_HOUSE
      311: 400_000_000, // THREE_OF_A_KIND
      221: 300_000_000, // TWO_PAIR
      2111: 200_000_000, // ONE_PAIR
      11111: 100_000_000 // HIGH_CARD
    }

    const eachCardCount = hand.reduce((acc, curr) => {
      return acc[curr] ? ++acc[curr] : acc[curr] = 1, acc
    }, {})
    const handDetermination = Object.values(eachCardCount).toSorted((a, b) => b - a).join('')
    handValue += handTypeValue[handDetermination]

    const cardSeparator = [759375, 50625, 3375, 225, 15] // base 15
    const cardToInt = (c) => ({ T: 10, J: 11, Q: 12, K: 13, A: 14})[c] || Number(c)

    hand.forEach((card, index) => handValue += (cardToInt(card) * cardSeparator[index]))
    return handValue
  }

  const input = fs.readFileSync('input.txt').toString().split(/\r?\n/).map(line => ({ 
    hand: line.split(" ")[0].split(''),
    bid: Number(line.split(" ")[1]),
    value: calcHandValue(line.split(" ")[0].split(''))
  }))

  const sorted = input.toSorted((a, b) => a.value - b.value)
  const totalWinnings = sorted.reduce((tW, hand, index) => tW + (hand.bid * (index+1)), 0)

  console.log(
    `[Part1] - Total winnings for every hand in set is: ${totalWinnings}`
  )
}

const part2 = () => {
  const calcHandValue = (hand) => {
    let handValue = 0

    const handTypeValue = {
      5: 700_000_000, // FIVE_OF_A_KIND
      41: 600_000_000, // FOUR_OF_A_KIND
      32: 500_000_000, //  FULL_HOUSE
      311: 400_000_000, // THREE_OF_A_KIND
      221: 300_000_000, // TWO_PAIR
      2111: 200_000_000, // ONE_PAIR
      11111: 100_000_000 // HIGH_CARD
    }

    const eachCardCount = hand.reduce((acc, curr) => {
      return acc[curr] ? ++acc[curr] : acc[curr] = 1, acc
    },{})

    const nrOfJokers = eachCardCount.J || 0
    if(nrOfJokers) {
      delete eachCardCount.J
      const [highestKey, ] = Object.entries(eachCardCount).reduce((highest, [key, value]) => {
        if(value > highest[1]) return [key, value]
        return highest
      }, [0, 0])

      if(nrOfJokers === 5) eachCardCount['k'] = 5
      else eachCardCount[highestKey] += nrOfJokers
    }

    const handDetermination = Object.values(eachCardCount).toSorted((a, b) => b - a).join('')
    handValue += handTypeValue[handDetermination]

    const cardSeparator = [759375, 50625, 3375, 225, 15] // base 15
    const cardToInt = (c) => ({ T: 10, J: 1, Q: 12, K: 13, A: 14})[c] || Number(c)

    hand.forEach((card, index) => handValue += (cardToInt(card) * cardSeparator[index]))
    return handValue
  }

  const input = fs.readFileSync('input.txt').toString().split(/\r?\n/).map(line => ({ 
    hand: line.split(" ")[0].split(''),
    bid: Number(line.split(" ")[1]),
    value: calcHandValue(line.split(" ")[0].split(''))
  }))

  const sorted = input.toSorted((a, b) => a.value - b.value)
  const totalWinnings = sorted.reduce((tW, hand, index) => tW + (hand.bid * (index+1)), 0)

  console.log(
    `[Part2] - Total winnings for every hand in set is: ${totalWinnings}`
  )
};

part1();
part2();

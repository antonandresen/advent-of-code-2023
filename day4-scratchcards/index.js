const fs = require('fs')

const part1 = () => {
  const input = fs.readFileSync('input.txt').toString().split(/\r?\n/).map(i => {
    const segments = i.split(/:|\|/)
    return {
      cardNumber: parseInt([...segments[0].matchAll(/\d+/g)].map(cn => cn[0])[0]),
      winningNumbers: [...segments[1].matchAll(/\d+/g)].map(wn => wn[0]),
      ownedNumbers: [...segments[2].matchAll(/\d+/g)].map(on => on[0])
    } 
  })

  const totalScratchCardPoints = input.reduce((scratchCardPoints, card) => {
    return scratchCardPoints + card.ownedNumbers.reduce((p, oNum) => {
      const win = card.winningNumbers.includes(oNum)
      if(!win) return p
      return p ? p * 2 : 1
    }, 0)
  }, 0)


  console.log(
    `[Part1] - Total scratch card points are: ${totalScratchCardPoints}`
  )
}

const part2 = () => {
  const input = fs.readFileSync('input.txt').toString().split(/\r?\n/).map(i => {
    const segments = i.split(/:|\|/)
    return {
      cardNumber: parseInt([...segments[0].matchAll(/\d+/g)].map(cn => cn[0])[0]),
      winningNumbers: [...segments[1].matchAll(/\d+/g)].map(wn => wn[0]),
      ownedNumbers: [...segments[2].matchAll(/\d+/g)].map(on => on[0])
    } 
  })

  // Init scratchCards hashmap
  const scratchCards = input.reduce((scratchCardsObj, card) => {
    scratchCardsObj[card.cardNumber] = 1
    return scratchCardsObj
  }, {})

  // Calculate amounts
  input.forEach(card => {
    const winAmount = card.ownedNumbers.reduce((p, oNum) => card.winningNumbers.includes(oNum) ? p+1 : p, 0)
    
    // Increment scratch cards
    const start = card.cardNumber + 1
    const incrementAmount = scratchCards[card.cardNumber]
    for(let i = start; i < start + winAmount; i++) {
      if(scratchCards[i]) scratchCards[i] += incrementAmount
    }
  })

  const totalScratchCards = Object.values(scratchCards).reduce((total, current) => total + current , 0)

  console.log(
    `[Part2] - Total scratch cards are: ${totalScratchCards}`
  )
};

part1();
part2();

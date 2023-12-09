const fs = require('fs')

const part1 = () => {
  const input = fs.readFileSync('input.txt').toString().split(/\r?\n/).map(i => i.split(' ').map(Number))

  const allNextInSequence = []

  input.forEach(sequence => {
    const differences = [sequence]
    let differencesIndex = 0
    let currentDifference = differences[differencesIndex]
    let continueMakingDifferences = !!(currentDifference.filter(cd => cd !== 0)).length

    while(continueMakingDifferences) {
      let newDifference = []
      for(let i = 0; i < currentDifference.length - 1; i++) {
        const first = currentDifference[i]
        const second = currentDifference[i+1]
        const diff = second - first
        newDifference.push(diff)
      }

      differences.push(newDifference)
      differencesIndex++
      currentDifference = differences[differencesIndex]
      continueMakingDifferences = !!(currentDifference.filter(cd => cd !== 0)).length
    }

    const [mainSequence, ...allDifferences] = differences
    const increase = allDifferences.map(ad => ad.at(-1)).reduce((a,b)=> a+b, 0)
    const nextInSequence = mainSequence.at(-1) + increase
    allNextInSequence.push(nextInSequence)
  })

  const sumOfAllNextInSequence = allNextInSequence.reduce((a,b)=> a+b, 0)

  console.log(
    `[Part1] - Sum of extrapolated values are: ${sumOfAllNextInSequence}`
  )
}

const part2 = () => {
  const input = fs.readFileSync('input.txt').toString().split(/\r?\n/).map(i => i.split(' ').map(Number))

  const allNextInSequence = []

  input.forEach(sequence => {
    const differences = [sequence.reverse()]
    let differencesIndex = 0
    let currentDifference = differences[differencesIndex]
    let continueMakingDifferences = !!(currentDifference.filter(cd => cd !== 0)).length

    while(continueMakingDifferences) {
      let newDifference = []
      for(let i = 0; i < currentDifference.length - 1; i++) {
        const first = currentDifference[i]
        const second = currentDifference[i+1]
        const diff = second - first
        newDifference.push(diff)
      }

      differences.push(newDifference)
      differencesIndex++
      currentDifference = differences[differencesIndex]
      continueMakingDifferences = !!(currentDifference.filter(cd => cd !== 0)).length
    }

    const [mainSequence, ...allDifferences] = differences
    const increase = allDifferences.map(ad => ad.at(-1)).reduce((a,b)=> a+b, 0)
    const nextInSequence = mainSequence.at(-1) + increase
    allNextInSequence.push(nextInSequence)
  })

  const sumOfAllNextInSequence = allNextInSequence.reduce((a,b)=> a+b, 0)

  console.log(
    `[Part2] - Sum of extrapolated values are: ${sumOfAllNextInSequence}`
  )
};

part1();
part2();

const fs = require('fs')

const part1 = () => {
  const input = fs.readFileSync('input.txt').toString().split(/\r?\n/).map(line => line.match(/(\d+)+/g))
  const races = input[0].map((value, index) => ({ time: Number(value), distance: Number(input[1][index]) }))

  const result = races.reduce((waysToWinMultiplied, race) => {
    let timesRecordBeaten = 0
      for(let msToWait = 0; msToWait < race.time; msToWait++) {
        const speed = msToWait
        const msToDrive = race.time - msToWait
        const distance = speed * msToDrive
        if(distance > race.distance) timesRecordBeaten ++
      }
      return waysToWinMultiplied * timesRecordBeaten
  }, 1)

  console.log(
    `[Part1] - Number of ways to beat record for each race multiplied is: ${result}`
  )
}

const part2 = () => {
  const input = fs.readFileSync('input.txt').toString().split(/\r?\n/).map(line => Number(line.match(/(\d+)+/g).join('')))
  const time = input[0]
  const distance = input[1]

  /* 
  * We could solve this with binary search to find the
  * upper and lower bounds for where the races start and
  * stop winning for a CRAZY optimization. 
  * but im too lazy. this works. :)
  */
  let timesRecordBeaten = 0
  for(let msToWait = 0; msToWait < time; msToWait++) {
    const speed = msToWait
    const msToDrive = time - msToWait
    const newDistance = speed * msToDrive
    if(newDistance > distance) timesRecordBeaten ++
  }

  console.log(
    `[Part2] - Number of ways to beat the race is: ${timesRecordBeaten}`
  )
};

part1();
part2();

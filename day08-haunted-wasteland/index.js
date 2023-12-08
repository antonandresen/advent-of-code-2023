const fs = require('fs')

const part1 = () => {
  const input = fs.readFileSync('input.txt').toString().split(/\r?\n/)
  const directions = input[0]
  const pathMap = input.slice(2).reduce((pathMapProgress, path) => {
    const [ key, left, right ] = [...path.matchAll(/[A-Z]+/g)]
    pathMapProgress[key] = { L: left[0], R: right[0] }
    return pathMapProgress
  }, {})

  const GOAL = 'ZZZ'
  let directionIndex = 0
  let currentPosition = 'AAA'
  let timesMoved = 0
  while(currentPosition !== GOAL) {
    currentPosition = pathMap[currentPosition][directions[directionIndex]]
    timesMoved++
    directionIndex = (++directionIndex) % directions.length
  }

  console.log(
    `[Part1] - Amount of steps required to reach ZZZ is: ${timesMoved}`
  )
}

const part2 = () => {
  const input = fs.readFileSync('input.txt').toString().split(/\r?\n/)
  const directions = input[0]
  const pathMap = input.slice(2).reduce((pathMapProgress, path) => {
    const [key, left, right ] = [...path.matchAll(/[A-Z]+/g)]
    pathMapProgress[key] = {L: left[0], R: right[0]}
    return pathMapProgress
  }, {})

  const lcm = (nums) => {
    const gcd = (a, b) => {
      return !b ? a : gcd(b, a % b);
    }

    const lcmSingle = (a, b) => {
      return (a * b) / gcd(a, b);   
    }

    let result = nums[0]
    nums.forEach(num => result = lcmSingle(result, num))

    return result
  }

  const GOAL = 'Z'
  const START = 'A'
  let currentPositions = Object.keys(pathMap).filter(path => path.endsWith(START))
  const multiples = []
  for(let i = 0; i < currentPositions.length; i++) {
    let directionIndex = 0
    let timesMoved = 0
    let currentPosition = currentPositions[i]

    while(!currentPosition.endsWith(GOAL)) {
      currentPosition = pathMap[currentPosition][directions[directionIndex]]
      timesMoved++
      directionIndex = (++directionIndex) % directions.length
    }
    multiples.push(timesMoved)
  }
  
  const stepsToOnlyBeOnZNodes = lcm(multiples)

  console.log(
    `[Part2] - Amount of steps required to *ONLY* be on Z Nodes: ${stepsToOnlyBeOnZNodes}`
  )
};

part1();
part2();

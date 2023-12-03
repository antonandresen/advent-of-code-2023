const fs = require('fs');

const part1 = () => {
  const input = fs.readFileSync('input.txt').toString().split(/\r?\n/);

  const isNum = (char) => !isNaN(parseInt(char))
  const NOTHING = '.'

  const onNumberDone = () => {
    numberProgress.value = parseInt(numberProgress.value)
    numbers.push(numberProgress)
    numberProgress = null
  }

  // collect data
  const numbers = []
  const symbols  = []
  let numberProgress = null
  for(let y = 0;  y < input.length; y++) {
    const column = input[y]
    if(numberProgress) onNumberDone()
    for(let x = 0; x < column.length; x++) {
      const row = column[x]

      if(isNum(row)) {
        
        if(numberProgress) {
          numberProgress.value += row
          numberProgress.positions.push({x, y})
        } else {
          numberProgress = {
            value: row,
            positions: [{x, y}]
          }
        }

        continue
      }

      if(row !== NOTHING) symbols.push({ x, y})

      if(numberProgress) onNumberDone()
    }
  }

  const getPositionsToCheck = ({ x, y}) => {
    return [
      { x: x+1, y},
      { x: x-1, y},
      { x: x, y: y+1},
      { x: x, y: y-1},
      { x: x+1, y: y+1},
      { x: x-1, y: y-1},
      { x: x+1, y: y-1},
      { x: x-1, y: y+1},
    ]
  }

  const isPartNumber = (number) => {
    
    for(let i = 0; i < symbols.length; i++) {
      const symbol = symbols[i]
      
      // checking logic
      for(let j = 0; j < number.positions.length; j++) {
        const pos = number.positions[j]

        const positionsToCheck = getPositionsToCheck(pos)

        for(let k = 0; k < positionsToCheck.length; k++) {
          const posToCheck = positionsToCheck[k]
          if(posToCheck.x === symbol.x && posToCheck.y === symbol.y) return true
        }
      }

    }

    return false
  }

  const sumOfPartNumbers = numbers.reduce((sum, number) => {
    return isPartNumber(number) ? sum + number.value : sum
  }, 0)


  console.log(
    `[Part1] - Sum of the part numbers in the engine schematic is: ${sumOfPartNumbers}`
  );
};

const part2 = () => {
  const input = fs.readFileSync('input.txt').toString().split(/\r?\n/);

  const isNum = (char) => !isNaN(parseInt(char))
  const STAR = '*'

  const onNumberDone = () => {
    numberProgress.value = parseInt(numberProgress.value)
    numbers.push(numberProgress)
    numberProgress = null
  }

  // collect data
  const numbers = []
  const symbols  = []
  let numberProgress = null
  for(let y = 0;  y < input.length; y++) {
    const column = input[y]
    if(numberProgress) onNumberDone()
    for(let x = 0; x < column.length; x++) {
      const row = column[x]

      if(isNum(row)) {
        
        if(numberProgress) {
          numberProgress.value += row
          numberProgress.positions.push({x, y})
        } else {
          numberProgress = {
            value: row,
            positions: [{x, y}]
          }
        }

        continue
      }

      if(row === STAR) symbols.push({ x, y })

      if(numberProgress) onNumberDone()
    }
  }

  const getPositionsToCheck = ({ x, y}) => {
    return [
      { x: x+1, y},
      { x: x-1, y},
      { x: x, y: y+1},
      { x: x, y: y-1},
      { x: x+1, y: y+1},
      { x: x-1, y: y-1},
      { x: x+1, y: y-1},
      { x: x-1, y: y+1},
    ]
  }

  const calculateGear = (star) => {
    const adjacentNums = []
    const positionsToCheck = getPositionsToCheck(star)
    number: for(let i = 0;  i < numbers.length; i++) {
      const number = numbers[i]
      for(let j = 0; j < positionsToCheck.length; j++) {
        const posToCheck = positionsToCheck[j]
        for(let k = 0; k < number.positions.length; k++) {
          const positionOfDigitInNumber = number.positions[k]
          if(posToCheck.x === positionOfDigitInNumber.x && posToCheck.y === positionOfDigitInNumber.y) {
            adjacentNums.push(number.value)
            if(adjacentNums.length > 2) return 0
            continue number
          }
        }
      }
    }

    if(adjacentNums.length !== 2) return 0

    return adjacentNums[0] * adjacentNums[1]
  }

  const sumOfGearRatios = symbols.reduce((sum, star) => {
    const val = calculateGear(star)
    return sum + val
  }, 0)


  console.log(
    `[Part2] - Sum of all the gear ratios in the engine schematic is: ${sumOfGearRatios}`
  );
};

part1();
part2();

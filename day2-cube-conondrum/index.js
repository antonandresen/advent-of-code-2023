const fs = require('fs');

const part1 = () => {
  const input = fs.readFileSync('input.txt').toString().split(/\r?\n/);
  const parse = (row) => {
    const game = row.split(': ')[1].split('; ').map(reveal => {
      const res = {}
      reveal.split(', ').forEach(cube => {
        const s = cube.split(' ')
        res[s[1]] = parseInt(s[0])
      })
      return res
    })
    return game
  }

  const colors = {
    RED: 'red',
    BLUE: 'blue',
    GREEN: 'green'
  }

  const bagContains = {
    [colors.RED]: 12,
    [colors.BLUE]: 14,
    [colors.GREEN]: 13,
  }

  const totalIdSum = input.reduce((idSum, row, index) => {
    const game = parse(row)
    
    for(const reveal of game) {
      const redOK = reveal[colors.RED] ? reveal[colors.RED] <= bagContains[colors.RED] : true
      const greenOK = reveal[colors.GREEN] ? reveal[colors.GREEN] <= bagContains[colors.GREEN] : true
      const blueOK = reveal[colors.BLUE] ? reveal[colors.BLUE] <= bagContains[colors.BLUE] : true
      if(!redOK || !greenOK || !blueOK ) return idSum
    }
    
    return idSum + (index + 1)
  }, 0)

  console.log(
    `[Part1] - Sum of the IDs of possible games: ${totalIdSum}`
  );
};

const part2 = () => {
  const input = fs.readFileSync('input.txt').toString().split(/\r?\n/);
  const parse = (row) => {
    const game = row.split(': ')[1].split('; ').map(reveal => {
      const res = {}
      reveal.split(', ').forEach(cube => {
        const s = cube.split(' ')
        res[s[1]] = parseInt(s[0])
      })
      return res
    })
    return game
  }

  const colors = {
    RED: 'red',
    BLUE: 'blue',
    GREEN: 'green'
  }

  const totalIdPower = input.reduce((idPower, row, index) => {
    const game = parse(row)
    
    let maxRed = 0
    let maxGreen = 0
    let maxBlue = 0
    for(const reveal of game) {
      if(reveal[colors.RED] && reveal[colors.RED] > maxRed) maxRed = reveal[colors.RED]
      if(reveal[colors.GREEN] && reveal[colors.GREEN] > maxGreen) maxGreen = reveal[colors.GREEN]
      if(reveal[colors.BLUE] && reveal[colors.BLUE] > maxBlue) maxBlue = reveal[colors.BLUE]
    }

    return idPower + (maxRed * maxGreen * maxBlue)
  }, 0)

  console.log(
    `[Part2] - Total *power* of games are: ${totalIdPower}`
  );
};

part1();
part2();

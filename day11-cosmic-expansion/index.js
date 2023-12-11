const fs = require('fs')

const part1 = () => {
  const input = fs.readFileSync('input.txt').toString().split(/\r?\n/)
  const image = input

  const GALAXY = '#'
  const EMPTY_SPACE = '.'

  // Expand image.
  let expandY = []
  for(let i = 0; i < image.length; i++) {
    const row =  image[i]
    if(!row.includes(GALAXY)) expandY.push(i + expandY.length)
  }

  let expandX = []
  for(let i = 0; i < image[0].length; i++) {
    const column = image.map(row => row[i])
    if(!column.includes(GALAXY)) expandX.push(i + expandX.length)
  }

  const IMAGE_SIZE_Y = image.length

  for(const expandIndex of expandY) {
    image.splice(expandIndex, 0, Array(IMAGE_SIZE_Y).fill(EMPTY_SPACE).join(''))
  }

  for(const expandIndex of expandX) {
    for(const [index, x] of image.entries()) {
      const t = x.split('')
      t.splice(expandIndex, 0,  EMPTY_SPACE)
      image[index] = t.join('')
    }
  }

  let galaxyCounter = 0
  const galaxies = []
  for(const [yIndex, y] of image.entries()) {
    for(const [xIndex, x] of y.split('').entries()) {
      if(x === GALAXY) {
        galaxyCounter++
        galaxies.push({ x: xIndex, y: yIndex })
      }
    }
  }

  let sumOfLengths = 0
  galaxies.forEach((galaxy, galaxyIndex) => {
    for(let i = galaxyIndex + 1; i < galaxies.length; i++) {
      const compareGalaxy = galaxies[i]
      const closestDistance = Math.abs(compareGalaxy.x - galaxy.x) + Math.abs(compareGalaxy.y - galaxy.y)
      sumOfLengths += closestDistance
    }
  })

  console.log(
    `[Part1] - Sum of shortest path length between each galaxy pair is: ${sumOfLengths}`
  )
}

const part2 = () => {
  const input = fs.readFileSync('input.txt').toString().split(/\r?\n/)
  const image = input

  const GALAXY = '#'

  // Expand image.
  let expandY = []
  for(let i = 0; i < image.length; i++) {
    const row =  image[i]
    if(!row.includes(GALAXY)) expandY.push(i)
  }

  let expandX = []
  for(let i = 0; i < image[0].length; i++) {
    const column = image.map(row => row[i])
    if(!column.includes(GALAXY)) expandX.push(i)
  }

  let galaxyCounter = 0
  const galaxies = []
  for(const [yIndex, y] of image.entries()) {
    for(const [xIndex, x] of y.split('').entries()) {
      if(x === GALAXY) {
        galaxyCounter++
        galaxies.push({ x: xIndex, y: yIndex })
      }
    }
  }

  const MILLION = 999_999
  let sumOfLengths = 0
  galaxies.forEach((galaxy, galaxyIndex) => {
    for(let i = galaxyIndex + 1; i < galaxies.length; i++) {
      const compareGalaxy = galaxies[i]
      const xMillionsToAdd = expandX.reduce((mm, xVal) => {
        const isBetween = (xVal < galaxy.x && xVal > compareGalaxy.x) || (xVal > galaxy.x && xVal < compareGalaxy.x)
        return isBetween ? mm+1 : mm
      }, 0)
      const yMillionsToAdd = expandY.reduce((mm, yVal) => {
        const isBetween = (yVal < galaxy.y && yVal > compareGalaxy.y) || (yVal > galaxy.y && yVal < compareGalaxy.y)
        return isBetween ? mm+1 : mm
      }, 0)
      const closestDistance = Math.abs(compareGalaxy.x - galaxy.x) + Math.abs(compareGalaxy.y - galaxy.y) + (xMillionsToAdd * MILLION) + (yMillionsToAdd * MILLION)
      sumOfLengths += closestDistance
    }
  })

  console.log(
    `[Part2] - Sum of shortest path length between each galaxy pair is: ${sumOfLengths}`
  )
};

part1();
part2();
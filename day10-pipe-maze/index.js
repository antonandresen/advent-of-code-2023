const fs = require('fs')

const part1 = () => {
  const input = fs.readFileSync('input.txt').toString().split(/\r?\n/).map(i => i.split(''))
  const diagramMatrix = input

  const START = 'S'

  const startingTilePos = diagramMatrix.reduce((startTile, row, y) => {
    const x = row.findIndex(v => v === START)
    return x !== -1 ? { x, y } : startTile
  })

  const DIRS = { NORTH: 'NORTH', EAST: 'EAST', SOUTH: 'SOUTH', WEST: 'WEST' }
  const PIPES = {
    VERTICAL_PIPE: '|', HORIZONTAL_PIPE: '-',
    NE_BEND: 'L', NW_BEND: 'J',  SE_BEND: 'F', SW_BEND: '7'
  }

  const walkableTile = {
    [DIRS.NORTH]: [PIPES.VERTICAL_PIPE, PIPES.SE_BEND, PIPES.SW_BEND, START],
    [DIRS.EAST]: [PIPES.HORIZONTAL_PIPE, PIPES.NW_BEND, PIPES.SW_BEND,START],
    [DIRS.SOUTH]: [PIPES.VERTICAL_PIPE, PIPES.NE_BEND, PIPES.NW_BEND, START],
    [DIRS.WEST]: [PIPES.HORIZONTAL_PIPE, PIPES.SE_BEND, PIPES.NE_BEND, START]
  }

  const allPossibleNextDirections = {
    [PIPES.VERTICAL_PIPE]: [DIRS.NORTH, DIRS.SOUTH],
    [PIPES.HORIZONTAL_PIPE]: [DIRS.EAST, DIRS.WEST],
    [PIPES.NE_BEND]: [DIRS.NORTH, DIRS.EAST],
    [PIPES.NW_BEND]: [DIRS.NORTH, DIRS.WEST],
    [PIPES.SE_BEND]: [DIRS.SOUTH, DIRS.EAST],
    [PIPES.SW_BEND]: [DIRS.SOUTH, DIRS.WEST]
  }

  const getAdjacent = (pos, possibleNextDirs) => {
    return [
      { x: pos.x, y: pos.y - 1, dir: DIRS.NORTH },
      { x: pos.x + 1, y: pos.y, dir: DIRS.EAST },
      { x: pos.x, y: pos.y + 1, dir: DIRS.SOUTH },
      { x: pos.x - 1, y: pos.y, dir: DIRS.WEST }
    ].filter(adjPos => possibleNextDirs.includes(adjPos.dir))
  }

  // Loop along the loop
  let previousPos = { x: -1, y: -1}
  let currentPos = startingTilePos
  let possibleNextDirections = [...Object.values(DIRS)]
  let stepsTaken = 0
  do {
    const adjacentPositions = getAdjacent(currentPos, possibleNextDirections)
    for(const adjPos of adjacentPositions) {
      if(!diagramMatrix[adjPos.y]?.[adjPos.x]) return

      const pipeOnAdjPos = diagramMatrix[adjPos.y][adjPos.x]
      const isPreviousPos = previousPos.x === adjPos.x && previousPos.y === adjPos.y
      const isWalkableTile = walkableTile[adjPos.dir].includes(pipeOnAdjPos)
      if( isWalkableTile && !isPreviousPos) {
        previousPos = currentPos
        currentPos = adjPos
        possibleNextDirections = allPossibleNextDirections[diagramMatrix[currentPos.y]?.[currentPos.x]]
        break
      }
    }

    ++stepsTaken
  } while(diagramMatrix[currentPos.y][currentPos.x] !== START)

  const lengthToPointFarthestFromStart = Math.ceil(stepsTaken / 2)

  console.log(
    `[Part1] - Length to point farthest from start is: ${lengthToPointFarthestFromStart}`
  )
}

const part2 = () => {
  const input = fs.readFileSync('input.txt').toString().split(/\r?\n/).map(i => i.split(''))
  const diagramMatrix = input

  const START = 'S'

  const startingTilePos = diagramMatrix.reduce((startTile, row, y) => {
    const x = row.findIndex(v => v === START)
    return x !== -1 ? { x, y } : startTile
  })

  const DIRS = { NORTH: 'NORTH', EAST: 'EAST', SOUTH: 'SOUTH', WEST: 'WEST' }
  const PIPES = {
    VERTICAL_PIPE: '|', HORIZONTAL_PIPE: '-',
    NE_BEND: 'L', NW_BEND: 'J',  SE_BEND: 'F', SW_BEND: '7'
  }

  const walkableTile = {
    [DIRS.NORTH]: [PIPES.VERTICAL_PIPE, PIPES.SE_BEND, PIPES.SW_BEND, START],
    [DIRS.EAST]: [PIPES.HORIZONTAL_PIPE, PIPES.NW_BEND, PIPES.SW_BEND,START],
    [DIRS.SOUTH]: [PIPES.VERTICAL_PIPE, PIPES.NE_BEND, PIPES.NW_BEND, START],
    [DIRS.WEST]: [PIPES.HORIZONTAL_PIPE, PIPES.SE_BEND, PIPES.NE_BEND, START]
  }

  const allPossibleNextDirections = {
    [PIPES.VERTICAL_PIPE]: [DIRS.NORTH, DIRS.SOUTH],
    [PIPES.HORIZONTAL_PIPE]: [DIRS.EAST, DIRS.WEST],
    [PIPES.NE_BEND]: [DIRS.NORTH, DIRS.EAST],
    [PIPES.NW_BEND]: [DIRS.NORTH, DIRS.WEST],
    [PIPES.SE_BEND]: [DIRS.SOUTH, DIRS.EAST],
    [PIPES.SW_BEND]: [DIRS.SOUTH, DIRS.WEST]
  }

  const getAdjacent = (pos, possibleNextDirs) => {
    return [
      { x: pos.x, y: pos.y - 1, dir: DIRS.NORTH },
      { x: pos.x + 1, y: pos.y, dir: DIRS.EAST },
      { x: pos.x, y: pos.y + 1, dir: DIRS.SOUTH },
      { x: pos.x - 1, y: pos.y, dir: DIRS.WEST }
    ].filter(adjPos => possibleNextDirs.includes(adjPos.dir))
  }

  // Loop along the loop
  const fullPath = [startingTilePos]
  let previousPos = { x: -1, y: -1}
  let currentPos = startingTilePos
  let possibleNextDirections = [...Object.values(DIRS)]
  let stepsTaken = 0
  do {
    const adjacentPositions = getAdjacent(currentPos, possibleNextDirections)
    for(const adjPos of adjacentPositions) {
      if(!diagramMatrix[adjPos.y]?.[adjPos.x]) return

      const pipeOnAdjPos = diagramMatrix[adjPos.y][adjPos.x]
      const isPreviousPos = previousPos.x === adjPos.x && previousPos.y === adjPos.y
      const isWalkableTile = walkableTile[adjPos.dir].includes(pipeOnAdjPos)
      if( isWalkableTile && !isPreviousPos) {
        previousPos = currentPos
        currentPos = adjPos
        possibleNextDirections = allPossibleNextDirections[diagramMatrix[currentPos.y]?.[currentPos.x]]
        fullPath.push(currentPos)
        break
      }
    }

    ++stepsTaken
  } while(diagramMatrix[currentPos.y][currentPos.x] !== START)

  const lengthToPointFarthestFromStart = Math.ceil(stepsTaken / 2)
  console.log(fullPath)

  console.log(
    `[Part2] - Length to point farthest from start is: ${lengthToPointFarthestFromStart}`
  )
};

part1();
part2();

/*
...........
.S-------7.
.|F-----7|.
.||.....||.
.||.....||.
.|L-7.F-J|.
.|..|.|..|.
.L--J.L--J.
...........
 */

// 4, 4 = false
// 6, 2 = false

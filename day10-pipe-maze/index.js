const fs = require('fs')

const part1 = () => {
  const input = fs.readFileSync('input.txt').toString().split(/\r?\n/).map(i => i.split(''))
  const diagramMatrix = input

  const START = 'S'

  const startingTilePos = diagramMatrix.reduce((startTile, row, y) => {
    const x = row.findIndex(v => v === START)
    return x !== -1 ? { x, y } : startTile
  }, { x: -1, y: -1})

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
      if(!diagramMatrix[adjPos.y]?.[adjPos.x]) continue

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
  }, { x: -1, y: -1})

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
  do {
    const adjacentPositions = getAdjacent(currentPos, possibleNextDirections)
    for(const adjPos of adjacentPositions) {
      if(!diagramMatrix[adjPos.y]?.[adjPos.x]) continue

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
  } while(diagramMatrix[currentPos.y][currentPos.x] !== START)

  diagramMatrix[startingTilePos.y][startingTilePos.x] = PIPES.SE_BEND
  let numOfTilesEnclosedByLoop = 0
  tilesEnclosed = []
  for(const [rowIndex, row] of diagramMatrix.entries()) {
    let withinLoop = false
    for(const [pipeIndex, pipe] of row.entries()) {
      const currentPoint = { y: rowIndex, x: pipeIndex }
      const pipeIsPartOfLoop = fullPath.find(point => point.x === currentPoint.x && point.y === currentPoint.y)
      const isSouthPointingPipe = [PIPES.VERTICAL_PIPE, PIPES.SE_BEND, PIPES.SW_BEND].includes(pipe)

      if(pipeIsPartOfLoop && isSouthPointingPipe) withinLoop = !withinLoop
      else if(withinLoop && !pipeIsPartOfLoop) {
        tilesEnclosed.push({ x: pipeIndex, y: rowIndex})
        numOfTilesEnclosedByLoop++
      }
    }
  }

  console.log(
    `[Part2] - Number of tiles enclosed by the loop is: ${numOfTilesEnclosedByLoop}`
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

/*
..........
.S------7.
.|F----7|.
.||....||.
.||....||.
.|L-7F-J|.
.|..||..|.
.L--JL--J.
..........
*/

/*
.F----7F7F7F7F-7....
.|F--7||||||||FJ....
.||.FJ||||||||L7....
FJL7L7LJLJ||LJ.L-7..
L--J.L7...LJS7F-7L7.
....F-J..F7FJ|L7L7L7
....L7.F7||L7|.L7L7|
.....|FJLJ|FJ|F7|.LJ
....FJL-7.||.||||...
....L---J.LJ.LJLJ...
*/

/*
FF7FSF7F7F7F7F7F---7
L|LJ||||||||||||F--J
FL-7LJLJ||||||LJL-77
F--JF--7||LJLJ7F7FJ-
L---JF-JLJ.||-FJLJJ7
|F|F-JF---7F7-L7L|7|
|FFJF7L7F-JF7|JL---7
7-L-JL7||F7|L7F-7F7|
L.L7LFJ|||||FJL7||LJ
L7JLJL-JLJLJL--JLJ.L
*/
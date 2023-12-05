const fs = require('fs')

const part1 = () => {
  const input = fs.readFileSync('input.txt').toString()
  const [, ...seeds] = [...input.match(/seeds:( (\d+))+/g)][0].split(' ').map(Number)

  const converters = [
    'seed-to-soil map',
    'soil-to-fertilizer map',
    'fertilizer-to-water map',
    'water-to-light map',
    'light-to-temperature map',
    'temperature-to-humidity map',
    'humidity-to-location map'
  ]

  let toBeConverted = seeds  // tbc
  converters.forEach(converter => {
    const regex = new RegExp(`${converter}:\r\n((?:\\d+) (?:\\d+) (?:\\d+)\r\n)+`, 'g')
    let [, ...converterRules] = [...input.match(regex)][0].split('\r\n').filter(Boolean)
    converterRules = converterRules.map(rule => {
      const [destinationStart, sourceStart, range] = rule.split(' ').map(Number)

      return {
        floor: sourceStart,
        ceiling: sourceStart + range,
        mapping: destinationStart - sourceStart
      }
    })

    const ruleResult = [...toBeConverted]
    tbcLoop: for(const [index, tbc] of toBeConverted.entries()) {
      for(const rule of converterRules) {
        const hit = tbc <= rule.ceiling && tbc >= rule.floor
        if(hit) {
          ruleResult[index] = tbc + rule.mapping
          continue tbcLoop
        }
      }
    }
    toBeConverted = [...ruleResult]
  })

  const lowestLocationNumber = Math.min(...toBeConverted)

  console.log(
    `[Part1] - Lowest location number is: ${lowestLocationNumber}`
  )
}

const part2 = () => {
  const input = fs.readFileSync('input.txt').toString()

  const converters = [
    'seed-to-soil map',
    'soil-to-fertilizer map',
    'fertilizer-to-water map',
    'water-to-light map',
    'light-to-temperature map',
    'temperature-to-humidity map',
    'humidity-to-location map'
  ]

  let toBeConverted // tbc
  converters.forEach(converter => {
    const regex = new RegExp(`${converter}:\r\n((?:\\d+) (?:\\d+) (?:\\d+)\r\n)+`, 'g')
    let [, ...converterRules] = [...input.match(regex)][0].split('\r\n').filter(Boolean)
    converterRules = converterRules.map(rule => {
      const [destinationStart, sourceStart, range] = rule.split(' ').map(Number)

      return {
        floor: sourceStart,
        ceiling: sourceStart + range,
        mapping: destinationStart - sourceStart
      }
    })

    if(converter === 'seed-to-soil map') toBeConverted = converterRules.map(c => c.floor)
    const ruleResult = [...toBeConverted]
    tbcLoop: for(const [index, tbc] of toBeConverted.entries()) {
      for(const rule of converterRules) {
        const hit = tbc <= rule.ceiling && tbc >= rule.floor
        if(hit) {
          ruleResult[index] = tbc + rule.mapping
          continue tbcLoop
        }
      }
    }
    toBeConverted = [...ruleResult]
  })

  const lowestLocationNumber = Math.min(...toBeConverted)

  console.log(
    `[Part2] - Lowest location number is: ${lowestLocationNumber}`
  )
};

part1();
part2();

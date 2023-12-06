const fs = require('fs');

const part1 = () => {
  // Fetch input
  const input = fs.readFileSync('input.txt').toString().split(/\r?\n/);

  const totalCalSum = input.reduce((calSum, line) => {
    const lineArr = line.split('');
    const first = lineArr.find((c) => !isNaN(parseInt(c)));
    const last = lineArr.findLast((c) => !isNaN(parseInt(c)));
    return (calSum += parseInt(first + last));
  }, 0);

  console.log(
    `[Part1] - Sum of all the calibration values are: ${totalCalSum}`
  );
};

const part2 = () => {
  // Fetch input
  const input = fs.readFileSync('input.txt').toString().split(/\r?\n/);
  const strNumConf = Object.entries({
    one: '1', two: '2', 'three': '3', four: '4', five: '5', six: '6', seven: '7', eight: '8', nine: '9'
  })

  const totalCalSum = input.reduce((calSum, line) => {
    const lineArr = line.split('')

    const findFirst = (lineArr, r) => {
      for (const [index, char] of lineArr.entries()) {
        if(!isNaN(parseInt(char))) return char

        const lineProgress = r ? lineArr.slice(0, index + 1).reverse() : lineArr.slice(0, index + 1)
        for(const conf of strNumConf) {
          if(lineProgress.join('').includes(conf[0])) return conf[1]
        }
      }
    }

    const first = findFirst(lineArr, false)
    const last = findFirst(lineArr.reverse(), true)
    return (calSum += parseInt(first + last));
  }, 0);

  console.log(
    `[Part2] - Sum of all the calibration values are: ${totalCalSum}`
  );
};

part1();
part2();

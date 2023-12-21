import fetchInput from '../../utils/fetchInput.js';
import { getLines } from '../../utils/helpers.js';

const DAY = 14;
fetchInput(2023, DAY);
console.log('Advent Of Code - Day ' + DAY);

/**
 * Part 1
 */
const part1 = () => {
  const lines = getLines(2023, DAY);
  const platform = lines.map((line) => line.split(''));
  let sum = 0;

  for (let i = 0; i < platform.length; i++) {
    for (let j = 0; j < platform[i].length; j++) {
      if (platform[i][j] == 'O') {
        for (let k = i - 1; k >= 0 && platform[k][j] == '.'; k--) {
          platform[k][j] = 'O';
          platform[k + 1][j] = '.';
        }
      }
    }
  }

  for (let i = 0; i < platform.length; i++) {
    sum += platform[i].filter((x) => x == 'O').length * (platform.length - i);
  }

  return sum;
};

/**
 * Part 2
 */
const part2 = () => {
  const lines = getLines(2023, DAY);
};

console.log('Part 1 = ', part1());
console.log('Part 2 = ', part2());

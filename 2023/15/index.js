import fetchInput from '../../utils/fetchInput.js';
import { getLines } from '../../utils/helpers.js';

const DAY = 15;
fetchInput(2023, DAY);
console.log('Advent Of Code - Day ' + DAY);

/**
 * Part 1
 */
const part1 = () => {
  const entries = getLines(2023, DAY, 'input', ',');
  let sum = 0;

  entries.forEach((entry) => {
    sum += entry
      .split('')
      .map((x) => x.charCodeAt(0))
      .reduce((a, x) => (17 * (a + x)) % 256, 0);
  });

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

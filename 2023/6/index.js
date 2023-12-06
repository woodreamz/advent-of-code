import fetchInput from '../../utils/fetchInput.js';
import { getLines } from '../../utils/helpers.js';

const DAY = 6;
fetchInput(2023, DAY);
console.log('Advent Of Code - Day ' + DAY);

/**
 * Part 1
 */
const part1 = () => {
  const lines = getLines(2023, DAY, 'input');
  const times = lines[0]
    .split(/[^\d]+/g)
    .map((v) => parseInt(v))
    .filter((v) => !isNaN(v));
  const distances = lines[1]
    .split(/[^\d]+/g)
    .map((v) => parseInt(v))
    .filter((v) => !isNaN(v));

  let result = 1;

  times.forEach((time, index) => {
    const distance = distances[index];
    let ways = 0;

    for (let i = 0; i <= time; i++) {
      const temp = i * (time - i);

      if (temp > distance) {
        ways++;
      }
    }
    result = result * ways;
  });

  return result;
};

/**
 * Part 2
 */
const part2 = () => {
  const lines = getLines(2023, DAY, 'input');
  const time = parseInt(lines[0].replaceAll(' ', '').replace('Time:', ''));
  const distance = parseInt(lines[1].replaceAll(' ', '').replace('Distance:', ''));
  let ways = 0;

  for (let i = 0; i <= time; i++) {
    const temp = i * (time - i);

    if (temp > distance) {
      ways++;
    }
  }

  return ways;
};

console.log('Part 1 = ', part1());
console.log('Part 2 = ', part2());

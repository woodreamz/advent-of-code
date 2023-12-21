import fetchInput from '../../utils/fetchInput.js';
import { getLines } from '../../utils/helpers.js';

const DAY = 18;
fetchInput(2023, DAY);
console.log('Advent Of Code - Day ' + DAY);

/**
 * Part 1
 */
const part1 = () => {
  const lines = getLines(2023, DAY);
  let sum = 0;

  let x = 0;
  let y = 0;
  const points = [];
  let perimeter = 0;
  lines.forEach((line) => {
    const split = line.split(' ');
    const direction = split[0];
    const steps = parseInt(split[1]);
    switch (direction) {
      case 'R':
        x += steps;
        break;
      case 'L':
        x -= steps;
        break;
      case 'U':
        y -= steps;
        break;
      case 'D':
        y += steps;
        break;
    }
    perimeter += steps;
    points.push([x, y]);
  });

  for (let i = 0; i < points.length - 1; i++) {
    sum += points[i][0] * points[i + 1][1] - points[i + 1][0] * points[i][1];
  }
  sum += perimeter;

  return Math.floor(sum / 2) + 1;
};

/**
 * Part 2
 */
const part2 = () => {
  const lines = getLines(2023, DAY);
};

console.log('Part 1 = ', part1());
console.log('Part 2 = ', part2());

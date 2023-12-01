import fetchInput from '../../utils/fetchInput.js';
import fs from 'node:fs';

const DAY = 4;
fetchInput(2023, DAY);
console.log('Advent Of Code - Day ' + DAY);

/**
 * Part 1
 */
const part1 = () => {
  const input = fs.readFileSync('./2023/' + DAY + '/input.txt', 'utf-8');
  return '';
};

/**
 * Part 2
 */
const part2 = () => {
  const input = fs.readFileSync('./2023/' + DAY + '/input.txt', 'utf-8');
  return '';
};

console.log('Part 1 = ', part1());
console.log('Part 2 = ', part2());

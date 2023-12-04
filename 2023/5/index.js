import fetchInput from '../../utils/fetchInput.js';
import fs from 'node:fs';

const DAY = 5;
fetchInput(2023, DAY);
console.log('Advent Of Code - Day ' + DAY);

/**
 * Part 1
 */
const part1 = () => {
  const input = fs.readFileSync('./2023/' + DAY + '/input.txt', 'utf-8');
  const lines = input.split('\n');
  let sum = 0;

  return sum;
};

/**
 * Part 2
 */
const part2 = () => {
  const input = fs.readFileSync('./2023/' + DAY + '/input.txt', 'utf-8');
  const lines = input.split('\n');
  let sum = 0;

  return sum;
};

console.log('Part 1 = ', part1());
console.log('Part 2 = ', part2());

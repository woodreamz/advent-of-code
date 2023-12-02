import fetchInput from '../../utils/fetchInput.js';
import fs from 'node:fs';

const DAY = 2;
fetchInput(2023, DAY);
console.log('Advent Of Code - Day ' + DAY);

/**
 * Part 1
 */
const part1 = () => {
  const maxCubes = {
    red: 12,
    green: 13,
    blue: 14,
  };

  const input = fs.readFileSync('./2023/' + DAY + '/input.txt', 'utf-8');
  const sum = input.split('\n').reduce((acc, line) => {
    let isPossible = true;
    const id = parseInt(line.substring(5, line.indexOf(':')));
    const game = line.substring(line.indexOf(':') + 2, line.length);
    const subsets = game.split('; ');
    subsets.forEach((subset) => {
      const set = subset.split(', ');
      set.forEach((set) => {
        const cubes = set.split(' ');
        const num = parseInt(cubes[0]);
        const color = cubes[1];

        if (num > maxCubes[color]) {
          isPossible = false;
        }
      });
    });

    if (isPossible) {
      return acc + id;
    }
    return acc;
  }, 0);
  return sum;
};

/**
 * Part 2
 */
const part2 = () => {
  const input = fs.readFileSync('./2023/' + DAY + '/input.txt', 'utf-8');
  const sum = input.split('\n').reduce((acc, line) => {
    const power = {
      red: 0,
      green: 0,
      blue: 0,
    };
    const game = line.substring(line.indexOf(':') + 2, line.length);
    const subsets = game.split('; ');
    subsets.forEach((subset) => {
      const set = subset.split(', ');
      set.forEach((set) => {
        const cubes = set.split(' ');
        const num = parseInt(cubes[0]);
        const color = cubes[1];

        if (num > power[color]) {
          power[color] = num;
        }
      });
    });

    return acc + power.red * power.green * power.blue;
  }, 0);
  return sum;
};

console.log('Part 1 = ', part1());
console.log('Part 2 = ', part2());

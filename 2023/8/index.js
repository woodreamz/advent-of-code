import fetchInput from '../../utils/fetchInput.js';
import { getLines } from '../../utils/helpers.js';

const DAY = 8;
fetchInput(2023, DAY);
console.log('Advent Of Code - Day ' + DAY);

/**
 * Part 1
 */
const part1 = () => {
  const lines = getLines(2023, DAY);
  const instructions = lines[0].trim();

  const network = {};
  lines.forEach((line) => {
    const match = /([0-9A-Z]{3}) = \(([0-9A-Z]{3}), ([0-9A-Z]{3})\)/g.exec(line);

    if (match) {
      network[match[1]] = { L: match[2], R: match[3] };
    }
  });

  let next = 'AAA';
  let steps = 0;
  while (next !== 'ZZZ') {
    next = network[next][instructions[steps % instructions.length]];
    steps++;
  }

  return steps;
};

/**
 * Part 2
 */
const part2 = () => {
  const lines = getLines(2023, DAY, 'input');
  const instructions = lines[0].trim();

  const network = new Map();
  lines.forEach((line) => {
    const match = /(.{3}) = \((.{3}), (.{3})\)/g.exec(line);

    if (match) {
      network.set(match[1], { L: match[2], R: match[3] });
    }
  });

  const next = [...network.keys()].filter((key) => key.endsWith('A'));
  // console.log(network, next);
  let steps = 0;
  while (!next.every((n) => n.endsWith('Z'))) {
    for (let i = 0; i < next.length; i++) {
      next[i] = network.get(next[i])[instructions[steps % instructions.length]];
    }

    // if (steps % 100000000 === 0) {
    //   console.log(
    //     steps,
    //     instructions[steps % instructions.length],
    //     ': ',
    //     next,
    //     ' ==> ',
    //     network.get(next[i])[instructions[steps % instructions.length]]
    //   );
    // }
    steps++;
  }

  return steps;
};

console.log('Part 1 = ', part1());
console.log('Part 2 = ', part2());

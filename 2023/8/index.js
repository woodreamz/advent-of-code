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
  const lines = getLines(2023, DAY);
  const instructions = lines[0].trim();

  const gcd = (a, b) => (!b ? a : gcd(b, a % b));
  const lcm = (a, b) => (a * b) / gcd(a, b);

  const network = new Map();
  lines.forEach((line) => {
    const match = /(.{3}) = \((.{3}), (.{3})\)/g.exec(line);

    if (match) {
      network.set(match[1], { L: match[2], R: match[3] });
    }
  });

  let nodes = [...network.keys()].filter((key) => key.endsWith('A'));
  const ghostSteps = [];
  let steps = 0;
  while (!nodes.every((n) => n.endsWith('Z'))) {
    const instruction = instructions[steps % instructions.length];
    const nextNodes = nodes.map((n) => network.get(n)[instruction]).filter((n) => !n.endsWith('Z'));
    steps++;
    if (nodes.length != nextNodes.length) {
      ghostSteps.push(steps);
    }
    nodes = nextNodes;
  }

  return ghostSteps.reduce(lcm, 1);
};

console.log('Part 1 = ', part1());
console.log('Part 2 = ', part2());

import fetchInput from '../../utils/fetchInput.js';
import { getLines } from '../../utils/helpers.js';

const DAY = 9;
fetchInput(2023, DAY);
console.log('Advent Of Code - Day ' + DAY);

/**
 * Part 1
 */
const part1 = () => {
  const lines = getLines(2023, DAY);

  return lines
    .map((line) => {
      const history = line.split(' ').map((n) => parseInt(n));
      const res = [history];

      while (res.at(-1).some((n) => n !== 0)) {
        const last = res.at(-1);
        const next = last.slice(1).map((v, i) => v - last[i]);
        res.push(next);
      }

      res.at(-1).push(0);

      for (let i = res.length - 2; i >= 0; i--) {
        res[i].push(res[i].at(-1) + res[i + 1].at(-1));
      }

      return res[0].at(-1);
    })
    .reduce((a, b) => a + b);
};

/**
 * Part 2
 */
const part2 = () => {
  const lines = getLines(2023, DAY);

  return lines
    .map((line) => {
      const history = line
        .split(' ')
        .reverse()
        .map((n) => parseInt(n));
      const res = [history];

      while (res.at(-1).some((n) => n !== 0)) {
        const last = res.at(-1);
        const next = last.slice(1).map((v, i) => v - last[i]);
        res.push(next);
      }

      res.at(-1).push(0);

      for (let i = res.length - 2; i >= 0; i--) {
        res[i].push(res[i].at(-1) + res[i + 1].at(-1));
      }

      return res[0].at(-1);
    })
    .reduce((a, b) => a + b);
};

console.log('Part 1 = ', part1());
console.log('Part 2 = ', part2());

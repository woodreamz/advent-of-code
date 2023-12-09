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
      const history = line.split(' ').map(Number);
      const seq = [history];
      console.log(history, seq);

      while (seq.at(-1).some((n) => n !== 0)) {
        const last = seq.at(-1);
        const next = last.slice(1).map((v, i) => v - last[i]);
        seq.push(next);
      }

      seq.at(-1).push(0);

      for (let i = seq.length - 2; i >= 0; i--) {
        seq[i].push(seq[i].at(-1) + seq[i + 1].at(-1));
      }

      return seq[0].at(-1);
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
      const history = line.split(' ').reverse().map(Number);
      const seq = [history];

      while (seq.at(-1).some((n) => n !== 0)) {
        const last = seq.at(-1);
        const next = last.slice(1).map((v, i) => v - last[i]);
        seq.push(next);
      }

      seq.at(-1).push(0);

      for (let i = seq.length - 2; i >= 0; i--) {
        seq[i].push(seq[i].at(-1) + seq[i + 1].at(-1));
      }

      return seq[0].at(-1);
    })
    .reduce((a, b) => a + b);
};

console.log('Part 1 = ', part1());
console.log('Part 2 = ', part2());

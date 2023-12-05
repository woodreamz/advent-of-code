import fetchInput from '../../utils/fetchInput.js';
import { getLines } from '../../utils/helpers.js';

const DAY = 4;
fetchInput(2023, DAY);
console.log('Advent Of Code - Day ' + DAY);

/**
 * Part 1
 */
const part1 = () => {
  const lines = getLines(2023, DAY).map((line) => line.substring(10, line.length));
  let sum = 0;

  lines.forEach((line) => {
    const temp = line.split(' | ');
    const winners = temp[0].trim().split(/\s+/);
    const numbers = temp[1].trim().split(/\s+/);

    const score = numbers.reduce((acc, n) => {
      if (winners.includes(n)) {
        if (acc === 0) {
          return acc + 1;
        } else {
          return acc * 2;
        }
      }
      return acc;
    }, 0);
    sum += score;
  });

  return sum;
};

/**
 * Part 2
 */
const part2 = () => {
  const lines = getLines(2023, DAY).map((line) => line.substring(10, line.length));

  const wins = lines.map((line) => {
    const temp = line.split(' | ');
    const winners = temp[0].trim().split(/\s+/);
    const numbers = temp[1].trim().split(/\s+/);
    return numbers.reduce((acc, n) => (winners.includes(n) ? acc + 1 : acc), 0);
  });

  const processCard = (index) => {
    if (wins[index] > 0) {
      sum = sum + wins[index];
      for (let i = index + 1; i <= index + wins[index]; i++) {
        processCard(i);
      }
    }
  };

  let sum = 0;
  wins.forEach((w, i) => {
    sum++;
    processCard(i);
  });

  return sum;
};

console.log('Part 1 = ', part1());
console.log('Part 2 = ', part2());

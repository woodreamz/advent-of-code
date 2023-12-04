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
  const lines = input.split('\n').map((line) => line.substring(10, line.length));
  let sum = 0;

  lines.forEach((line) => {
    const temp = line.split(' | ');
    const winners = temp[0].trim().split(/\s+/);
    const numbers = temp[1].trim().split(/\s+/);

    let score = 0;
    numbers.forEach((n) => {
      if (winners.includes(n)) {
        score === 0 ? (score = score + 1) : (score = score * 2);
      }
    });
    sum += score;
  });

  return sum;
};

/**
 * Part 2
 */
const part2 = () => {
  const input = fs.readFileSync('./2023/' + DAY + '/input.txt', 'utf-8');
  const lines = input.split('\n').map((line) => line.substring(10, line.length));
  let sum = 0;
  const wins = [];

  lines.forEach((line) => {
    const temp = line.split(' | ');
    const winners = temp[0].trim().split(/\s+/);
    const numbers = temp[1].trim().split(/\s+/);

    let score = 0;
    numbers.forEach((n) => {
      if (winners.includes(n)) {
        score++;
      }
    });
    wins.push(score);
  });

  console.log(wins);

  const processCard = (score, index) => {
    if (score > 0) {
      sum = sum + score + 1;
      for (let i = index + 1; i <= index + score; i++) {
        processCard(wins[i], i);
      }
    }
  };

  wins.forEach(processCard);

  return sum;
};

console.log('Part 1 = ', part1());
console.log('Part 2 = ', part2());

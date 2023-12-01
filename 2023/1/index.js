import fetchInput from '../../utils/fetchInput.js';
import fs from 'node:fs';

console.log('Advent Of Code - Day 1');

fetchInput(2023, 1);

const part1 = () => {
  const text = fs.readFileSync('./2023/1/input.txt', 'utf-8');
  const sum = text.split('\n').reduce((acc, line) => {
    const numbers = line.replace(/[^0-9]/g, '');
    let calibrationValue = numbers[0] + numbers[0];
    if (numbers.length > 1) {
      calibrationValue = numbers[0] + numbers[numbers.length - 1];
    }

    return acc + Number.parseInt(calibrationValue);
  }, 0);
  return sum;
};

const part2 = () => {
  const allDigits = [
    'one',
    'two',
    'three',
    'four',
    'five',
    'six',
    'seven',
    'eight',
    'nine',
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
  ];

  const text = fs.readFileSync('./2023/1/input.txt', 'utf-8');
  const sum = text.split('\n').reduce((acc, line) => {
    let calibrationValue = [null, null];
    let firstIndex = 999;
    let lastIndex = -1;

    allDigits.forEach((digit, idx) => {
      if (line.indexOf(digit) !== -1 && line.indexOf(digit) < firstIndex) {
        firstIndex = line.indexOf(digit);
        calibrationValue[0] = idx < 9 ? idx + 1 : idx - 8;
      }

      if (line.lastIndexOf(digit) !== -1 && line.lastIndexOf(digit) > lastIndex) {
        lastIndex = line.lastIndexOf(digit);
        calibrationValue[1] = idx < 9 ? idx + 1 : idx - 8;
      }
    });

    return acc + Number.parseInt(calibrationValue.join(''));
  }, 0);
  return sum;
};

console.log('Part 1 = ', part1());
console.log('Part 2 = ', part2());

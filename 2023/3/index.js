import fetchInput from '../../utils/fetchInput.js';
import { getLines } from '../../utils/helpers.js';

const DAY = 3;
fetchInput(2023, DAY);
console.log('Advent Of Code - Day ' + DAY);

/**
 * Part 1
 */
const part1 = () => {
  const lines = getLines(2023, DAY);
  let sum = 0;

  const matchNumber = (string, index) => {
    return string && string[index] && string[index].match(/[0-9]/g);
  };

  const matchSymbol = (string, index) => {
    return string && string[index] && !matchNumber(string, index) && string[index] !== '.';
  };

  lines.forEach((line, index) => {
    const arrLine = line.split('');
    for (let i = 0; i < arrLine.length; i++) {
      if (matchNumber(arrLine, i)) {
        let num = arrLine[i];
        const start = i;

        while (matchNumber(arrLine, i + 1)) {
          num += arrLine[i + 1];
          i = i + 1;
        }
        const end = start + num.length - 1;

        let hasSymbol = false;
        if (matchSymbol(arrLine, start - 1) || matchSymbol(arrLine, end + 1)) {
          hasSymbol = true;
        }
        if (index > 0) {
          const prevLineArr = lines[index - 1].split('');

          for (let j = start - 1; j <= end + 1; j++) {
            if (matchSymbol(prevLineArr, j)) {
              hasSymbol = true;
            }
          }
        }
        if (index < lines.length - 1) {
          const nextLineArr = lines[index + 1].split('');

          for (let k = start - 1; k <= end + 1; k++) {
            if (matchSymbol(nextLineArr, k)) {
              hasSymbol = true;
            }
          }
        }

        if (hasSymbol) {
          sum += parseInt(num);
        }
      }
    }
  });
  return sum;
};

/**
 * Part 2
 */
const part2 = () => {
  const lines = getLines(2023, DAY);
  let sum = 0;

  const matchNumber = (string, index) => {
    return string && string[index] && string[index].match(/[0-9]/g);
  };

  lines.forEach((line, index) => {
    const arrLine = line.split('');

    for (let i = 0; i < arrLine.length; i++) {
      if (arrLine[i] === '*') {
        let starIdx = i;
        let matchParts = [];

        if (matchNumber(arrLine, starIdx - 1)) {
          let num = arrLine[starIdx - 1];
          let j = starIdx - 2;
          while (matchNumber(arrLine, j)) {
            num = arrLine[j] + num;
            j--;
          }
          matchParts.push(parseInt(num));
        }
        if (matchNumber(arrLine, starIdx + 1)) {
          let num = arrLine[starIdx + 1];
          let j = starIdx + 2;
          while (matchNumber(arrLine, j)) {
            num = num + arrLine[j];
            j++;
          }
          matchParts.push(parseInt(num));
        }

        if (index > 0) {
          const prevLine = lines[index - 1];
          const regex = /[0-9]+/g;
          let match = regex.exec(prevLine);

          while (match !== null) {
            if (
              (match.index <= starIdx + 1 && match.index >= starIdx - 1) ||
              (match.index + match[0].length - 1 >= starIdx - 1 &&
                match.index + match[0].length - 1 <= starIdx + 1)
            ) {
              matchParts.push(parseInt(match[0]));
            }
            match = regex.exec(prevLine);
          }
        }

        if (index < lines.length - 1) {
          const nextLine = lines[index + 1];
          const regex = /[0-9]+/g;
          let match = regex.exec(nextLine);

          while (match !== null) {
            if (
              (match.index <= starIdx + 1 && match.index >= starIdx - 1) ||
              (match.index + match[0].length - 1 >= starIdx - 1 &&
                match.index + match[0].length - 1 <= starIdx + 1)
            ) {
              matchParts.push(parseInt(match[0]));
            }
            match = regex.exec(nextLine);
          }
        }

        if (matchParts.length === 2) {
          sum += matchParts[0] * matchParts[1];
        }
      }
    }
  });

  return sum;
};

console.log('Part 1 = ', part1());
console.log('Part 2 = ', part2());

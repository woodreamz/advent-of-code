import fetchInput from '../../utils/fetchInput.js';
import { getLines } from '../../utils/helpers.js';

const DAY = 13;
fetchInput(2023, DAY);
console.log('Advent Of Code - Day ' + DAY);

/**
 * Part 1
 */
const part1 = () => {
  const lines = getLines(2023, DAY, 'input', '\n\n');
  let sum = 0;
  lines.forEach((pattern) => {
    const rows = pattern.split('\n');
    const grid = rows.map((rows) => rows.split(''));
    const flipped = grid[0].map((col, c) => grid.map((row, r) => grid[r][c]));
    const cols = flipped.map((col) => col.join(''));

    for (let c = 1; c < cols.length; c++) {
      let maxLength = Math.min(c, cols.length - c);
      let left = cols.slice(c - maxLength, c);
      let right = cols.slice(c, c + maxLength);
      right.reverse();
      if (left.toString() === right.toString()) {
        sum += c;
      }
    }
    for (let r = 1; r < rows.length; r++) {
      let maxLength = Math.min(r, rows.length - r);
      let top = rows.slice(r - maxLength, r);
      let bottom = rows.slice(r, r + maxLength);
      bottom.reverse();
      if (top.toString() === bottom.toString()) {
        sum += r * 100;
      }
    }
  });

  return sum;
};

/**
 * Part 2
 */
const part2 = () => {
  const lines = getLines(2023, DAY, 'input', '\n\n');

  const diff = (a, b) => {
    let diff = 0;
    for (let i = 0; i < a.length; i++) {
      for (let j = 0; j < a[0].length; j++) {
        if (a[i].charAt(j) != b[i].charAt(j)) {
          diff++;
        }
      }
    }
    return diff;
  };

  let sum = 0;
  lines.forEach((pattern) => {
    const rows = pattern.split('\n');
    const grid = rows.map((rows) => rows.split(''));
    const flipped = grid[0].map((col, c) => grid.map((row, r) => grid[r][c]));
    const cols = flipped.map((col) => col.join(''));

    //hunt for reflection
    for (let c = 1; c < cols.length; c++) {
      let maxLength = Math.min(c, cols.length - c);
      let left = cols.slice(c - maxLength, c);
      let right = cols.slice(c, c + maxLength);
      right.reverse();
      if (diff(left, right) == 1) {
        sum += c;
      }
    }
    for (let r = 1; r < rows.length; r++) {
      let maxLength = Math.min(r, rows.length - r);
      let top = rows.slice(r - maxLength, r);
      let bottom = rows.slice(r, r + maxLength);
      bottom.reverse();
      if (diff(top, bottom) == 1) {
        sum += r * 100;
      }
    }
  });

  return sum;
};

console.log('Part 1 = ', part1());
console.log('Part 2 = ', part2());

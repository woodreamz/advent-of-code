import fetchInput from '../../utils/fetchInput.js';
import { getLines } from '../../utils/helpers.js';

const DAY = 11;
fetchInput(2023, DAY);
console.log('Advent Of Code - Day ' + DAY);

/**
 * Part 1
 */
const part1 = () => {
  const lines = getLines(2023, DAY);
  let sum = 0;
  let expanded = lines.reduce((acc, line) => {
    const points = line.split('');
    if (points.includes('#') == false) {
      acc.push(points);
    }
    acc.push(points);
    return acc;
  }, []);

  let flipped = expanded[0].map((col, idx) => expanded.map((row, idx2) => expanded[idx2][idx]));

  expanded = [];
  flipped.forEach((points) => {
    if (points.includes('#') == false) {
      expanded.push(points);
    }
    expanded.push(points);
  });

  flipped = expanded[0].map((col, c) => expanded.map((row, r) => expanded[r][c]));

  let galaxies = [];
  for (let i = 0; i < flipped.length; i++) {
    for (let j = 0; j < flipped[0].length; j++) {
      if (flipped[i][j] == '#') {
        galaxies.push([i, j]);
      }
    }
  }

  for (let i = 0; i < galaxies.length - 1; i++) {
    for (let j = i + 1; j < galaxies.length; j++) {
      sum += Math.abs(galaxies[i][0] - galaxies[j][0]) + Math.abs(galaxies[i][1] - galaxies[j][1]);
    }
  }

  return sum;
};

/**
 * Part 2
 */
const part2 = () => {
  const lines = getLines(2023, DAY);
  let sum = 0;

  const expansion = 1000000 - 1;
  const grid = lines.map((line) => line.split(''));
  let expCols = [];
  let expRows = [];
  let cache = [];
  let galaxies = [];
  for (let i = 0; i < grid.length; i++) {
    if (grid[i].includes('#') == false) {
      expRows.push(i);
    }
    for (let j = 0; j < grid[0].length; j++) {
      if (i == 0) cache[j] = true;
      if (grid[i][j] == '#') {
        galaxies.push([i, j]);
        cache[j] = false;
      }
    }
  }
  cache.forEach((value, idc) => {
    if (value == true) {
      expCols.push(idc);
    }
  });

  for (let i = 0; i < galaxies.length - 1; i++) {
    for (let j = i + 1; j < galaxies.length; j++) {
      let length =
        Math.abs(galaxies[i][0] - galaxies[j][0]) + Math.abs(galaxies[i][1] - galaxies[j][1]);
      expCols.forEach((col) => {
        if (
          Math.min(galaxies[i][1], galaxies[j][1]) < col &&
          Math.max(galaxies[i][1], galaxies[j][1]) > col
        ) {
          length += expansion;
        }
      });
      expRows.forEach((row) => {
        if (
          Math.min(galaxies[i][0], galaxies[j][0]) < row &&
          Math.max(galaxies[i][0], galaxies[j][0]) > row
        ) {
          length += expansion;
        }
      });
      sum += length;
    }
  }

  return sum;
};

console.log('Part 1 = ', part1());
console.log('Part 2 = ', part2());

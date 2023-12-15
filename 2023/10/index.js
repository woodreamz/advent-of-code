import fetchInput from '../../utils/fetchInput.js';
import { getLines } from '../../utils/helpers.js';

const DAY = 10;
fetchInput(2023, DAY);
console.log('Advent Of Code - Day ' + DAY);

/**
 * Part 1
 */
const part1 = () => {
  const lines = getLines(2023, DAY);
  let sum = 0;

  let padding = ''.padStart(lines[0].length, '.');
  lines.unshift(padding);
  lines.push(padding);

  let cells = [];
  let start = [0, 0];
  for (let y = 0; y < lines.length; y++) {
    let line = '.' + lines[y] + '.';
    cells.push(line.split(''));
    if (line.indexOf('S') !== -1) {
      start = [y, line.indexOf('S')];
    }
  }

  let x = start[1];
  let y = start[0];
  let direction = 'X';
  if (['F', '7', '|'].indexOf(cells[y - 1][x]) !== -1) {
    direction = 'N';
    y--;
  } else if (['-', '7', 'J'].indexOf(cells[y][x + 1]) !== -1) {
    direction = 'E';
    x++;
  } else if (['|', 'L', 'J'].indexOf(cells[y + 1][x]) !== -1) {
    direction = 'S';
    y++;
  }
  sum++;

  //now loop until we reach back to S
  // eslint-disable-next-line no-constant-condition
  while (true) {
    let next = cells[y][x];
    if (next == 'S') break;
    let command = direction + next;
    switch (command) {
      case 'NF':
      case 'E-':
      case 'SL':
        direction = 'E';
        x++;
        break;
      case 'N|':
      case 'EJ':
      case 'WL':
        direction = 'N';
        y--;
        break;
      case 'N7':
      case 'SJ':
      case 'W-':
        direction = 'W';
        x--;
        break;
      case 'E7':
      case 'S|':
      case 'WF':
        direction = 'S';
        y++;
        break;
    }
    sum++;
  }
  sum /= 2;

  return sum;
};

/**
 * Part 2
 */
const part2 = () => {
  const lines = getLines(2023, DAY);
  let sum = 0;

  let padding = ''.padStart(lines[0].length, '.');
  lines.unshift(padding);
  lines.push(padding);
  let cells = [];
  let iop = new Array(lines.length * 2)
    .fill(0)
    .map(() => new Array((lines[0].length + 2) * 2).fill('.'));
  let start = [0, 0];
  for (let y = 0; y < lines.length; y++) {
    let line = '.' + lines[y] + '.';
    cells.push(line.split(''));
    if (line.indexOf('S') !== -1) {
      start = [y, line.indexOf('S')];
    }
  }

  let x = start[1];
  let y = start[0];
  let a = x * 2;
  let b = y * 2;
  iop[b][a] = '#';
  let direction = 'X';
  if (['F', '7', '|'].indexOf(cells[y - 1][x]) !== -1) {
    direction = 'N';
    y--;
    iop[b - 1][a] = '#';
  } else if (['-', '7', 'J'].indexOf(cells[y][x + 1]) !== -1) {
    direction = 'E';
    iop[b][a + 1] = '#';
    x++;
  } else if (['|', 'L', 'J'].indexOf(cells[y + 1][x]) !== -1) {
    direction = 'S';
    iop[b + 1][a] = '#';
    y++;
  }

  //now loop until we reach back to S
  // eslint-disable-next-line no-constant-condition
  while (true) {
    a = x * 2;
    b = y * 2;
    iop[b][a] = '#';
    let next = cells[y][x];
    if (next == 'S') break;
    let command = direction + next;
    switch (command) {
      case 'NF':
      case 'E-':
      case 'SL':
        direction = 'E';
        x++;
        iop[b][a + 1] = '#';
        break;
      case 'N|':
      case 'EJ':
      case 'WL':
        direction = 'N';
        y--;
        iop[b - 1][a] = '#';
        break;
      case 'N7':
      case 'SJ':
      case 'W-':
        direction = 'W';
        x--;
        iop[b][a - 1] = '#';
        break;
      case 'E7':
      case 'S|':
      case 'WF':
        direction = 'S';
        y++;
        iop[b + 1][a] = '#';
        break;
    }
  }

  let bmax = iop.length - 1;
  let amax = iop[0].length - 1;

  const fillmap = (b, a) => {
    let stack = [{ b: b, a: a }];
    const directions = [
      [0, 1],
      [0, -1],
      [1, 0],
      [-1, 0],
    ];
    while (stack.length > 0) {
      let current = stack.pop();
      for (let i = 0; i < 4; i++) {
        let child = { b: current.b + directions[i][0], a: current.a + directions[i][1] };
        if (
          child.a >= 0 &&
          child.a <= amax &&
          child.b >= 0 &&
          child.b <= bmax &&
          iop[child.b][child.a] == '.'
        ) {
          iop[child.b][child.a] = 'O';
          stack.push(child);
        }
      }
    }
  };

  fillmap(0, 0);

  //find inners
  for (let b = 0; b < bmax; b += 2) {
    for (let a = 0; a < amax; a += 2) {
      if (iop[b][a] == '.') {
        sum++;
        iop[b][a] = 'I';
      }
    }
  }

  return sum;
};

console.log('Part 1 = ', part1());
console.log('Part 2 = ', part2());

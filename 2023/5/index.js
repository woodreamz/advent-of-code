import fetchInput from '../../utils/fetchInput.js';
import { getLines } from '../../utils/helpers.js';

const DAY = 5;
fetchInput(2023, DAY);
console.log('Advent Of Code - Day ' + DAY);

/**
 * Part 1
 */
const part1 = () => {
  const lines = getLines(2023, DAY);
  const seeds = lines[0]
    .split(' ')
    .map((seed) => parseInt(seed))
    .filter((seed) => !isNaN(seed));

  const mapping = [];

  lines.forEach((line, idx) => {
    if (line === '' || idx === 0) {
      return;
    }

    const matchMap = /([a-z]+)-to-([a-z]+)/g.exec(line);
    const matchRange = /([0-9]+) ([0-9]+) ([0-9]+)/g.exec(line);
    if (matchMap) {
      const source = matchMap[1];
      const target = matchMap[2];
      mapping.push({
        source,
        target,
        ranges: [],
      });
    } else if (matchRange) {
      mapping[mapping.length - 1].ranges.push(matchRange[0].split(' ').map((v) => parseInt(v)));
    }
  });

  const findTarget = (source, value) => {
    const map = mapping.find((m) => m.source === source);
    if (map) {
      const match = map.ranges.find((ranges) => {
        return value >= ranges[1] && value <= ranges[1] + ranges[2];
      });

      if (match) {
        return findTarget(map.target, match[0] + value - match[1]);
      }
      return findTarget(map.target, value);
    } else {
      return value;
    }
  };

  let location = null;
  seeds.forEach((seed) => {
    const r = findTarget('seed', seed);
    location = location === null ? r : Math.min(location, r);
  });

  return location;
};

/**
 * Part 2
 */
const part2 = () => {
  const lines = getLines(2023, DAY, 'input');
  const seeds = lines[0]
    .split(' ')
    .map((seed) => parseInt(seed))
    .filter((seed) => !isNaN(seed));

  const mapping = [];

  lines.forEach((line, idx) => {
    if (line === '' || idx === 0) {
      return;
    }

    const matchMap = /([a-z]+)-to-([a-z]+)/g.exec(line);
    const matchRange = /([0-9]+) ([0-9]+) ([0-9]+)/g.exec(line);
    if (matchMap) {
      const source = matchMap[1];
      const target = matchMap[2];
      mapping.push({
        source,
        target,
        ranges: [],
      });
    } else if (matchRange) {
      mapping[mapping.length - 1].ranges.push(matchRange[0].split(' ').map((v) => parseInt(v)));
    }
  });

  const findTarget = (source, value) => {
    const map = mapping.find((m) => m.source === source);
    if (map) {
      const match = map.ranges.find((ranges) => {
        return value >= ranges[1] && value <= ranges[1] + ranges[2];
      });

      if (match) {
        return findTarget(map.target, match[0] + value - match[1]);
      }
      return findTarget(map.target, value);
    } else {
      return value;
    }
  };

  let location = null;
  seeds.forEach((seed, idx) => {
    if (idx % 2 === 0) {
      console.log('seed ' + idx, ' Start finding from ' + seed + ' to ' + (seed + seeds[idx + 1]));
      for (let i = seed; i < seed + seeds[idx + 1]; i++) {
        const result = findTarget('seed', i);
        location = location === null ? result : Math.min(location, result);
      }
    }
  });

  return location;
};

console.log('Part 1 = ', part1());
console.log('Part 2 = ', part2());

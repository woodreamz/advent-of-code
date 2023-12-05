import fs from 'node:fs';

/**
 * Get array of lines from puzzle input.
 */
const getLines = (year, day, filename = 'input') => {
  const input = fs.readFileSync(`./${year}/${day}/${filename}.txt`, 'utf-8');
  return input.split('\n');
};

export { getLines };

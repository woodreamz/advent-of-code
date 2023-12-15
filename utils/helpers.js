import fs from 'node:fs';

/**
 * Get array of lines from puzzle input.
 */
const getLines = (year, day, filename = 'input', separator = '\n') => {
  const input = fs.readFileSync(`./${year}/${day}/${filename}.txt`, 'utf-8');
  return input.split(separator);
};

export { getLines };

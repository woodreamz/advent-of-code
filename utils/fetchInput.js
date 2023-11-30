import dotenv from 'dotenv';
import fs from 'node:fs';

dotenv.config();

const fetchInput = async (year, day) => {
  const res = await fetch(`https://adventofcode.com/${year}/day/${day}/input`, {
    headers: {
      cookie: `session=${process.env.SESSION_ID}`,
    },
  });

  const text = (await res.text()).trim();

  if (text === 'Puzzle inputs differ by user.  Please log in to get your puzzle input.') {
    throw new Error('Advent of Code did not return a puzzle input');
  }

  const path = `./${year}/${day}`;
  if (!fs.existsSync(path)) {
    fs.mkdirSync(path, { recursive: true });
  }

  fs.writeFileSync(`${path}/input.txt`, text);

  return text;
};

export default fetchInput;

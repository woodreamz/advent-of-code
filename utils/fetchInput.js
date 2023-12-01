import dotenv from 'dotenv';
import fs from 'node:fs';

dotenv.config();

/**
 * Fetch puzzle input and save it locally in the corresponding folder.
 */
const fetchInput = async (year, day) => {
  const folderPath = `./${year}/${day}`;
  const filePath = `${folderPath}/input.txt`;

  if (fs.existsSync(filePath)) {
    // input is already there.
    return;
  }

  const res = await fetch(`https://adventofcode.com/${year}/day/${day}/input`, {
    headers: {
      cookie: `session=${process.env.SESSION_ID}`,
    },
  });

  const text = (await res.text()).trim();

  if (text === 'Puzzle inputs differ by user.  Please log in to get your puzzle input.') {
    throw new Error('Advent of Code did not return a puzzle input');
  }

  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath, { recursive: true });
  }

  fs.writeFileSync(filePath, text);

  return text;
};

export default fetchInput;

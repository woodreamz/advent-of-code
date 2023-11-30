import dotenv from 'dotenv';

dotenv.config();

const fetchInput = async (day) => {
  const res = await fetch(`https://adventofcode.com/2023/day/${day}/input`, {
    headers: {
      cookie: `session=${process.env.SESSION_ID}`,
    },
  });

  const text = (await res.text()).trim();

  if (text === 'Puzzle inputs differ by user.  Please log in to get your puzzle input.') {
    throw new Error('Advent of Code did not return a puzzle input');
  }

  return text;
};

export default fetchInput;

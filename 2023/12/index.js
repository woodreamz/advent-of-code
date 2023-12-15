import fetchInput from '../../utils/fetchInput.js';
import { getLines } from '../../utils/helpers.js';

const DAY = 12;
fetchInput(2023, DAY);
console.log('Advent Of Code - Day ' + DAY);

/**
 * Part 1
 */
const part1 = () => {
  const lines = getLines(2023, DAY);

  return lines
    .map((line) => {
      let [arr, conf] = line.split(' ');
      return {
        arr: arr.split(''),
        position: Array.from(arr.matchAll(/\?/g)).map((x) => x.index),
        conf: conf.split(',').map((x) => parseInt(x)),
      };
    })
    .reduce((acc, { arr, position: pos, conf }) => {
      let count = 0;
      for (let mask = 0; mask < 2 ** pos.length; mask++) {
        let arr2 = [...arr];
        let mask2 = mask;
        for (let i = 0; i < pos.length; i++) {
          arr2[pos[i]] = mask2 % 2 ? '#' : '.';
          mask2 = Math.floor(mask2 / 2);
        }
        let id = 0;
        let cnt = 0;
        let flag = true;
        for (let i = 0; i < arr2.length; i++) {
          if (arr2[i] === '#') ++cnt;
          else if (cnt) {
            if (id >= conf.length || cnt !== conf[id++]) {
              flag = false;
              break;
            }
            cnt = 0;
          }
        }
        if (cnt && (id >= conf.length || cnt !== conf[id++])) {
          flag = false;
        }

        if (flag && id === conf.length) {
          ++count;
        }
      }
      return acc + count;
    }, 0);
};

/**
 * Part 2
 */
const part2 = () => {
  const lines = getLines(2023, DAY);
};

console.log('Part 1 = ', part1());
console.log('Part 2 = ', part2());

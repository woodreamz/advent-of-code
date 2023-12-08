import fetchInput from '../../utils/fetchInput.js';
import { getLines } from '../../utils/helpers.js';

const DAY = 7;
fetchInput(2023, DAY);
console.log('Advent Of Code - Day ' + DAY);

/**
 * Part 1
 */
const part1 = () => {
  const lines = getLines(2023, DAY, 'input');
  const strengths = ['A', 'K', 'Q', 'J', 'T', '9', '8', '7', '6', '5', '4', '3', '2'].reverse();

  const getCardLength = (hand, card) => hand.filter((c) => c === card).length;

  const getHandScore = (hand) => {
    // Five of kind
    if (getCardLength(hand, hand[0]) === 5) {
      return 6;
    }
    // Four of kind
    if (getCardLength(hand, hand[0]) === 4) {
      return 5;
    }
    // Full house
    if (getCardLength(hand, hand[0]) === 3 && getCardLength(hand, hand[3]) === 2) {
      return 4;
    }
    // Three of kind
    if (getCardLength(hand, hand[0]) === 3) {
      return 3;
    }
    // Two pair
    if (getCardLength(hand, hand[0]) === 2 && getCardLength(hand, hand[2]) === 2) {
      return 2;
    }
    // One pair
    if (getCardLength(hand, hand[0]) === 2) {
      return 1;
    }
    // High card
    return 0;
  };

  const handsAndBids = lines.map((line) => {
    const [hand, bid] = line.split(' ');
    const arrHand = hand.split('');

    const sorted = arrHand.sort((a, b) => {
      if (getCardLength(arrHand, a) > getCardLength(arrHand, b)) {
        return -1;
      }
      if (getCardLength(arrHand, a) < getCardLength(arrHand, b)) {
        return 1;
      }
      return strengths.indexOf(b) - strengths.indexOf(a);
    });

    return { sorted, hand, bid: parseInt(bid), score: getHandScore(sorted) };
  });

  handsAndBids.sort((a, b) => {
    if (a.score < b.score) {
      return -1;
    } else if (a.score > b.score) {
      return 1;
    }

    // If equality
    let i = 0;
    while (a.hand[i] === b.hand[i]) {
      i++;
    }

    return strengths.indexOf(a.hand[i]) - strengths.indexOf(b.hand[i]);
  });

  return handsAndBids.reduce((acc, curr, index) => acc + curr.bid * (index + 1), 0);
};

/**
 * Part 2
 */
const part2 = () => {
  const lines = getLines(2023, DAY, 'input');
  const strengths = ['A', 'K', 'Q', 'T', '9', '8', '7', '6', '5', '4', '3', '2', 'J'].reverse();

  const getCardLength = (hand, card) => hand.filter((c) => c === card).length;

  const getHandScore = (hand) => {
    const countJokers = getCardLength(hand, 'J');
    // Five of kind = 6
    if (getCardLength(hand, hand[0]) === 5) {
      return 6;
    }
    // Four of kind = 5
    if (getCardLength(hand, hand[0]) === 4) {
      return countJokers ? 6 : 5;
    }
    // Full house = 4
    if (getCardLength(hand, hand[0]) === 3 && getCardLength(hand, hand[3]) === 2) {
      return countJokers ? 6 : 4;
    }
    // Three of kind = 3
    if (getCardLength(hand, hand[0]) === 3) {
      if (countJokers === 3 || countJokers === 1) {
        return 5;
      }
      return 3;
    }
    // Two pair = 2.5
    if (getCardLength(hand, hand[0]) === 2 && getCardLength(hand, hand[2]) === 2) {
      if (countJokers === 2) {
        return 5;
      }
      if (countJokers === 1) {
        return 4;
      }
      return 2.5;
    }
    // One pair = 2
    if (getCardLength(hand, hand[0]) === 2) {
      if (countJokers === 2 || countJokers === 1) {
        return 3;
      }

      return 2;
    }
    // High card = 1
    return 1 + countJokers;
  };

  const handsAndBids = lines.map((line) => {
    const [hand, bid] = line.split(' ');
    const arrHand = hand.split('');

    const sorted = arrHand.sort((a, b) => {
      if (getCardLength(arrHand, a) > getCardLength(arrHand, b)) {
        return -1;
      }
      if (getCardLength(arrHand, a) < getCardLength(arrHand, b)) {
        return 1;
      }
      return strengths.indexOf(b) - strengths.indexOf(a);
    });

    return { sorted, hand, bid: parseInt(bid), score: getHandScore(sorted) };
  });

  handsAndBids.sort((a, b) => {
    if (a.score < b.score) {
      return -1;
    } else if (a.score > b.score) {
      return 1;
    }

    // If equality
    let i = 0;
    while (a.hand[i] === b.hand[i]) {
      i++;
    }

    return strengths.indexOf(a.hand[i]) - strengths.indexOf(b.hand[i]);
  });

  return handsAndBids.reduce((acc, curr, index) => acc + curr.bid * (index + 1), 0);
};

console.log('Part 1 = ', part1());
console.log('Part 2 = ', part2());

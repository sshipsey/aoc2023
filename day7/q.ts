import fs from 'fs';

fs.readFile('input', 'utf-8', (err, inp) => {
  const allCardsNoWild = [
    'A',
    'K',
    'Q',
    'J',
    'T',
    '9',
    '8',
    '7',
    '6',
    '5',
    '4',
    '3',
    '2',
  ];

  const valuesNoWild = allCardsNoWild.reverse().reduce((acc, c, idx) => {
    acc[c] = idx + 1;
    return acc;
  }, {});

  const allCardsWild = [
    'A',
    'K',
    'Q',
    'T',
    '9',
    '8',
    '7',
    '6',
    '5',
    '4',
    '3',
    '2',
    'J',
  ];

  const valuesWild = allCardsWild.reverse().reduce((acc, c, idx) => {
    acc[c] = idx + 1;
    return acc;
  }, {});

  const countOccurrences = (arr, val) =>
    arr.reduce((a, v) => (v === val ? a + 1 : a), 0);

  const part1 = () => {
    let ranks: any[][] = [];
    for (const [idx, line] of inp.split('\r\n').entries()) {
      const [hand, bid] = line.split(' ');
      const cards = hand.split('');
      const counts: { [key: string]: number } = cards.reduce((acc, card) => {
        acc[card] = acc[card] ? acc[card] + 1 : 1;
        return acc;
      }, {});

      const topRepeatedCardsCount = Math.max(...Object.values(counts));
      ranks[idx] = [];
      // five of a kind
      if (topRepeatedCardsCount === 5) {
        ranks[idx][0] = 7;
      }

      // four of a kind
      else if (topRepeatedCardsCount === 4) {
        ranks[idx][0] = 6;
      }

      // full house
      else if (
        topRepeatedCardsCount === 3 &&
        Object.keys(counts).length === 2
      ) {
        ranks[idx][0] = 5;
      }

      // three of a kind
      else if (topRepeatedCardsCount === 3) {
        ranks[idx][0] = 4;
      }

      // two pair
      else if (
        topRepeatedCardsCount === 2 &&
        countOccurrences(Object.values(counts), 2) === 2
      ) {
        ranks[idx][0] = 3;
      } else if (topRepeatedCardsCount === 2) {
        ranks[idx][0] = 2;
      } else {
        ranks[idx][0] = 1;
      }
      ranks[idx][0] = cards.reduce((acc, c, idx) => {
        acc += valuesNoWild[c] * Math.pow(100, 5 - idx);
        return acc;
      }, +ranks[idx][0] * 1000000000000);
      ranks[idx][1] = +bid;
      ranks[idx][2] = hand;
    }
    const sortedHands = ranks.sort((a, b) => a[0] - b[0]);
    return sortedHands.reduce((sum, [, bid], idx) => sum + bid * (idx + 1), 0);
  };

  const part2 = () => {
    let ranks: any[][] = [];
    for (const [idx, line] of inp.split('\r\n').entries()) {
      const [hand, bid] = line.split(' ');
      const cards = hand.split('');
      const counts: { [key: string]: number } = cards.reduce((acc, card) => {
        if (card !== 'J') {
          acc[card] = acc[card] ? acc[card] + 1 : 1;
        }
        return acc;
      }, {});
      const jokers = countOccurrences(cards, 'J');
      if (Object.values(counts).length === 0) {
        counts['J'] = 0;
      }
      const topRepeatedCardsCount = Math.max(...Object.values(counts)) + jokers;
      ranks[idx] = [];
      // five of a kind
      if (topRepeatedCardsCount >= 5) {
        ranks[idx][0] = 7;
      }

      // four of a kind
      else if (topRepeatedCardsCount === 4) {
        ranks[idx][0] = 6;
      }

      // full house
      else if (
        topRepeatedCardsCount === 3 &&
        ((countOccurrences(Object.values(counts), 2) === 2 && jokers === 1) ||
          (countOccurrences(Object.values(counts), 2) === 1 &&
            countOccurrences(Object.values(counts), 3) === 1))
      ) {
        ranks[idx][0] = 5;
      }

      // three of a kind
      else if (topRepeatedCardsCount === 3) {
        ranks[idx][0] = 4;
      }

      // two pair
      else if (
        topRepeatedCardsCount === 2 &&
        countOccurrences(Object.values(counts), 2) === 2
      ) {
        ranks[idx][0] = 3;
      } else if (topRepeatedCardsCount === 2) {
        ranks[idx][0] = 2;
      } else {
        ranks[idx][0] = 1;
      }

      ranks[idx][0] = cards.reduce((acc, c, idx) => {
        acc += valuesWild[c] * Math.pow(100, 5 - idx);
        return acc;
      }, +ranks[idx][0] * Math.pow(10, 12));
      ranks[idx][1] = +bid;
      ranks[idx][2] = hand;
    }

    const sortedHands = ranks.sort((a, b) => a[0] - b[0]);
    return sortedHands.reduce((sum, [, bid], idx) => sum + bid * (idx + 1), 0);
  };

  console.log(part1(), part2());
});

import fs from 'fs';
import { intersect } from '../util.js';

fs.readFile('input', 'utf-8', (err, inp) => {
  console.log(intersect(['a', 'b', 'c'], ['a']));
  const processCard = (line) => {
    const l = line.split(': ')[1].split(' | ');
    return [
      l[0].replaceAll(/\s+/g, ' ').trim().split(' '),
      l[1].replaceAll(/\s+/g, ' ').trim().split(' '),
    ];
  };

  const cards = inp.split('\r\n');

  const part1 = () =>
    cards.reduce((score, card) => {
      const [winning, myNums] = processCard(card);
      return (
        score +
        myNums.reduce(
          (acc, num) => (winning.includes(num) ? Math.max(acc * 2, 1) : acc),
          0
        )
      );
    }, 0);

  const part2 = () => {
    let cardsCounts = Array(cards.length).fill(1);
    for (let i = 0; i < cards.length; i++) {
      const [winning, myNums] = processCard(cards[i]);

      const matchCount = myNums.reduce(
        (matches, num) => (winning.includes(num) ? ++matches : matches),
        0
      );

      for (let j = 0; j < matchCount; ++j) {
        cardsCounts[i + 1 + j] += cardsCounts[i];
      }
    }
    return cardsCounts.reduce((a, b) => a + b);
  };

  console.log(part1(), part2());
});

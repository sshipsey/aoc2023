import fs from 'fs';

fs.readFile('input', 'utf-8', (err, inp) => {
  const calcDistance = (hold: number, duration: number) =>
    hold * (duration - hold);

  const part1 = (races: number[][]) => {
    let product = 1;
    for (let race of races) {
      let i = 1;
      let d = 0;
      while (true) {
        d = calcDistance(i, race[0]);
        if (d > race[1]) {
          break;
        }
        i++;
      }
      const min = i;
      i = race[0] - 1;
      d = 0;
      while (true) {
        d = calcDistance(i, race[0]);
        if (d > race[1]) {
          break;
        }
        i--;
      }
      const max = i;

      product *= max - min + 1;
    }
    return product;
  };

  console.log(
    part1([
      [46, 214],
      [80, 1177],
      [78, 1402],
      [66, 1024],
    ]),
    part1([[46807866, 214117714021024]])
  );
});

import fs from 'fs';

fs.readFile('input', 'utf-8', (err, inp) => {
  const part1 = () => {
    const lookup: { [key: string]: number } = {
      red: 12,
      green: 13,
      blue: 14,
    };
    const arr = inp.split('\r\n');
    let gamesSum = 0;
    for (let line of arr) {
      const gameId = +(line.match(/Game (\d+)/)?.[1] as string);
      const games = line.split(': ')[1].split('; ');
      const isPossible = games
        .map((game) => [...game.matchAll(/(\d+) (\w+)/g)])
        .map((matched) =>
          matched.map((inner) => +inner[1] <= lookup[inner[2]]).every((v) => v)
        )
        .every((v) => v);
      if (isPossible) {
        gamesSum += +gameId;
      }
    }
    return gamesSum;
  };
  const part2 = () => {
    const arr = inp.split('\r\n');
    let gamesSum = 0;
    for (let line of arr) {
      const lookup: { [key: string]: number } = {
        red: 0,
        green: 0,
        blue: 0,
      };
      const games = line.split(': ')[1].split('; ');
      games
        .map((game) => [...game.matchAll(/(\d+) (\w+)/g)])
        .map((matched) => {
          matched.forEach((inner) => {
            lookup[inner[2]] = Math.max(lookup[inner[2]], +inner[1]);
          });
        });

      const power = Object.values(lookup).reduce((acc, val) => acc * val, 1);
      gamesSum += power;
    }
    return gamesSum;
  };

  console.log(part1(), part2());
});

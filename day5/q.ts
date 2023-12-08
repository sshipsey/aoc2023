import fs from 'fs';

fs.readFile('input', 'utf-8', (err, inp) => {
  const mapSeed = (mapType: number[][], seed: number) => {
    for (const map of mapType) {
      if (seed >= map[1] && seed < map[1] + map[2]) {
        return map[0] + seed - map[1];
      }
    }
    return seed;
  };

  const part1 = () => {
    const lines = inp.split('\r\n');
    const seeds = lines[0].split(': ')[1].split(' ').map(Number);
    let allMaps = [];
    for (let i = 0; i < lines.length; ++i) {
      if (lines[i].includes('map:')) {
        let j = i + 1;
        let maps = [];
        while (lines[j] !== '' && j < lines.length) {
          maps = maps.concat([lines[j].split(' ').map(Number)]);
          j++;
        }
        allMaps = allMaps.concat([maps]);
      }
    }
    return Math.min(
      ...seeds.map((seed) =>
        allMaps.reduce((seed, mapSection) => mapSeed(mapSection, seed), seed)
      )
    );
  };

  const totalSourceRange = (mapType: number[][]) => {
    let min = 0;
    let max = 0;
    for (const map of mapType) {
      min = Math.min(map[1], min);
      max = Math.max(map[1] + map[2], max);
    }
    return [min, max];
  };

  const part2 = () => {
    const lines = inp.split('\r\n');
    const seeds = lines[0].split(': ')[1].split(' ').map(Number);
    let allMaps = [];
    for (let i = 0; i < lines.length; ++i) {
      if (lines[i].includes('map:')) {
        let j = i + 1;
        let maps = [];
        while (lines[j] !== '' && j < lines.length) {
          maps = maps.concat([lines[j].split(' ').map(Number)]);
          j++;
        }
        allMaps = allMaps.concat([maps]);
      }
    }
    const passthroughSources = [
      Math.min(
        ...allMaps.map((map) => totalSourceRange(map)).map((range) => range[0])
      ),
      Math.max(
        ...allMaps.map((map) => totalSourceRange(map)).map((range) => range[1])
      ),
    ];
    console.log(passthroughSources);
    let newSeeds = [];
    for (let i = 1; i < seeds.length; i += 2) {
      seeds[i] = Math.min(passthroughSources[1], seeds[i - 1] + seeds[i]);
    }
    console.log(seeds);
    for (let i = 0; i < seeds.length; i += 2) {
      for (let j = seeds[i]; j < seeds[i] + seeds[i + 1]; j++) {
        newSeeds = newSeeds.concat(j);
      }
    }
    return Math.min(
      ...newSeeds.map((seed) =>
        allMaps.reduce((seed, mapSection) => mapSeed(mapSection, seed), seed)
      )
    );
  };

  console.log(part1(), part2());
});

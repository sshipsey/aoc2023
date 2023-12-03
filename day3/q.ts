import fs from 'fs';

fs.readFile('input', 'utf-8', (err, inp) => {
  const isSymbol = (char: string) => isNaN(+char) && char !== '.';

  const checkNeighbors = (matrix: string[][], row: number, col: number) =>
    [
      isSymbolAtCoord(matrix, row, col + 1),
      isSymbolAtCoord(matrix, row, col - 1),
      isSymbolAtCoord(matrix, row + 1, col),
      isSymbolAtCoord(matrix, row + 1, col + 1),
      isSymbolAtCoord(matrix, row + 1, col - 1),
      isSymbolAtCoord(matrix, row - 1, col),
      isSymbolAtCoord(matrix, row - 1, col + 1),
      isSymbolAtCoord(matrix, row - 1, col - 1),
    ].some((v) => v);

  const checkGears = (matrix: string[][], row: number, col: number) =>
    [
      getGearAtCoord(matrix, row, col + 1),
      getGearAtCoord(matrix, row, col - 1),
      getGearAtCoord(matrix, row + 1, col),
      getGearAtCoord(matrix, row + 1, col + 1),
      getGearAtCoord(matrix, row + 1, col - 1),
      getGearAtCoord(matrix, row - 1, col),
      getGearAtCoord(matrix, row - 1, col + 1),
      getGearAtCoord(matrix, row - 1, col - 1),
    ].filter((v) => !!v);

  const getGearAtCoord = (matrix: string[][], row: number, col: number) =>
    row > 0 && col > 0 && row < matrix[0].length && col < matrix.length
      ? matrix[row][col] === '*'
        ? `${row},${col}`
        : false
      : false;

  const isSymbolAtCoord = (matrix: string[][], row: number, col: number) =>
    row > 0 && col > 0 && row < matrix[0].length && col < matrix.length
      ? isSymbol(matrix[row][col])
      : false;

  const part1 = () => {
    const matrix: string[][] = [];
    let sum = 0;
    for (let [i, row] of inp.split('\r\n').entries()) {
      matrix[i] = [];
      for (let [j, val] of row.split('').entries()) {
        matrix[i][j] = val;
      }
    }
    let workingNumberStr = '';
    let isPartNumberFlag = false;
    for (let [i, row] of matrix.entries()) {
      for (let [j, val] of matrix[i].entries()) {
        if (!isNaN(+val)) {
          workingNumberStr += val;
          if (checkNeighbors(matrix, i, j)) {
            isPartNumberFlag = true;
          }
        } else if (isPartNumberFlag) {
          sum += +workingNumberStr;
          workingNumberStr = '';
          isPartNumberFlag = false;
        } else {
          workingNumberStr = '';
          isPartNumberFlag = false;
        }
      }
    }
    if (isPartNumberFlag) {
      sum += +workingNumberStr;
    }
    return sum;
  };

  const part2 = () => {
    const matrix: string[][] = [];
    let sum = 0;
    for (let [i, row] of inp.split('\r\n').entries()) {
      matrix[i] = [];
      for (let [j, val] of row.split('').entries()) {
        matrix[i][j] = val;
      }
    }
    let workingNumberStr = '';
    let matchedGears: string[] = [];

    const gearDict: { [key: string]: number[] } = {};

    for (let [i, row] of matrix.entries()) {
      for (let [j, val] of matrix[i].entries()) {
        if (!isNaN(+val)) {
          workingNumberStr += val;
          matchedGears = [
            ...new Set(
              matchedGears.concat(checkGears(matrix, i, j) as string[])
            ),
          ];
        } else if (matchedGears.length > 0) {
          for (let gear of matchedGears) {
            gearDict[gear] = gearDict[gear]
              ? gearDict[gear].concat(+workingNumberStr)
              : [+workingNumberStr];
          }
          matchedGears = [];
          workingNumberStr = '';
        } else {
          workingNumberStr = '';
          matchedGears = [];
        }
      }
    }
    if (matchedGears.length > 0) {
      for (let gear of matchedGears) {
        gearDict[gear] = gearDict[gear]
          ? gearDict[gear].concat(+workingNumberStr)
          : [+workingNumberStr];
      }
    }
    for (const gear of Object.keys(gearDict)) {
      if (gearDict[gear].length === 2) {
        sum += gearDict[gear][0] * gearDict[gear][1];
      }
    }
    return sum;
  };

  console.log(part1(), part2());
});

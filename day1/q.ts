import fs from 'fs';

fs.readFile('input', 'utf-8', (err, inp) => {
  const part1 = () => {
    let answer = 0;
    // multi line
    const arr = inp.split('\r\n');

    for (let line of arr) {
      line = line.replace(/[a-z]/g, '');
      answer += +(line[0] + line[line.length - 1]);
    }
    return answer;
  };

  const part2 = () => {
    let answer = 0;
    // multi line
    const arr = inp.split('\r\n');
    const vals: { [key: string]: any } = {
      zero: 0,
      one: 1,
      two: 2,
      three: 3,
      four: 4,
      five: 5,
      six: 6,
      seven: 7,
      eight: 8,
      nine: 9,
    };

    for (let line of arr) {
      let wordBuilder = '';
      let lineNumbersString = '';
      for (let char of line) {
        if (!isNaN(+char)) {
          lineNumbersString += char;
          wordBuilder = '';
          continue;
        }
        wordBuilder += char;
        for (let val of Object.keys(vals)) {
          if (wordBuilder.includes(val)) {
            lineNumbersString += vals[val];
            wordBuilder = '';
          }
        }
      }

      answer += +(
        lineNumbersString[0] + lineNumbersString[lineNumbersString.length - 1]
      );
    }
    return answer;
  };

  console.log(part1(), part2());
});

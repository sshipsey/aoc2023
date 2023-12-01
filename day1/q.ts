import fs from 'fs';

fs.readFile('input', 'utf-8', (err, inp) => {
  let answer = 0;
  // multi line
  const arr = inp.split('\r\n');
  for (let line of arr) {
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

    let currentWord = '';
    let v = '';
    for (let i = 0; i < line.length; ++i) {
      currentWord += line[i];
      if (line[i].match(/\d/)) {
        v += line[i];
      }
      for (let val of Object.keys(vals)) {
        if (currentWord.includes(val)) {
          v += vals[val];
          currentWord = '';
        }
      }
    }
    // let x = line.replace(/\d/g, '');
    // for (let val of Object.keys(vals)) {
    //   x = x.replace(val, vals[val]);
    // }
    // x = x.replace(/[a-z]/g, '');
    const val = +(v[0] + v[v.length - 1]);
    answer += val;
  }
  console.log(answer);
});

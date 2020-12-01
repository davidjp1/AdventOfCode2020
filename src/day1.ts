const run = (input: string) => {
  const inputArr = input.split('\n').map(a => parseInt(a));
  // A very trivial and slow solution to the problem (filters provide a slight optimisation)
  for (const i of inputArr.filter(a => a < 2020)) {
    for (const j of inputArr.filter(a => i + a < 2020)) {
      for (const k of inputArr) {
        if (i + j + k === 2020) {
          return i * j * k;
        }
      }
    }
  }
};

exports.run = run;

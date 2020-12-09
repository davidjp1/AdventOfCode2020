const getAllValidNumbers = (preamble: number[]): number[] => {
  const validNums: number[] = [];
  for (const x of preamble) {
    for (const y of preamble) {
      if (x !== y) {
        validNums.push(x + y);
      }
    }
  }
  return validNums;
}

const run = (input: string): number => {
  const xmas: number[] = input.replace(/\r/g, '').split('\n').map(n => parseInt(n));

  const preambleSize = 25;
  return xmas.slice(preambleSize).find((n, i) => !getAllValidNumbers(xmas.slice(i, i + preambleSize)).includes(n)) || -1;
}
export { run }

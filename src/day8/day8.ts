interface LOC {
  action: string;
  value: number;
  numberOfTimesRan: number;
}
const run = (input: string): number => {
  const linesOfCode: LOC[] = input.replace(/\r/g, '').split('\n').map((rawLoc, i) => {
    const matches = rawLoc.match(/(nop|acc|jmp)\s([+|-][0-9]+)/);
    if (!matches || !matches[1] || !matches[2]) {
      throw Error(`input code parse error on line=${i}`);
    }
    return {
      action: matches[1],
      value: parseInt(matches[2]),
      numberOfTimesRan: 0
    }
  });

  return execute(linesOfCode, 0, 0);
}
const execute = (code: LOC[], currentLine: number, acc: number): number => {
  const loc = code[currentLine];
  console.log(`${loc.action}  ${loc.value >= 0 ? '+' : ''}${loc.value}  |   ${acc}`);
  if (loc.numberOfTimesRan === 1) {
    return acc;
  }
  code[currentLine].numberOfTimesRan++;
  switch (loc.action) {
    case 'nop':
      return execute(code, currentLine + 1, acc);
    case 'acc':
      return execute(code, currentLine + 1, acc + loc.value);
    case 'jmp':
      return execute(code, currentLine + loc.value, acc);
    default:
      throw Error(`Unexpected command: ${loc.action}`);
  }
}
export { run }

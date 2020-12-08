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

  console.log('Part 1=', execute(linesOfCode, 0, 0).acc);
  //reset
  linesOfCode.map(a => { a.numberOfTimesRan = 0 });
  //brute force swapping nops and jmps
  for (let i = 0; i < linesOfCode.length; i++) {
    if (['jmp', 'nop'].includes(linesOfCode[i].action)) {
      const cloneLocs: LOC[] = JSON.parse(JSON.stringify(linesOfCode));
      cloneLocs[i].action = (cloneLocs[i].action === 'jmp') ? 'nop' : 'jmp';
      const result = execute(cloneLocs, 0, 0);
      if (result.success) {
        return result.acc;
      }
    }
  }
  return -1;
}

const execute = (code: LOC[], currentLine: number, acc: number): { acc: number, success: boolean } => {
  const loc = code[currentLine];
  if (loc === undefined) {
    //terminate when we run out of lines
    return { acc: acc, success: true };
  }
  if (loc.numberOfTimesRan === 1) {
    //terminate on repeats
    return { acc: acc, success: false };
  }
  // console.log(`${loc.action}  ${loc.value >= 0 ? '+' : ''}${loc.value}  |   ${acc}`);
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

const ofNullable = <T>(nullable: T | null): T => {
  if (nullable) {
    return nullable;
  }
  throw Error('Object was falsy');
}

const run = (input: string): number => {

  const inputArr = input.replace(/\r/g, '').split('\n');

  const toBinaryCharArray = (decimalValue: number): string[] => {
    const binaryString = [...decimalValue.toString(2)];
    while (binaryString.length < 36) {
      binaryString.unshift('0');
    }
    return binaryString;
  }

  const applyBitmask = (decimalValue: number, mask: string): number => {
    const binaryString = toBinaryCharArray(decimalValue);
    for (let i = 0; i < mask.length; i++) {
      if (mask[i] !== 'X') {
        binaryString[i] = mask[i];
      }
    }
    return parseInt(binaryString.join(''), 2);
  };

  const getAllPermutations = (floatingBinaryString: string[], permutations: string[][] = []): string[][] => {
    if (!floatingBinaryString.includes('X')) {
      return [floatingBinaryString];
    }
    const i = floatingBinaryString.indexOf('X');
    const left = JSON.parse(JSON.stringify(floatingBinaryString));
    left[i] = '0';
    const right = JSON.parse(JSON.stringify(floatingBinaryString));
    right[i] = '1';

    return getAllPermutations(left, permutations).concat(getAllPermutations(right, permutations));
  }

  const applyFloatingBitmask = (decimalValue: number, mask: string, valueToWrite: number, memory: { [address: number]: number}): void => {
    const binaryString = toBinaryCharArray(decimalValue);
    for (let i = 0; i < mask.length; i++) {
      if (mask[i] === 'X' || mask[i] === '1') {
        binaryString[i] = mask[i];
      }
    }
    const permutations = getAllPermutations(binaryString).filter(perm => !perm.includes('X'));
    permutations.map(perm => parseInt(perm.join(''), 2)).forEach(addr => {
      memory[addr] = valueToWrite;
    });
  }

  let mask: string;
  const part1Memory: { [address: number]: number} = [];
  const part2Memory: { [address: number]: number} = [];

  inputArr.forEach((line) => {
    if (line.includes('mask')) {
      mask = ofNullable(line.match(/^mask = (.*)$/))[1];
    } else {
      const matches = ofNullable(line.match(/^mem\[([0-9]*)\] = ([0-9]*)$/));
      part1Memory[parseInt(matches[1])] = applyBitmask(parseInt(matches[2]), mask);
      applyFloatingBitmask(parseInt(matches[1]), mask, parseInt(matches[2]), part2Memory);
    }
  });
  console.log(`Part 1 = ${Object.values(part1Memory).reduce((a, b) => a + b)}`);
  return Object.values(part2Memory).reduce((a, b) => a + b, 0);
}
export { run }
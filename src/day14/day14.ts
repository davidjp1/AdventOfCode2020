const ofNullable = <T>(nullable: T | null): T => {
  if (nullable) {
    return nullable;
  }
  throw Error('Object was falsy');
}

const run = (input: string): number => {

  const inputArr = input.replace(/\r/g, '').split('\n');

  const applyBitmask = (decimalValue: number, mask: string): number => {
    const binaryString = [...decimalValue.toString(2)];
    while(binaryString.length < 36){
      binaryString.unshift('0');
    }
    for(let i = 0; i < mask.length; i++){
      if(mask[i] !== 'X'){
        binaryString[i] = mask[i];
      }
    }
    return parseInt(binaryString.join(''), 2);
  };

  let mask: string;
  const memory: number[] = [];
  inputArr.forEach((line) => {
    if (line.includes('mask')) {
        mask = ofNullable(line.match(/^mask = (.*)$/))[1];
    } else {
      const matches = ofNullable(line.match(/^mem\[([0-9]*)\] = ([0-9]*)$/));
      memory[parseInt(matches[1])] = applyBitmask(parseInt(matches[2]), mask);
    }
  });
  return memory.reduce((a,b) => a + b);
}
export { run }
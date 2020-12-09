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
};

const findContiguousSet = (data: number[], targetSum: number): number[] => {
  for(let i = 0; i < data.length; i++){
    const result = [data[i]];
    let sum = data[i];
    for(const y of data.slice(i + 1, data.length - 1)){
      sum += y;
      result.push(y);
      if(sum >= targetSum){
        break;
      }
    }
    if(sum === targetSum){
      return result;
    }
  }
  throw Error('Result not found');
};


const run = (input: string): number => {
  const xmas: number[] = input.replace(/\r/g, '').split('\n').map(n => parseInt(n));

  const preambleSize = 25;
  const firstInvalidNumber = xmas.slice(preambleSize).find((n, i) => !getAllValidNumbers(xmas.slice(i, i + preambleSize)).includes(n));
  if(firstInvalidNumber === undefined){
    throw Error('Invalid number not found');
  }
  console.log(`Part 1: ${firstInvalidNumber}`);

  const continguousSet = findContiguousSet(xmas.filter(i => i !== firstInvalidNumber), firstInvalidNumber).sort((a,b) => a - b);
  return continguousSet[0] + continguousSet[continguousSet.length - 1];
}
export { run }

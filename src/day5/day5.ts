const partitioner = (leftSplitChar: string, rightSplitChar: string, start: number, end: number, splits: string[]): number => {
  if(start === end){
    return start;
  }
  const splitChar = splits.shift();
  if(splitChar === leftSplitChar){
    return partitioner(leftSplitChar, rightSplitChar, start, end - Math.ceil((end - start)/2), splits);
  }
  if(splitChar === rightSplitChar){
    return partitioner(leftSplitChar, rightSplitChar, start + Math.ceil((end - start)/2), end, splits);
  }
  throw Error('Unexpected character passed to partioner');
}

const run = (input : string): number => {

  const getSeatId = (boardingPass: string): number => {
    const rowNum = partitioner('F','B', 0, 127, boardingPass.substring(0, 7).split(''));
    const columnNum = partitioner('L','R', 0, 7, boardingPass.substring(7, 10).split(''));
    return rowNum * 8 + columnNum;
  }

  const boardingPasses: string[] = input.replace(/\r/g, '').split('\n');
  const seatIds = boardingPasses.map(getSeatId);
  const maxSeat = seatIds.sort((a,b) => b - a)[0];
  return [...Array(maxSeat).keys()].filter(i => !seatIds.includes(i)).sort((a,b) => b - a)[0];
}
export {run}
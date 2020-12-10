const getGaps = (currentAdapter: number, adapters: number[], jumpCounts: number[] = []): number[] => {
  if(adapters.length === 0){
    return jumpCounts;
  }
  const nextAdapter = adapters.find(adapter => adapter - currentAdapter <= 3);
  if(!nextAdapter){
    throw Error('No valid adapter found');
  }
  const jumpSize = nextAdapter - currentAdapter;
  jumpCounts[jumpSize] = jumpCounts[jumpSize] ? jumpCounts[jumpSize] + 1 : 1; 
  return getGaps(nextAdapter, adapters.filter(adapter => adapter !== nextAdapter), jumpCounts);
}

const run = (input: string): number => {
  const adapters: number[] = input.replace(/\r/g, '').split('\n').map(n => parseInt(n));

  
  const sortedAdapters = adapters.sort((a, b) => a - b);
  // Add the wall socket to the list of adapters
  sortedAdapters.push(sortedAdapters[sortedAdapters.length - 1] + 3);
  const gaps = getGaps(0, sortedAdapters);

  return gaps[1] * gaps[3];
}
export { run }

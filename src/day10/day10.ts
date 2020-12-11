const getRoutes = (adapters: number[], targetVoltage: number): number => {
  // Solution heavily inspired by allc => https://github.com/allc/Advent-of-Code-2020
  const permutations: number[] = new Array(targetVoltage - 1).fill(0);
  permutations[2] = 1;
  for (const adapter of adapters.filter(a => a !== targetVoltage)) {
    const i = adapter + 2;
    console.log(i, permutations[i-1], permutations[i-2], permutations[i-3]);
    permutations[i] = permutations[i - 1] + permutations[i - 2] + permutations[i - 3];
  }
  return permutations[permutations.length - 1];
}

const getGaps = (currentAdapter: number, adapters: number[], jumpCounts: number[] = []): number[] => {
  if (adapters.length === 0) {
    return jumpCounts;
  }
  const nextAdapter = adapters.find(adapter => adapter - currentAdapter <= 3);
  if (!nextAdapter) {
    throw Error('No valid adapter found');
  }
  const jumpSize = nextAdapter - currentAdapter;
  jumpCounts[jumpSize] = jumpCounts[jumpSize] ? jumpCounts[jumpSize] + 1 : 1;
  return getGaps(nextAdapter, adapters.filter(adapter => adapter !== nextAdapter), jumpCounts);
}

const run = (input: string): number => {
  const adapters: number[] = input.replace(/\r/g, '').split('\n').map(n => parseInt(n));

  const sortedAdapters = adapters.sort((a, b) => a - b);
  const targetVoltage = sortedAdapters[sortedAdapters.length - 1] + 3;
  // Add the wall socket to the list of adapters
  sortedAdapters.push(targetVoltage);
  const gaps = getGaps(0, sortedAdapters);
  console.log(`Part 1= ${gaps[1] * gaps[3]}`);

  return getRoutes(sortedAdapters, targetVoltage);
}
export { run }

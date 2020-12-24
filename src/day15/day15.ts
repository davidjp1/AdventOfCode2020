const run = (input: string): number => {
  const playGame = (sequence: number[], target: number): number => {
    const spoken: { [lastSpoken: number]: number } = {};
    //Add all except the last one
    for (let i = 0; i < sequence.length - 1; i++) {
      spoken[sequence[i]] = i + 1;
    }
    let currSpoken = sequence[sequence.length - 1];
    for (let turn = sequence.length; turn < target; turn++) {
      if (!spoken[currSpoken]) {
        spoken[currSpoken] = turn;
        currSpoken = 0;
      }
      else {
        const lastTimeSpoken = spoken[currSpoken];
        spoken[currSpoken] = turn;
        currSpoken = turn - lastTimeSpoken;
      }
    }
    return currSpoken;
  }

  const sequence = input.split(',').map(a => parseInt(a));
  console.log(`Part 1 = ${playGame(sequence, 2020)}`)
  return playGame(sequence, 30000000);
}
export { run }
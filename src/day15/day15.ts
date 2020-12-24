const run = (input: string): number => {
  const playGame = (sequence: number[], target: number): number => {
    const turnNumber = sequence.length + 1;
    const lastNumber = sequence[sequence.length - 1];
    const lastSpokenOnTurn = sequence.slice(0, sequence.length - 1).lastIndexOf(lastNumber);
    const nextToSpeak = lastSpokenOnTurn === -1 ? 0 : sequence.length - (lastSpokenOnTurn + 1);
    
    if(turnNumber === target){
      return nextToSpeak;
    }
    sequence.push(nextToSpeak);
    return playGame(sequence, target);
  }

  const sequence = input.split(',').map(a => parseInt(a));
  return playGame(sequence, 2020);
}
export { run }
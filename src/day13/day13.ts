/* eslint-disable no-constant-condition */
const getFirstAvaiableBusWait = (bus: number, earliestTime: number) : number => {
  let current = 0;
  while(current < earliestTime){
    current += bus;
  }
  return current - earliestTime;
}

const part1 = (input: string[]): number => {
  const earliestTime = parseInt(input[0]);
  const busTimers = input[1].split(',').filter(a => a !== 'x').map(a => parseInt(a));
  const bestBus = busTimers.map(bus => ({busId: bus, timeToWait: getFirstAvaiableBusWait(bus, earliestTime)}))
    .sort((a,b) => a.timeToWait - b.timeToWait)[0];

  return bestBus.busId * bestBus.timeToWait;
}
const part2 = (inputArr: string[]): number => {
  const buses: number[] = [];
  inputArr[1].split(',').forEach((bus,i) => {
    if(bus !== 'x'){
      buses[i] = parseInt(bus);
    }
  });

  let t = 0;
  let offset = 1;
  // https://en.wikipedia.org/wiki/Chinese_remainder_theorem
  buses.forEach((bus, index) => {
    while (true) {
      if ((t + index) % bus === 0) {
        offset = offset * bus;
        break;
      }
      t += offset;
    }
  });
  return t;
}

const run = (input: string): number => {
  const inputArr = input.replace(/\r/g, '').split('\n');
  console.log(`Part 1: `+part1(inputArr));
  return part2(inputArr);
}
export { run }

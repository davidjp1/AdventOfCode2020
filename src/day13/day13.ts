const getFirstAvaiableBusWait = (bus: number, earliestTime: number) : number => {
  let current = 0;
  while(current < earliestTime){
    current += bus;
  }
  return current - earliestTime;
}

const run = (input: string): number => {
  const inputArr = input.replace(/\r/g, '').split('\n');
  const earliestTime = parseInt(inputArr[0]);
  const busTimers = inputArr[1].split(',').filter(a => a !== 'x').map(a => parseInt(a));
  const bestBus = busTimers.map(bus => ({busId: bus, timeToWait: getFirstAvaiableBusWait(bus, earliestTime)}))
    .sort((a,b) => a.timeToWait - b.timeToWait)[0];
  return bestBus.busId * bestBus.timeToWait;
}
export { run }

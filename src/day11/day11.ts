/* eslint-disable no-constant-condition */
enum Seat {
  EMPTY = 'L',
  OCCUPIED = '#',
  FLOOR = '.'
}

const occupiedVisibleSeatSearch = (planeState: Seat[][], currentX: number, currentY: number, xIncrement: number, yIncrement: number): number => {
  const nextX = currentX + xIncrement;
  const nextY = currentY + yIncrement;
  if(nextY < planeState.length && nextY >= 0 && nextX < planeState[0].length && nextX >= 0){
    switch(planeState[nextY][nextX]){
        case Seat.EMPTY: return 0;
        case Seat.OCCUPIED: return 1;
        default: return occupiedVisibleSeatSearch(planeState, nextX, nextY, xIncrement, yIncrement);
    }
  }
  return 0;
}

const adjacentOccupiedSeatsCount = (planeState: Seat[][], xPos: number, yPos: number): number => {
  return occupiedVisibleSeatSearch(planeState, xPos, yPos, -1, 0) +
    occupiedVisibleSeatSearch(planeState, xPos, yPos, 0, -1) +
    occupiedVisibleSeatSearch(planeState, xPos, yPos, 0, 1) +
    occupiedVisibleSeatSearch(planeState, xPos, yPos, 1, 0) +
    occupiedVisibleSeatSearch(planeState, xPos, yPos, -1, -1) +
    occupiedVisibleSeatSearch(planeState, xPos, yPos, 1, 1) +
    occupiedVisibleSeatSearch(planeState, xPos, yPos, 1, -1) +
    occupiedVisibleSeatSearch(planeState, xPos, yPos, -1, 1);
}

/*
 * -  If a seat is empty (L) and there are no occupied seats adjacent to it, the seat becomes occupied.
 * -  If a seat is occupied (#) and four or more seats adjacent to it are also occupied, the seat becomes empty.
 *    Otherwise, the seat's state does not change.
*/
const updatePlaneState = (planeState: Seat[][]) : Seat[][] => {
  const newPlaneState: Seat[][] = JSON.parse(JSON.stringify(planeState));
  for(let y = 0; y < planeState.length; y++){
    for(let x = 0; x < planeState[0].length; x++){
      const occupiedCount = adjacentOccupiedSeatsCount(planeState, x, y);
      if(occupiedCount === 0 && planeState[y][x] === Seat.EMPTY){
        newPlaneState[y][x] = Seat.OCCUPIED;
      }
      if(occupiedCount >= 5 && planeState[y][x] === Seat.OCCUPIED){
        newPlaneState[y][x] = Seat.EMPTY;
      }
    }
  }
  return newPlaneState;
}

const run = (input: string): number => {
  // Code for part 2 only included today, if you want to see the part 1 solution you'll have to go into the git history

  let planeState: Seat[][] = input.replace(/\r/g, '').split('\n').map(line => line.split('').map(char => char as Seat));

  while(true){
    //planeState.forEach(row => console.log(row.join('')));
    const nextPlaneState = updatePlaneState(planeState);
    if(JSON.stringify(nextPlaneState) === JSON.stringify(planeState)){
      return planeState.flat().filter(seat => seat === Seat.OCCUPIED).length;
    }
    planeState = nextPlaneState;
  }
}
export { run }

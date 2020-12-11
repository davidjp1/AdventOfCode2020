/* eslint-disable no-constant-condition */
enum Seat {
  EMPTY = 'L',
  OCCUPIED = '#',
  FLOOR = '.'
}
const toSeatEnum = (char: string): Seat => {
  return (char as Seat);
}

const adjacentSeats = (planeState: Seat[][], xPos: number, yPos: number) : Seat[] => {
  const adjacentSeats: Seat[] = [];
  const maxY = planeState.length - 1;
  const maxX = planeState[0].length - 1;

  //West
  if(xPos > 0){
    adjacentSeats.push(planeState[yPos][xPos - 1]);
  }
  //South
  if(yPos > 0){
    adjacentSeats.push(planeState[yPos - 1][xPos]);
  }
  //East
  if(xPos < maxX){
    adjacentSeats.push(planeState[yPos][xPos + 1]);
  }
  //North
  if(yPos < maxY){
    adjacentSeats.push(planeState[yPos + 1][xPos]);
  }
  //SouthWest
  if(xPos > 0 && yPos > 0){
    adjacentSeats.push(planeState[yPos - 1][xPos - 1]);
  }
  //NorthEast
  if(xPos < maxX && yPos < maxY){
    adjacentSeats.push(planeState[yPos + 1][xPos + 1]);
  }
  //SouthEast
  if(xPos < maxX && yPos > 0){
    adjacentSeats.push(planeState[yPos - 1][xPos + 1]);
  }
  //NorthWest
  if(xPos > 0 && yPos < maxY){
    adjacentSeats.push(planeState[yPos + 1][xPos - 1]);
  }
  return adjacentSeats;
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
      const occupiedCount = adjacentSeats(planeState, x, y).filter(seat => seat === Seat.OCCUPIED).length;
      if(occupiedCount === 0 && planeState[y][x] === Seat.EMPTY){
        newPlaneState[y][x] = Seat.OCCUPIED;
      }
      if(occupiedCount >= 4 && planeState[y][x] === Seat.OCCUPIED){
        newPlaneState[y][x] = Seat.EMPTY;
      }
    }
  }
  return newPlaneState;
}

const getOccupiedSeatCount = (planeState: Seat[][]): number => {
  let occupiedCount = 0;
  planeState.forEach(row => row.forEach(seat => {
    if (seat === Seat.OCCUPIED) {
      occupiedCount++;
    }
  }));
  return occupiedCount;
}
const run = (input: string): number => {
  let planeState: Seat[][] = input.replace(/\r/g, '').split('\n').map(line => line.split('').map(char => toSeatEnum(char)));

  while(true){
    //planeState.forEach(row => console.log(row.join('')));
    const nextPlaneState = updatePlaneState(planeState);
    if(JSON.stringify(nextPlaneState) === JSON.stringify(planeState)){
      return getOccupiedSeatCount(planeState);
    }
    planeState = nextPlaneState;
  }
}
export { run }

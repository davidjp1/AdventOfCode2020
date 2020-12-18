enum Direction {
  // Directions to move
  NORTH = 'N',
  SOUTH = 'S',
  EAST = 'E',
  WEST = 'W',
  // Directions to turn
  LEFT = 'L',
  RIGHT = 'R',
  // Direction to move forwards in currently facing direction
  FORWARD = 'F'
}
interface BoatState {
  // Number of degrees (0 === NORTH, 90 === EAST etc.)
  facingDirection: number,
  xPos: number,
  yPos: number
}
const degreesToDirection = (degrees: number): Direction => {
  switch (degrees) {
    case 0:
      return Direction.NORTH;
    case 90:
      return Direction.EAST;
    case 180:
      return Direction.SOUTH;
    case 270:
      return Direction.WEST;
    default:
      throw Error(`Unexpected direction=${degrees}`);
  }
}

const doAction = (boatState: BoatState, action: Direction, amount: number) => {
  switch (action) {
    case Direction.NORTH:
      boatState.yPos += amount;
      break;
    case Direction.EAST:
      boatState.xPos += amount;
      break;
    case Direction.SOUTH:
      boatState.yPos -= amount;
      break;
    case Direction.WEST:
      boatState.xPos -= amount;
      break;
    case Direction.LEFT:
      boatState.facingDirection = (boatState.facingDirection - amount) % 360;
      if(boatState.facingDirection < 0){
        boatState.facingDirection = 360 + boatState.facingDirection;
      }
      break;
    case Direction.RIGHT:
      boatState.facingDirection = (boatState.facingDirection + amount) % 360;
      if(boatState.facingDirection < 0){
        boatState.facingDirection = 360 + boatState.facingDirection;
      }
      break;
    case Direction.FORWARD:
      doAction(boatState, degreesToDirection(boatState.facingDirection), amount);
      break;
  }
}

const run = (input: string): number => {
  const actions = input.replace(/\r/g, '').split('\n').map(a => ({
    action: a[0] as Direction,
    amount: parseInt(a.substring(1, a.length))
  }));
  const state: BoatState = {
    facingDirection: 90,
    xPos: 0,
    yPos: 0
  }
  actions.forEach(({ action, amount }) => doAction(state, action, amount));
  return Math.abs(state.xPos) + Math.abs(state.yPos);
}
export { run }

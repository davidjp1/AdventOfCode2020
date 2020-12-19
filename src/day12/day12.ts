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
interface State {
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

const doAction = (boatState: State, action: Direction, amount: number): void => {
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

const rotateWaypoint = (waypoint: State, clockwise: boolean, amount: number): void => {
  const radians = Math.PI * (clockwise ? amount : -amount) / 180;

  const newX = Math.cos(radians) * waypoint.xPos + Math.sin(radians) * waypoint.yPos;
  const newY = Math.cos(radians) * waypoint.yPos - Math.sin(radians) * waypoint.xPos;
  waypoint.xPos = Math.round(newX);
  waypoint.yPos = Math.round(newY);
}

const doActionWithWaypoint = (boatState: State, waypointState: State, action: Direction, amount: number): void => {
  switch (action) {
    case Direction.NORTH:
      waypointState.yPos += amount;
      break;
    case Direction.EAST:
      waypointState.xPos += amount;
      break;
    case Direction.SOUTH:
      waypointState.yPos -= amount;
      break;
    case Direction.WEST:
      waypointState.xPos -= amount;
      break;
    case Direction.LEFT:
      rotateWaypoint(waypointState, false, amount);
      break;
    case Direction.RIGHT:
      rotateWaypoint(waypointState, true, amount);
      break;
    case Direction.FORWARD:
      boatState.xPos += waypointState.xPos * amount;
      boatState.yPos += waypointState.yPos * amount;
      break;
  }
}

const run = (input: string): number => {
  const actions = input.replace(/\r/g, '').split('\n').map(a => ({
    action: a[0] as Direction,
    amount: parseInt(a.substring(1, a.length))
  }));
  const state: State = {
    facingDirection: 90,
    xPos: 0,
    yPos: 0
  }
  actions.forEach(({ action, amount }) => doAction(state, action, amount));
  console.log(`Part 1 = ` + (Math.abs(state.xPos) + Math.abs(state.yPos)));

  const waypointState = {
    xPos: 10,
    yPos: 1,
    facingDirection: 0
  }
  //Reset boat state (facing direction not used in p2)
  state.xPos = 0;
  state.yPos = 0;
  actions.forEach(({action, amount}) => doActionWithWaypoint(state, waypointState, action, amount));
  return Math.abs(state.xPos) + Math.abs(state.yPos);

}
export { run }

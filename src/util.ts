const ofNullable = <T>(nullable: T | null | undefined, errorMessage = 'Object was falsy'): T => {
  if (nullable) {
    return nullable;
  }
  throw Error(errorMessage);
}
const intersectionOfMultiple = <T>(...arrs: T[][]): T[] => {
  return arrs.reduce((a,b) => intersection(a,b));
}
const intersection = <T>(arrA: T[], arrB: T[]) : T[] => {
  return arrA.filter(a => arrB.includes(a));
}
export {ofNullable, intersection, intersectionOfMultiple};
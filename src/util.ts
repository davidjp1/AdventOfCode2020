const ofNullable = <T>(nullable: T | null | undefined, errorMessage = 'Object was falsy'): T => {
  if (nullable) {
    return nullable;
  }
  throw Error(errorMessage);
}
export {ofNullable};
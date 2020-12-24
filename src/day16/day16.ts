import { ofNullable } from "../util";

interface Range {
  min: number,
  max: number
}

const inRanges = (value: number, ranges: Range[]) : boolean => {
  for(const range of ranges){
    if(value >= range.min && value <= range.max){
        return true;
    }
  }
  return false;
}

// Simple validator to check if ticket contains a value that is invalid for all possible ranges
const validateTicket = (ticket: number[], ranges: Range[]): number | null => {
  for(const value of ticket){
    if(!inRanges(value, ranges)){
      return value;
    }
  }
  return null;
}

const run = (input: string): number => {
  input = input.replace(/\r/g, '');
  const myTicket: number[] = ofNullable(input.match(/your ticket:\n([0-9,]*)/))[1]
    .split(",")
    .map(a => parseInt(a));
  const otherTickets: number[][] = ofNullable(input.match(/nearby tickets:\n([\s\S]*)/))[1]
    .split('\n')
    .map(line => line.split(',')
      .map(a => parseInt(a)));
  
  let validRanges: Range[] = [];
  [...input.matchAll(/(.*): ([0-9]*)-([0-9]*) or ([0-9]*)-([0-9]*)/g)].forEach((match) =>
    validRanges = validRanges.concat([
      { min: parseInt(match[2]), max: parseInt(match[3]) },
      { min: parseInt(match[4]), max: parseInt(match[5]) }
    ])
  );
  return otherTickets.map(ticket => validateTicket(ticket, validRanges.flat()))
    .filter(a => a !== null)
    .map(a => a as number)
    .reduce((a,b) => a + b);
}
export { run }
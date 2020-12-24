import { intersectionOfMultiple, ofNullable } from "../util";

interface Range {
  name: string,
  min1: number,
  max1: number,
  min2: number,
  max2: number
}

const inRanges = (value: number, ranges: Range[]): boolean => {
  for (const range of ranges) {
    if ((value >= range.min1 && value <= range.max1) || (value >= range.min2 && value <= range.max2)) {
      return true;
    }
  }
  return false;
}


const validRanges = (value: number, ranges: Range[]): Range[] => {
  return ranges.filter(range => (value >= range.min1 && value <= range.max1) || (value >= range.min2 && value <= range.max2));
}
const getSortedRanges = (tickets: number[][], ranges: Range[]): Range[] => {
  const intersectingRanges: Range[][] = [];

  for (let i = 0; i < tickets[0].length; i++) {
    const posValues = tickets.map(ticket => ticket[i]);
    const possibleRanges = intersectionOfMultiple(...posValues.map(val => validRanges(val, ranges)));
    intersectingRanges.push(possibleRanges);
  }
  return filterIntersectingToSortedRanges(intersectingRanges);
}

// Simple validator to check if ticket contains a value that is invalid for all possible ranges
const validateTicket = (ticket: number[], ranges: Range[]): number | null => {
  for (const value of ticket) {
    if (!inRanges(value, ranges)) {
      return value;
    }
  }
  return null;
}

const filterIntersectingToSortedRanges = (possibleRanges: Range[][]): Range[] => {
  const ranges: Range[] = [];
  // Iterate over each range, find one with only one option, remove that option for all other ranges
  while (ranges.filter(range => !!range).length !== possibleRanges.length) {
    for (let i = 0; i < possibleRanges.length; i++) {
      const currentRangeOpts = possibleRanges[i];
      if (currentRangeOpts.length === 1) {
        ranges[i] = currentRangeOpts[0];
        possibleRanges = possibleRanges.map(rangeOpts => rangeOpts.filter(range => range !== ranges[i]));
      }
    }
  }
  return ranges;
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

  const validRanges: Range[] = [];
  [...input.matchAll(/(.*): ([0-9]*)-([0-9]*) or ([0-9]*)-([0-9]*)/g)].forEach((match) =>
    validRanges.push(
      { name: match[1], min1: parseInt(match[2]), max1: parseInt(match[3]), min2: parseInt(match[4]), max2: parseInt(match[5]) }
    ));
  console.log(`Part 1 = ${otherTickets.map(ticket => validateTicket(ticket, validRanges))
    .filter(a => a !== null)
    .map(a => a as number)
    .reduce((a, b) => a + b, 0)}`);

  return getSortedRanges(
      otherTickets.filter(ticket => validateTicket(ticket, validRanges) === null),
      validRanges)
    .map((range, index) => ({ range, index }))
    .filter(a => a.range.name.includes('departure'))
    .map(a => myTicket[a.index])
    .reduce((a, b) => a * b);
}
export { run }
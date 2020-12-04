interface Passport {
  ecl: string | null,
  pid: string | null,
  eyr: string | null,
  hcl: string | null,
  byr: string | null,
  iyr: string | null,
  hgt: string | null,
  cid?: string | null,
}
const extractPassportValue = (passport: string, valueToExtract: string, validatorRegex?: RegExp): string | null => {
  const matches = passport.match(new RegExp(`${valueToExtract}:([\\w|#]*)`));
  if (!matches) {
    return null;
  }
  return !validatorRegex ? matches[1] : (validatorRegex.test(matches[1]) ? matches[1] : null);
}

const processPassport = (unprocessed: string): Passport => {
  return {
    ecl: extractPassportValue(unprocessed, 'ecl', /^(amb|blu|brn|gry|grn|hzl|oth)$/),
    pid: extractPassportValue(unprocessed, 'pid', /^[0-9]{9}$/),
    eyr: extractPassportValue(unprocessed, 'eyr'),
    hcl: extractPassportValue(unprocessed, 'hcl', /^#[0-9a-f]{6}$/),
    byr: extractPassportValue(unprocessed, 'byr'),
    iyr: extractPassportValue(unprocessed, 'iyr'),
    hgt: extractPassportValue(unprocessed, 'hgt'),
    cid: extractPassportValue(unprocessed, 'cid')
  };
}

const heightValidator = (hgt: string): boolean => {
  const matches = hgt.match(/([0-9]*)(cm|in)/);
  if (matches) {
    if (matches[2] === 'cm') {
      return parseInt(matches[1]) >= 150 && parseInt(matches[1]) <= 193;
    }
    if (matches[2] === 'in') {
      return parseInt(matches[1]) >= 59 && parseInt(matches[1]) <= 76
    }
  }
  return false;
}

const isPassportValid = ({ ecl, pid, eyr, hcl, byr, iyr, hgt }: Passport): boolean => {
  if (!ecl || !pid || !eyr || !hcl || !byr || !iyr || !hgt) {
    return false;
  }
  // hcl, pid and ecl validated using regex
  return parseInt(byr) >= 1920 && parseInt(byr) <= 2002 &&
    parseInt(iyr) >= 2010 && parseInt(iyr) <= 2020 &&
    parseInt(eyr) >= 2020 && parseInt(eyr) <= 2030 &&
    heightValidator(hgt);
}

const run = (input: string): number => {
  const unProcessedPassports = input.replace(/\r/g, '').split(/\n\n/);
  const passports = unProcessedPassports.map(processPassport);
  console.log('input passports=', passports.length);
  return passports.filter(isPassportValid).length;
};

export { run };
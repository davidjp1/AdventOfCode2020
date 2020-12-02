interface PasswordPolicy {
  minOccurences: number,
  maxOccurences: number,
  character: string,
  password: string
}

const toPasswordObject = (line: string): PasswordPolicy => {
  const arr = line.split(' ');
  return {
    minOccurences: parseInt(arr[0].split('-')[0]),
    maxOccurences: parseInt(arr[0].split('-')[1]),
    character: arr[1].replace(':', ''),
    password: arr[2]
  }
}

const validatePasswordPart1 = ({minOccurences, maxOccurences, character, password}: PasswordPolicy) => {
  const characterCount = (password.match(new RegExp(character, 'g')) || []).length;
  return characterCount >= minOccurences && characterCount <= maxOccurences;
}

const validatePasswordPart2 = ({minOccurences, maxOccurences, character, password}: PasswordPolicy) => {
  const indexOfFirstChar = minOccurences - 1;
  const indexOfSecondChar = maxOccurences - 1;
  let matches = 0;
  if(password[indexOfFirstChar] === character){
    matches++;
  }
  if(password[indexOfSecondChar] === character){
    matches++;
  }
  console.log(password, password[indexOfFirstChar], password[indexOfSecondChar], matches);
  return matches === 1;
}

const run = (input: string): number => {
  const document = input.split('\n');
  const passwords = document.map(toPasswordObject);
  return passwords.filter(validatePasswordPart2).length;
};

export { run };

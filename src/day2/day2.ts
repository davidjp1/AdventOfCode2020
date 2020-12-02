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

const validatePassword = ({minOccurences, maxOccurences, character, password}: PasswordPolicy) => {
  const characterCount = (password.match(new RegExp(character, 'g')) || []).length;
  return characterCount >= minOccurences && characterCount <= maxOccurences;
}

const run = (input: string): number => {
  const document = input.split('\n');
  const passwords = document.map(toPasswordObject);
  return passwords.filter(validatePassword).length;
};

export { run };

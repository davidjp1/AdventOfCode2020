const run = (input: string) => {
  const inputArr = input.split('\n').map(a => parseInt(a));
  for(const i of inputArr){
    for(const j of inputArr){
      if(i + j === 2020){
        return i * j;
      }
    }
  }
};

exports.run = run;

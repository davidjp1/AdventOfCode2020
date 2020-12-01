const fs = require('fs');
const path = require('path');
const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});

readline.question('Pick a Day!', async (day: string) => {
  const chosenDay = parseInt(day.replace(/[^0-9]/g, ''));
  if (Number.isNaN(chosenDay) || chosenDay > 25 || chosenDay <= 0) {
    console.log('Please enter a number from 1-25\n');
    readline.close();
    return;
  }
  try {
    const pickedDay = require(`./day${chosenDay}`);
    const input = await fs.readFileSync(path.resolve(__dirname, `./day${chosenDay}/input.txt`), "utf8");
    pickedDay.run(input);
  } catch (e) {
    console.log(`I Couldn't find that day! Maybe I've been too lazy to code it yet!\n\n`, e);
  }
  readline.close();
});

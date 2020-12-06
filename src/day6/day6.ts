import { format } from "path";

const run = (input: string): number => {
  const getAnsweredQuestionCount = (form: string[]): number => {
    const numberOfPeople = form.length;
    // A dict mappings of question answered to number of occurrences
    const answersDict: { [question: string]: number } = {};
    form.forEach(personsAnswers => personsAnswers.split('').forEach(answer => {
      if(!answersDict[answer]){
        answersDict[answer] = 1;
      } else {
        answersDict[answer]++;
      }
    }));
    return Object.entries(answersDict).filter(([_, count]) => count === numberOfPeople).length;
  };

  const questionAnswers: string[][] = input.replace(/\r/g, '').split('\n\n').map(form => form.split('\n'));
  return questionAnswers.map(getAnsweredQuestionCount).reduce((a, b) => a + b);
}
export { run }

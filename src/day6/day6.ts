const run = (input: string): number => {
  const getAnsweredQuestionCount = (form: string[]): number => {
    const uniqueAnswers = new Set();
    form.forEach(personAnswers => personAnswers.split('').forEach(answer => uniqueAnswers.add(answer)));
    return uniqueAnswers.size;
  };

  const questionAnswers: string[][] = input.replace(/\r/g, '').split('\n\n').map(form => form.split('\n'));
  return questionAnswers.map(getAnsweredQuestionCount).reduce((a, b) => a + b);
}
export { run }

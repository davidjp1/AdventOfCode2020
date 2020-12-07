interface Rule {
  color: string,
  children: { [color: string]: number }
}
const run = (input: string): number => {
  const parseRule = (rule: string): Rule => {
    const extractChildrenFromMatches = (matches: any): { [color: string]: number } => {
      const children = {};
      matches.forEach((match: any) => {
        //@ts-ignore
        children[match[2]] = parseInt(match[1]);
      });
      return children;
    }
    //@ts-ignore
    const color = rule.match(/([\w ]*) bags contain/)[1];
    const containNoOthers = /.*no other bags.*/;
    if (containNoOthers.test(rule)) {
      //@ts-ignore
      return { color: color, children: {} };
    }
    else {
      const bagRegex = /([0-9]) ([\w ]*) bags?(?:,|.)/g
      //@ts-ignore
      return { color: color, children: extractChildrenFromMatches([...rule.matchAll(bagRegex)]) }
    }
  }

  const getBagContents = (rule: Rule, rules: Rule[]): string[] => {
    const bags: string[] = [];
    Object.entries(rule.children).forEach(([color, count]) => {
      for(let i = 0; i < count; i++){
        bags.push(color);
      }
      const childRule = rules.find(rule => rule.color === color);
      if(childRule){
        bags.push(...getBagContents(childRule, rules));
      }
    });
    return bags;
  }

  const rules: Rule[] = input.replace(/\r/g, '').split('\n').map(parseRule);
  const filledBags: string[][] = rules.map(rule => getBagContents(rule, rules));
  return filledBags.filter(a => a.includes('shiny gold')).length;
}
export { run }

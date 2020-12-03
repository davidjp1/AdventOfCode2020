const run = (input: string): number => {
  // An array of arrays, where each index contains an array of booleans, where true represents a tree in that position of that row
  const trees = input.split('\n').map(treeRow => treeRow.split('').map(char => char === '#'));
  const treeTemplateLength = trees[0].length;

  const downStepSize = 1;
  const rightStepSize = 3;
  let currentX = 0;
  let treesHit = 0;
  for(let currentY = 0; currentY < trees.length; currentY = currentY + downStepSize){
    if(trees[currentY][currentX]){
      treesHit++;
    }
    const newRight = currentX + rightStepSize;
    currentX = (newRight >= treeTemplateLength) ? newRight - treeTemplateLength : newRight;
  }

  return treesHit;
};

export { run };

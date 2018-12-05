const args = () => {
  const options = {
    circles: 3,
    expression: 'data/expression.txt',
    fdr: 0.01,
    interactions: 'data/interactions.txt',
    random: false,
    saint: 'data/saint.txt',
    segments: 10,
  };
  process.argv.forEach((arg) => {
    if (arg.includes('--circles')) {
      options.circles = Number(arg.split('=')[1]);
    } else if (arg.includes('--expression')) {
      options.expression = Number(arg.split('=')[1]);
    } else if (arg.includes('--fdr')) {
      options.fdr = Number(arg.split('=')[1]);
    } else if (arg.includes('--interactions')) {
      options.interactions = arg.split('=')[1];
    } else if (arg.includes('--random')) {
      options.random = true;
    } else if (arg.includes('--saint')) {
      options.saint = arg.split('=')[1];
    } else if (arg.includes('--segments')) {
      options.segments = Number(arg.split('=')[1]);
    }
  });
  return options;
};

module.exports = args;

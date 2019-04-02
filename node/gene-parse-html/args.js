const args = () => {
  const options = {
    genes: 10000,
    matches: ['PDCD10', 'p38β', 'ccm-3'],
    words: 500,
  };
  process.argv.forEach((arg) => {
    if (arg.includes('--genes')) {
      options.genes = Number(arg.split('=')[1]);
    } else if (arg.includes('--matches')) {
      options.match = arg.split('=')[1];
    }else if (arg.includes('--words')) {
      options.words = Number(arg.split('=')[1]);
    }
  });
  return options;
};

module.exports = args;

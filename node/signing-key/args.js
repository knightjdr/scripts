const args = () => {
  const options = {
    length: 50,
  };
  process.argv.forEach((arg) => {
    if (arg.includes('--length')) {
      options.length = Number(arg.split('=')[1]);
    }
  });
  return options;
};

module.exports = args;

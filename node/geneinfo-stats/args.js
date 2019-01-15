const afterCharacter = require('../helpers/after-character');

const args = () => {
  const options = {
    file: 'data/tracking.json',
  };
  process.argv.forEach((arg) => {
    if (arg.startsWith('--file')) {
      options.file = String(afterCharacter(arg, '='));
    }
  });
  return options;
};

module.exports = args;

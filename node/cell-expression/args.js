const afterCharacter = require('../helpers/after-character');

const args = () => {
  const options = {
    cell: 'HEK-293',
    expressionType: 'protein',
    file: 'data/expression.json',
  };
  process.argv.forEach((arg) => {
    if (arg.startsWith('--cell')) {
      options.cell = String(afterCharacter(arg, '='));
    } if (arg.startsWith('--type')) {
      options.expressionType = String(afterCharacter(arg, '='));
    } if (arg.startsWith('--file')) {
      options.file = String(afterCharacter(arg, '='));
    }
  });
  return options;
};

module.exports = args;

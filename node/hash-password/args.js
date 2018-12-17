const afterCharacter = require('./after-character');

const args = () => {
  const options = {
    algo: 'sha512',
    hash: '',
    iterations: 100000,
    keylen: 64,
    password: null,
    passwordLength: 24,
    salt: '',
    saltBytes: 128,
    validate: false,
  };
  process.argv.forEach((arg) => {
    if (arg.startsWith('--algo')) {
      options.algo = String(afterCharacter(arg, '='));
    } else if (arg.startsWith('--hash')) {
      options.hash = String(afterCharacter(arg, '='));
    } else if (arg.startsWith('--iterations')) {
      options.iterations = Number(afterCharacter(arg, '='));
    } else if (arg.startsWith('--keylen')) {
      options.keylen = Number(afterCharacter(arg, '='));
    } else if (arg.startsWith('--passwordLength')) {
      options.passwordLength = Number(afterCharacter(arg, '='));
    } else if (arg.startsWith('--password')) {
      options.password = String(afterCharacter(arg, '='));
    } else if (arg.startsWith('--saltBytes')) {
      options.saltBytes = Number(afterCharacter(arg, '='));
    } else if (arg.startsWith('--salt')) {
      options.salt = String(afterCharacter(arg, '='));
    } else if (arg.startsWith('--validate')) {
      options.validate = true;
    }
  });
  return options;
};

module.exports = args;

const crypto = require('crypto');

const generate = (options) => {
  const {
    algo,
    iterations,
    keylen,
    password,
    passwordLength,
    saltBytes,
  } = options;
  let pw = password;
  if (!pw) {
    pw = crypto.randomBytes(passwordLength).toString('base64');
  }
  const salt = crypto.randomBytes(saltBytes).toString('base64');
  const hash = crypto.pbkdf2Sync(pw, salt, iterations, keylen, algo).toString('hex');

  return {
    hash,
    password: pw,
    salt,
  };
};

module.exports = generate;

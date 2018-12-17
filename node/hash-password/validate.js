/* eslint no-console: 0 */

const crypto = require('crypto');

const validate = (options) => {
  const {
    algo,
    hash,
    iterations,
    keylen,
    password,
    salt,
  } = options;
  return hash === crypto.pbkdf2Sync(password, salt, iterations, keylen, algo).toString('hex');
};

module.exports = validate;

/* eslint no-console: 0 */
// Generates a character signing key (secret).

const secureRandom = require('secure-random');

const args = require('./args');

const options = args();
const signingKey = secureRandom(options.length, {type: 'Buffer'});

console.log(signingKey.toString('hex'));

// Generates a 50 character signing key (secret).

const nJwt = require('njwt');
const secureRandom = require('secure-random');

const signingKey = secureRandom(50, {type: 'Buffer'});

console.log(signingKey.toString('hex'));

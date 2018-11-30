/* eslint no-console: 0 */

const args = require('./args');
const generate = require('./generate');
const writeFile = require('./write-file');

const options = args();
const obj = generate(options);
writeFile(`./output/segcircle-${options.circles}-${options.segments}.json`, JSON.stringify(obj, null, 2))
  .catch((err) => {
    console.log(err);
  });

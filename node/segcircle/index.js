/* eslint no-console: 0 */

const args = require('./args');
const parseData = require('./parse-data');
const random = require('./random');
const writeFile = require('./write-file');

const options = args();
let obj;
if (options.random) {
  obj = random(options);
  writeFile(
    `./output/segcircle-${options.circles}-${options.segments}.json`,
    JSON.stringify(obj, null, 2),
  )
    .catch((err) => {
      console.log(err);
    });
} else {
  parseData(options)
    .then((data) => writeFile('./output/data.json', JSON.stringify(data, null, 2)))
    .catch((err) => {
      console.log(err);
    });
}


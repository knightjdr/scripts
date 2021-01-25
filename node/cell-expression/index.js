/* eslint no-console: 0 */

const args = require('./args');
const parseData = require('./parse-data');
const readJson = require('../helpers/read-json');
const write = require('./write');

const options = args();

const convertJSON = async () => {
  try {
    const data = await readJson(options.file);
    const parsed = parseData(data, options);
    await write(parsed, options);
    console.log('complete');
  } catch (err) {
    console.log(err.toString());
  }
};

convertJSON();

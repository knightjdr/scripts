/* eslint no-console: 0 */

const args = require('./args');
const readJson = require('../helpers/read-json');
const write = require('./write');

const options = args();

const convertJSON = async () => {
  try {
    const data = await readJson(options.file);
    await write(data.d.results);
    console.log('complete');
  } catch (err) {
    console.log(err.toString());
  }
};

convertJSON();

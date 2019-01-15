/* eslint no-console: 0 */

const byDate = require('./by-date');
const args = require('./args');
const filterUnknown = require('./filter-unknown');
const readJson = require('../helpers/read-json');
const summarizeFields = require('./summarize-fields');
const summarizeSpecies = require('./summarize-species');
const write = require('./write');

const options = args();

readJson(options.file)
  .then((queries) => {
    const filtered = filterUnknown(queries);
    const fields = summarizeFields(filtered.queries);
    const species = summarizeSpecies(filtered.queries);
    const time = byDate(filtered.queries);
    return write(filtered, fields, species, time);
  })
  .then(() => {
    console.log('complete');
  })
  .catch((err) => {
    console.log(err.toString());
  });

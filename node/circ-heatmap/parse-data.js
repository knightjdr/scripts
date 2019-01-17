const checkInteractions = require('./check-interactions');
const formatData = require('./format-data');
const getExpression = require('./get-expression');
const readSaint = require('./read-saint');

const parseData = options => (
  new Promise((resolve, reject) => {
    readSaint(options)
      .then(baits => checkInteractions(options, baits))
      .then(baits => getExpression(options, baits))
      .then(baits => formatData(baits))
      .then((data) => {
        resolve(data);
      })
      .catch((err) => {
        reject(err);
      });
  })
);

module.exports = parseData;

const fs = require('fs');
const readline = require('readline');

const addExpression = (baits, expression) => (
  Object.entries(baits).reduce((accum, [bait, arr]) => ({
    ...accum,
    [bait]: arr.map((details) => {
      const gene = details.prey.toLowerCase();
      return ({
        ...details,
        expression: expression[gene] ? expression[gene] : 0,
      });
    }),
  }), {})
);

const readExpression = file => (
  new Promise((resolve, reject) => {
    const list = {};

    let isHeader = true;
    const lineReader = readline.createInterface({
      input: fs.createReadStream(file),
    });
    lineReader.on('line', (line) => {
      if (!isHeader) {
        const [, gene, cell, expression] = line.split('\t');
        const key = gene.toLowerCase();
        if (cell === 'HEK 293') {
          list[key] = expression;
        }
      }
      isHeader = false;
    });
    lineReader.on('close', () => {
      resolve(list);
    });
    lineReader.on('error', (err) => {
      reject(err);
    });
  })
);

const getExpression = (options, baits) => (
  new Promise((resolve, reject) => {
    readExpression(options.expression)
      .then((expression) => {
        const baitsWithExpression = addExpression(baits, expression);
        resolve(baitsWithExpression);
      })
      .catch((err) => {
        reject(err);
      });
  })
);

module.exports = getExpression;

const fs = require('fs');

const write = (data, options) => (
  new Promise((resolve) => {
    const { cell, expressionType } = options;
    const stream = fs.createWriteStream(`output/expression-${cell}-${expressionType}.txt`, 'utf8');
    stream.write(`gene\tgeneid\t${cell}\n`);
    Object.entries(data).forEach(([key, values]) => {
      stream.write(`${key}\t`);
      stream.write(`${values.geneid}\t`);
      stream.write(`${values[cell]}\n`);
    });
    stream.end();
    resolve();
  })
);

module.exports = write;

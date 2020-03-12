const fs = require('fs');

const write = (data) => (
  new Promise((resolve) => {
    const stream = fs.createWriteStream('output/expression.txt', 'utf8');
    stream.write('gene\tHEK293\tHeLa\n');
    Object.entries(data).forEach(([key, values]) => {
      stream.write(`${key}\t`);
      stream.write(`${values.hek293}\t`);
      stream.write(`${values.hela}\n`);
    });
    stream.end();
    resolve();
  })
);

module.exports = write;

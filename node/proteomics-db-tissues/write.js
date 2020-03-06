const fs = require('fs');

const write = (data) => (
  new Promise((resolve) => {
    const stream = fs.createWriteStream('output/expression.txt', 'utf8');
    stream.write('accession\tID\tdescription\tsample\texpression\tnorm. expression\n');
    data.forEach((datum) => {
      stream.write(`${datum.ENTRY_NAME}\t`);
      stream.write(`${datum.UNIQUE_IDENTIFIER}\t`);
      stream.write(`${datum.PROTEIN_DESCRIPTION}\t`);
      stream.write(`${datum.SAMPLE_NAME}\t`);
      stream.write(`${datum.UNNORMALIZED_EXPRESSION}\t`);
      stream.write(`${datum.NORMALIZED_EXPRESSION}\n`);
    });
    stream.end();
    resolve();
  })
);

module.exports = write;

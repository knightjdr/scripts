const fs = require('fs');
const readline = require('readline');

const readSaint = options => (
  new Promise((resolve, reject) => {
    const { fdr, saint } = options;
    const baits = {};

    let isHeader = true;
    const lineReader = readline.createInterface({
      input: fs.createReadStream(saint),
    });
    lineReader.on('line', (line) => {
      if (!isHeader) {
        const fields = line.split('\t');
        const bait = fields[0];
        const fc = fields[14];
        const prey = fields[2];
        const score = fields[15];
        const spec = fields[5];
        if (score <= fdr) {
          if (baits[bait]) {
            baits[bait].push({
              fc,
              prey,
              spec,
            });
          } else {
            baits[bait] = [{
              fc,
              prey,
              spec,
            }];
          }
        }
      }
      isHeader = false;
    });
    lineReader.on('close', () => {
      resolve(baits);
    });
    lineReader.on('error', (err) => {
      reject(err);
    });
  })
);

module.exports = readSaint;

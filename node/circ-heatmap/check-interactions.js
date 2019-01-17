const fs = require('fs');
const readline = require('readline');

const addInteractions = (baits, interactions) => (
  Object.entries(baits).reduce((accum, [bait, arr]) => ({
    ...accum,
    [bait]: arr.map((details) => {
      const gene = details.gene.toLowerCase();
      return {
        ...details,
        known: Boolean(
          interactions[gene]
          && interactions[gene].includes(details.prey.toLowerCase()),
        ),
      };
    }),
  }), {})
);

const readInteractions = file => (
  new Promise((resolve, reject) => {
    const list = {};

    const lineReader = readline.createInterface({
      input: fs.createReadStream(file),
    });
    lineReader.on('line', (line) => {
      const [ source, target ] = line.split('\t');
      const key1 = source.toLowerCase();
      const key2 = target.toLowerCase();
      if (list[key1]) {
        list[key1].push(key2);
      } else {
        list[key1] = [key2];
      }
      if (list[key2]) {
        list[key2].push(key1);
      } else {
        list[key2] = [key1];
      }
    });
    lineReader.on('close', () => {
      resolve(list);
    });
    lineReader.on('error', (err) => {
      reject(err);
    });
  })
);

const checkInteractions = (options, baits) => (
  new Promise((resolve, reject) => {
    readInteractions(options.interactions)
      .then((interactions) => {
        const baitsWithInteractions = addInteractions(baits, interactions);
        resolve(baitsWithInteractions);
      })
      .catch((err) => {
        reject(err);
      });
  })
);

module.exports = checkInteractions;

const fs = require('fs');

const readJson = file => (
  new Promise((resolve, reject) => {
    fs.readFile(file, 'utf8', (err, data) => {
      if (err) {
        reject(err);
      }
      else {
        resolve(JSON.parse(data));
      }
    });
  })
);

module.exports = readJson;

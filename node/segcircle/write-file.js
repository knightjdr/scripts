const fs = require('fs');

const writeFile = (name, string, encoding = 'UTF8') => (
  new Promise((resolve, reject) => {
    fs.writeFile(name, string, encoding, (err) => {
      if (!err) {
        resolve();
      } else {
        reject(err);
      }
    });
  })
);

module.exports = writeFile;

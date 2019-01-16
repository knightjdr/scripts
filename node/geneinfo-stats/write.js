const fs = require('fs');

const arrtoFile = require('./arr-to-file');
const yearMonthDay = require('../helpers/year-month-day');

const write = (filtered, fields, species, time) => (
  new Promise((resolve) => {
    const date = yearMonthDay();
    const stream = fs.createWriteStream(`output/${date}-stats.txt`, 'utf8');
    stream.write(`start\t${time.summary.start}\n`);
    stream.write(`end\t${time.summary.end}\n`);
    stream.write(`duration\t${time.summary.duration} days\n`);
    stream.write('\r\n');
    stream.write('queries\tcount\tpercentage\n');
    stream.write(`known\t${filtered.known.count}\t${filtered.known.percentage}\n`);
    stream.write(`unknown\t${filtered.unknown.count}\t${filtered.unknown.percentage}\n`);
    stream.write(`total\t${filtered.known.count + filtered.unknown.count}\n`);
    stream.write('\r\n');
    arrtoFile(stream, species);
    stream.write('\r\n');
    arrtoFile(stream, fields);
    stream.write('\r\nBy day\n');
    arrtoFile(stream, time.day);
    stream.write('\r\nBy hour\n');
    arrtoFile(stream, time.hour);
    stream.end();
    resolve();
  })
);

module.exports = write;

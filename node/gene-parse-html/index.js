/* eslint no-console: 0 */

const args = require('./args');
const createGenes = require('./create-genes');
const createText = require('./create-text');
const parseText = require('./parse-text');

const options = args();

const genes = createGenes(options.genes, options.matches);
const text = createText(options.words, options.matches);

console.time('parse');
parseText(genes, text);
console.timeEnd('parse');

const used = process.memoryUsage().heapUsed / 1024 / 1024;
console.log(`The script uses approximately ${Math.round(used * 100) / 100} MB RAM`);

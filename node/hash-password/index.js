/* eslint no-console: 0 */

const args = require('./args');
const generate = require('./generate');
const validate = require('./validate');

const options = args();

if (options.validate) {
  const validated = validate(options);
  console.log(`validated: ${validated}`);
} else {
  const newPassword = generate(options);
  console.log({
    ...options,
    ...newPassword,
  });
}

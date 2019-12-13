const readline = require('readline');

/**
 * @param {string} text
 */
module.exports = function(text) {
  readline.clearLine(process.stdout, 0);
  readline.cursorTo(process.stdout, 0, null);
  process.stdout.write(text);
};

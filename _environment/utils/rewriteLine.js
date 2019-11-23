const readline = require('readline');

module.exports = function(text) {
  readline.clearLine(process.stdout, 0);
  readline.cursorTo(process.stdout, 0, null);
  process.stdout.write(text);
};

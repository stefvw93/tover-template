const readline = require('readline');

module.exports = function(text) {
  readline.clearLine();
  readline.cursorTo(0);
  process.stdout.write(text);
};

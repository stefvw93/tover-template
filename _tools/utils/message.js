const kleur = require('kleur');

/**
 * @param {string} message
 */
module.exports.progressMessage = function(message) {
  return `🧙  ${kleur.italic(`${message}...`)}`;
};

/**
 * @param {string} message
 */
module.exports.successMessage = function(message) {
  return kleur.green(`✨  ${message}\n`);
};

/**
 * @param {string} message
 */
module.exports.errorMessage = function(message) {
  return kleur.bold().red(`Oh no! ${message}\n\n`);
};

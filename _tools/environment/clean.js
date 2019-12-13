const rimraf = require('rimraf');
const { paths } = require('../tover-config');
const {
  ActivityIndicator,
  errorMessage,
  progressMessage,
  rewriteLine,
  successMessage,
} = require('../utils');

const activityIndicator = new ActivityIndicator();
activityIndicator.message = progressMessage('Cleaning project');

function rimrafAsync(path) {
  return new Promise(function(resolve, reject) {
    rimraf(path, function(error) {
      if (error) reject(error);
      resolve();
    });
  });
}

async function clean() {
  try {
    await Promise.all([
      rimrafAsync(paths.compiled),
      rimrafAsync(paths.distribution),
      rimrafAsync('node_modules'),
    ]);
    activityIndicator.stop();
    rewriteLine(successMessage('Project cleaned'));
    return;
  } catch (error) {
    activityIndicator.stop();
    rewriteLine(errorMessage(error));
  }
}

clean()
  .then(_ => process.exit(0))
  .catch(_ => process.exit(0));

const { SpawnOptions } = require('child_process');
const {
  ActivityIndicator,
  errorMessage,
  progressMessage,
  rewriteLine,
  spawn,
  successMessage,
} = require('../utils');

const childProcessOptions = {
  stdio: 'inherit',
  shell: /^win/.test(process.platform),
};
const eslint = 'eslint';
const eslintParams = ['--fix', 'src/**/*.{js,ts,tsx}'];
const activityIndicator = new ActivityIndicator();

const lint = async () => {
  try {
    // run eslint
    activityIndicator.message = progressMessage('Running linter');
    await spawn(eslint, eslintParams, childProcessOptions);
    activityIndicator.stop();
    rewriteLine(successMessage('Linter passed. Your code is beautiful!'));
  } catch (e) {
    activityIndicator.stop();
    rewriteLine(
      errorMessage('Something went wrong. Please check process output.')
    );
  }
};

lint()
  .then(() => process.exit(0))
  .catch(() => process.exit(0));

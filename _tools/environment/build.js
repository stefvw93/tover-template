const path = require('path');
const { paths } = require('../tover-config');
const {
  ActivityIndicator,
  errorMessage,
  progressMessage,
  rewriteLine,
  spawn,
  successMessage,
  writeLine,
} = require('../utils');

// eslint settings
const eslint = 'eslint';
const eslintParams = ['--fix', 'src/**/*.{js,ts,tsx}'];

// typescript settings
const typescript = 'tsc';
const typescriptParams = ['--incremental'];

// webpack settings
const webpack = 'webpack';
const webpackParams = [
  '--config',
  path.join(paths.webpack, 'webpack.production'),
  '--display-error-details',
];

// general
const childProcessOptions = {
  stdio: 'inherit',
  shell: /^win/.test(process.platform),
};

const activityIndicator = new ActivityIndicator();

async function build() {
  try {
    // run eslint
    activityIndicator.message = progressMessage('Running linter');
    activityIndicator.start();

    await spawn(eslint, eslintParams, childProcessOptions);
    rewriteLine(successMessage('Linter passed. Your code is beautiful!'));

    // compile typescript
    activityIndicator.message = progressMessage('Compiling typescript');
    await spawn(typescript, typescriptParams, childProcessOptions);
    rewriteLine(successMessage('Typescript compiled!'));

    // bundle assets
    activityIndicator.message = progressMessage('Bundling assets');
    await spawn(webpack, webpackParams, childProcessOptions);
    rewriteLine(successMessage('Done!'));
    activityIndicator.stop();
  } catch (e) {
    rewriteLine('');
    activityIndicator.stop();
    writeLine(
      errorMessage('Something went wrong. Please check process output.')
    );
  }
}

build()
  .then(_ => process.exit(0))
  .catch(_ => process.exit(0));

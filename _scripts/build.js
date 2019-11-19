const { paths } = require('../project-config');
const { execSync } = require('child_process');
const colors = require('colors');
const rimraf = require('rimraf');

// build command joined by 'then'
const compileTypeScript = 'tsc';
const webpack = `webpack --config ${paths.webpack}/webpack.production --display-error-details`;
const buildCommand = [compileTypeScript, webpack].join(' && ');
const childProcessOptions = {
  stdio: 'inherit',
  shell: /^win/.test(process.platform),
};

console.log(`${colors.green.bold('Compiling production...')}`);

// execute build
rimraf.sync(paths.compiled);
execSync(buildCommand, childProcessOptions);
rimraf.sync(paths.compiled);

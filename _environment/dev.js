const { spawn, spawnSync } = require('child_process');
const { paths } = require('../project-config');
const colors = require('colors/safe');
const childProcessOptions = {
  stdio: 'inherit',
  shell: /^win/.test(process.platform),
};

console.log(`${colors.green.bold('Starting development mode...')}`);

spawnSync('tsc');
spawn('tsc', ['-w', '--incremental'], childProcessOptions);
spawn(
  'webpack-dev-server',
  ['--config', `${paths.webpack}/webpack.development`],
  childProcessOptions
);

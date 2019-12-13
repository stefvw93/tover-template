const { spawn, spawnSync } = require('child_process');
const { paths } = require('../tover-config');
const { progressMessage, writeLine } = require('../utils');

const childProcessOptions = {
  stdio: 'inherit',
  shell: /^win/.test(process.platform),
};

writeLine(progressMessage(`Starting development mode`));

spawnSync('tsc', ['--incremental']);
spawn('tsc', ['-w', '--incremental'], childProcessOptions);
spawn(
  'webpack-dev-server',
  ['--config', `${paths.webpack}/webpack.development`],
  childProcessOptions
);

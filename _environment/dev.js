const { spawn, spawnSync } = require('child_process');
const { paths } = require('../project-config');
const kleur = require('kleur');
const childProcessOptions = {
  stdio: 'inherit',
  shell: /^win/.test(process.platform),
};

console.log(`${kleur.green().bold('Starting development mode...')}`);

spawnSync('tsc', ['--incremental']);
spawn('tsc', ['-w', '--incremental'], childProcessOptions);
spawn(
  'webpack-dev-server',
  ['--config', `${paths.webpack}/webpack.development`],
  childProcessOptions
);

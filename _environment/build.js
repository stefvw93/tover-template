const { paths } = require('../project-config');
const { writeLine, rewriteLine, ActivityIndicator, spawn } = require('./utils');
const eslint = 'eslint';
const params = ['--fix', 'src/**/*.{js,ts,tsx}'];
const kleur = require('kleur');
const childProcessOptions = {
  stdio: 'inherit',
  shell: /^win/.test(process.platform),
};

const activityIndicator = new ActivityIndicator({
  frames: '⠁⠂⠄⡀⢀⠠⠐⠈'.split(''),
  prefixLoader: true,
  fps: 15,
});

const build = async () => {
  try {
    // run eslint
    activityIndicator.message = kleur.italic('Running linter...');
    await spawn(eslint, params, childProcessOptions);
    activityIndicator.stop();
    rewriteLine(kleur.green('✓ Linter passed. Your code is beautiful!\n\n'));

    // compile typescript
    activityIndicator.message = kleur.italic('Compiling typescript...');
    activityIndicator.start();
    await spawn('tsc', ['--incremental'], childProcessOptions);
    activityIndicator.stop();
    rewriteLine(kleur.green('✓ Typescript compiled!\n\n'));

    // bundle assets
    activityIndicator.message = kleur.italic('Bundling assets...');
    activityIndicator.start();
    await spawn(
      'webpack',
      [
        '--config',
        `${paths.webpack}/webpack.production`,
        '--display-error-details',
      ],
      childProcessOptions
    );
    activityIndicator.stop();
    rewriteLine(kleur.green('✓ Done!\n\n'));
  } catch (e) {
    rewriteLine('');
    activityIndicator.stop();
    writeLine(
      kleur.red().bold('Something went wrong. Please check process output.\n\n')
    );
  }
};

build()
  .then(_ => process.exit(0))
  .catch(_ => process.exit(0));

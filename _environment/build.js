const { paths } = require('../project-config');
const { writeLine, rewriteLine, ActivityIndicator, spawn } = require('./utils');
const eslint = 'eslint';
const params = ['--fix', 'src/**/*.{js,ts,tsx}'];
const colors = require('colors');
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
    activityIndicator.message = colors.italic('Running linter...');
    await spawn(eslint, params, childProcessOptions);
    activityIndicator.stop();
    rewriteLine(colors.green('✓ Linter passed. Your code is beautiful!\n\n'));

    // compile typescript
    activityIndicator.message = colors.italic('Compiling typescript...');
    activityIndicator.start();
    await spawn('tsc', ['--incremental'], childProcessOptions);
    activityIndicator.stop();
    rewriteLine(colors.green('✓ Typescript compiled!\n\n'));

    // bundle assets
    activityIndicator.message = colors.italic('Bundling assets...');
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
    rewriteLine(colors.green('✓ Done!\n\n'));
  } catch (e) {
    rewriteLine('');
    activityIndicator.stop();
    writeLine(
      colors.red.bold('Something went wrong. Please check process output.\n\n')
    );
  }
};

build()
  .then(_ => process.exit(0))
  .catch(_ => process.exit(0));

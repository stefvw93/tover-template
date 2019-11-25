const { rewriteLine, ActivityIndicator, spawn } = require('./utils');
const colors = require('colors');
const childProcessOptions = {
  stdio: 'inherit',
  shell: /^win/.test(process.platform),
};
const eslint = 'eslint';
const params = ['--fix', 'src/**/*.{js,ts,tsx}'];
const activityIndicator = new ActivityIndicator({
  frames: '⠁⠂⠄⡀⢀⠠⠐⠈'.split(''),
  prefixLoader: true,
  fps: 15,
});

const lint = async () => {
  try {
    // run eslint
    activityIndicator.message = colors.italic('Running linter...');
    await spawn(eslint, params, childProcessOptions);
    activityIndicator.stop();
    // rewriteLine(colors.green('✓ Linter passed. Your code is beautiful!\n\n'));
  } catch (e) {
    activityIndicator.stop();
    rewriteLine(
      colors.red.bold('Something went wrong. Please check process output.\n\n')
    );
  }
};

lint()
  .then(() => process.exit(0))
  .catch(() => process.exit(0));

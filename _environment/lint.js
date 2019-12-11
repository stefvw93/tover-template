const { rewriteLine, ActivityIndicator, spawn } = require('./utils');
const kleur = require('kleur');
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
    activityIndicator.message = kleur.italic('Running linter...');
    await spawn(eslint, params, childProcessOptions);
    activityIndicator.stop();
    // rewriteLine(kleur.green('✓ Linter passed. Your code is beautiful!\n\n'));
  } catch (e) {
    activityIndicator.stop();
    rewriteLine(
      kleur.red().bold('Something went wrong. Please check process output.\n\n')
    );
  }
};

lint()
  .then(() => process.exit(0))
  .catch(() => process.exit(0));

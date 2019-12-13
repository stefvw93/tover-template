const { spawn } = require('child_process');

/**
 *
 * @param {string} command
 * @param {Array.<string>} args
 * @param {Object} options
 */
module.exports = function(command, args, options) {
  const child = spawn(command, args, options);
  const stdout = child.stdout;
  const stderr = child.stderr;

  if (child.stdout) {
    child.stdout.on('data', data => {
      if (stdout['write']) stdout['write'](data);
    });
  }

  if (child.stderr) {
    child.stderr.on('data', data => {
      if (stderr['append']) stderr['append'](data);
    });
  }

  const promise = new Promise((resolve, reject) => {
    child.on('error', reject);

    child.on('exit', code => {
      if (code === 0) {
        resolve(stdout);
      } else {
        const err = new Error(`child exited with code ${code}`);
        err['code'] = code;
        err['stderr'] = stderr;
        reject(err);
      }
    });
  });

  promise['child'] = child;

  return promise;
};

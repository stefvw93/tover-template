const path = require('path');
const packageName = require(path.resolve(process.cwd(), 'package.json')).name;

const dirnames = {
  assets: 'assets',
  compiled: '.cache',
  distribution: '.dist',
  webpack: 'webpack',
  source: 'src',
  environment: '_tools',
};

/**
 * Used in - for example - HTML document title
 */
module.exports.displayName = packageName;
module.exports.paths = {
  dirnames,
  assets: path.resolve(process.cwd(), dirnames.assets),
  compiled: path.resolve(process.cwd(), dirnames.compiled),
  distribution: path.resolve(process.cwd(), dirnames.distribution),
  htmlTemplate: path.resolve(process.cwd(), dirnames.source, 'index.html'),
  webpack: path.resolve(__dirname, 'environment', dirnames.webpack),
};

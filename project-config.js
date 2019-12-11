const path = require('path');
const package = require(path.resolve(__dirname, 'package.json'));
const dirnames = {
  compiled: '.cache',
  distribution: '.dist',
  webpack: '_webpack',
  source: 'src',
};

module.exports = {
  app: {
    title: package.name,
  },

  devServer: {
    ip: 'localhost',
    open: true,
    port: 20393,
  },

  entry: './index.js',

  paths: {
    dirnames,
    root: __dirname,
    compiled: path.join(__dirname, dirnames.compiled),
    distribution: path.join(__dirname, dirnames.distribution),
    source: path.join(__dirname, dirnames.source),
    htmlTemplate: path.join(__dirname, dirnames.source, 'index.html'),
    webpack: path.join(__dirname, dirnames.webpack),
  },
};

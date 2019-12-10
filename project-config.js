const path = require('path');
const package = require('./package.json');
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
    root: process.cwd(),
    compiled: path.join(process.cwd(), dirnames.compiled),
    distribution: path.join(process.cwd(), dirnames.distribution),
    source: path.join(process.cwd(), dirnames.source),
    htmlTemplate: path.join(process.cwd(), dirnames.source, 'index.html'),
    webpack: path.join(process.cwd(), dirnames.webpack),
  },
};

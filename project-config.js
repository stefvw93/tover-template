const path = require('path');
const package = require('./package.json');
const dirnames = {
  compiled: '.cache',
  distribution: '_dist',
  webpack: '_webpack',
  source: 'src',
};

module.exports = {
  app: {
    title: package.name,
  },

  devServer: {
    ip: 'localhost',
    open: 'Google Chrome',
    port: 20393,
  },

  entry: './index.js',

  paths: {
    dirnames,
    root: __dirname,
    compiled: path.join(__dirname, dirnames.compiled),
    distribution: path.join(__dirname, dirnames.distribution),
    source: path.join(__dirname, dirnames.source),
    HTMLTemplate: path.join(__dirname, dirnames.source, 'index.template.pug'),
    webpack: path.join(__dirname, dirnames.webpack),
  },
};

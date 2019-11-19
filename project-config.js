const path = require('path');
const package = require('./package.json');

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
    root: __dirname,
    compiled: path.join(__dirname, '.cache'),
    distribution: path.join(__dirname, '_dist'),
    source: path.join(__dirname, 'src'),
    HTMLTemplate: path.join(__dirname, 'src', 'index.template.pug'),
    webpack: path.join(__dirname, '_webpack'),
  },
};

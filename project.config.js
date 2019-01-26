const path = require("path");
const localIp = require("local-ip")();

module.exports = {
  app: {
    title: "React TS Boilerplate"
  },

  filenames: {
    entry: "./index.js"
  },

  paths: {
    compiled: path.join(__dirname, "__compiled"),
    distribution: path.join(__dirname, "_dist"),
    webpack: path.join(__dirname, "_webpack"),
    templates: {
      development: path.join("src", "template.development.pug"),
      production: path.join("src", "template.production.pug")
    }
  },

  devServer: {
    hot: true,
    ip: localIp,
    open: true,
    port: 12020
  }
};

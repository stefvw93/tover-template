const path = require("path");
const localIp = require("local-ip")();

module.exports = {
  app: {
    title: "React boilerplate"
  },

  filenames: {
    entry: "./index.js"
  },

  paths: {
    compiled: path.join(__dirname, "__compiled/src"),
    pre_distribution: path.join(__dirname, "__compiled/pre-dist"),
    distribution: path.join(__dirname, "_dist"),
    webpack: path.join(__dirname, "_webpack"),
    HTMLTemplate: path.join(__dirname, "src", "index.template.pug")
  },

  devServer: {
    hot: true,
    ip: "localhost",
    open: true,
    port: 12020
  }
};

const path = require("path");

module.exports = {
  app: {
    title: "React boilerplate"
  },

  entry: "./index.js",

  paths: {
    compiled: path.join(__dirname, "__compiled"),
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

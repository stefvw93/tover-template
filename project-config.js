const path = require("path");

module.exports = {
  app: {
    title: "React boilerplate"
  },

  devServer: {
    hot: true,
    ip: "localhost",
    open: true,
    port: 12020
  },

  entry: "./index.js",

  paths: {
    compiled: path.join(__dirname, "__compiled"),
    distribution: path.join(__dirname, "_dist"),
    HTMLTemplate: path.join(__dirname, "src", "index.template.pug"),
    webpack: path.join(__dirname, "_webpack")
  }
};

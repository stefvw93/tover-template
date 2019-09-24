const path = require("path");
const package = require("./package.json");

module.exports = {
  app: {
    title: package.name
  },

  devServer: {
    hot: true,
    ip: "localhost",
    open: true,
    port: 12020
  },

  entry: "./index.js",

  paths: {
    compiled: path.join(__dirname, ".cache"),
    distribution: path.join(__dirname, "_dist"),
    HTMLTemplate: path.join(__dirname, "src", "index.template.pug"),
    webpack: path.join(__dirname, "_webpack")
  }
};

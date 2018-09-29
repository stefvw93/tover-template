const path = require("path");
const localIp = require("local-ip")();

module.exports = {
  app: {
    title: "React TS Boilerplate"
  },

  keys: {
    DEVELOPMENT: "development",
    PRODUCTION: "production"
  },

  filenames: {
    entry: "./index.js"
  },

  paths: {
    compiled: path.join(__dirname, "__compiled"),
    distribution: path.join(__dirname, "_dist"),
    webpack: path.join(__dirname, "_webpack")
  },

  devServer: {
    hot: true,
    ip: localIp,
    open: true,
    port: 12020
  }
};

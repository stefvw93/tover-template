const path = require("path");
const localIp = require("local-ip")();

module.exports = {
  app: {
    title: "React TS Boilerplate"
  },

  keys: {
    PRODUCTION: "production",
    DEVELOPMENT: "development"
  },

  filenames: {
    entry: "./index.js"
  },

  paths: {
    devServerContentBase: path.join(__dirname, "dev-server-public"),
    context: path.join(__dirname, "_compiled"),
    distribution: path.join(__dirname, "_dist"),
    compiled: path.join(__dirname, "_compiled")
  },

  devServer: {
    hot: true,
    ip: localIp,
    port: 12020,
    open: true
  }
};

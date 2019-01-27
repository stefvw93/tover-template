const path = require("path");
const localIp = require("local-ip")();

module.exports = {
  app: {
    title: "Propal'r"
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
    },
    aliases: {
      // "@common/*": ["common/*"],
      // "@components/*": ["components/*"],
      // "@enums/*": ["enums/*"],
      // "@services/*": ["services/*"],
      // "@store/*": ["store/*"],
      // "@typings/*": ["typings/*"],
      // "@views/*": ["views/*"],
      "@common": path.resolve(__dirname, "__compiled", "common"),
      "@components": path.resolve(__dirname, "__compiled", "components"),
      "@enums": path.resolve(__dirname, "__compiled", "enums"),
      "@services": path.resolve(__dirname, "__compiled", "services"),
      "@store": path.resolve(__dirname, "__compiled", "store"),
      "@typings": path.resolve(__dirname, "__compiled", "typings"),
      "@views": path.resolve(__dirname, "__compiled", "views")
    }
  },

  devServer: {
    hot: true,
    ip: localIp,
    open: true,
    port: 12020
  }
};

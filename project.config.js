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
    compiled: path.join(__dirname, "__compiled"),
    distribution: path.join(__dirname, "_dist"),
    webpack: path.join(__dirname, "_webpack"),
    templates: {
      development: path.join("src", "index.template.pug"),
      production: path.join("src", "index.template.pug")
    },
    aliases: {
      // "@authentication/*": ["authentication/*"],
      // "@common/*": ["common/*"],
      // "@sub-modules/*": ["sub-modules/*"],
      "@authentication": path.resolve(
        __dirname,
        "__compiled",
        "authentication"
      ),
      "@common": path.resolve(__dirname, "__compiled", "common"),
      "@sub-modules": path.resolve(__dirname, "__compiled", "sub-modules")
    }
  },

  devServer: {
    hot: true,
    ip: "localhost", //localIp,
    open: true,
    port: 12020
  }
};

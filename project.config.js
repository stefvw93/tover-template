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
        "src",
        "authentication"
      ),
      "@common": path.resolve(__dirname, "__compiled", "src", "common"),
      "@sub-modules": path.resolve(
        __dirname,
        "__compiled",
        "src",
        "sub-modules"
      )
    }
  },

  devServer: {
    hot: true,
    ip: localIp,
    open: true,
    port: 12020
  }
};

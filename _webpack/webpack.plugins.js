const projectConfig = require("../project.config");
const webpack = require("webpack");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;

const { app, keys, paths } = projectConfig;

module.exports = function(environment) {
  const productionPlugins = [
    // new CleanWebpackPlugin([paths.distribution, paths.compiled]),
    new BundleAnalyzerPlugin()
  ];
  const developmentPlugins = [
    // new CleanWebpackPlugin([paths.compiled]),
    new webpack.HotModuleReplacementPlugin(),
    new HTMLWebpackPlugin({
      title: app.title + ":dev",
      template: "!!pug-loader!dev.index.pug",
      inject: false
    })
  ];

  if (environment === keys.PRODUCTION) {
    return productionPlugins;
  }

  if (environment === keys.DEVELOPMENT) {
    return developmentPlugins;
  }
};

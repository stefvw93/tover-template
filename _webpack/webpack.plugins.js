const projectConfig = require("../project.config");
const webpack = require("webpack");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;

const { app, keys } = projectConfig;

module.exports = function(environment) {
  const productionPlugins = [
    new HTMLWebpackPlugin({
      title: app.title,
      template: `!!pug-loader!index.${environment}.pug`
    }),
    new BundleAnalyzerPlugin()
  ];

  const developmentPlugins = [
    new webpack.HotModuleReplacementPlugin(),
    new HTMLWebpackPlugin({
      title: app.title,
      template: `!!pug-loader!index.${environment}.pug`
    })
  ];

  if (environment === keys.PRODUCTION) {
    return productionPlugins;
  }

  if (environment === keys.DEVELOPMENT) {
    return developmentPlugins;
  }
};

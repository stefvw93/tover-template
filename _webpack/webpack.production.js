const { app, paths, filenames } = require("../project.config");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const DotENVWebpackPlugin = require("dotenv-webpack");
const EmitChangedOnlyPlugin = require("emit-changed-only-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;

module.exports = {
  mode: "production",
  context: paths.compiled,
  entry: filenames.entry,
  plugins: [
    new HTMLWebpackPlugin({
      title: app.title,
      template: `!!pug-loader!${paths.templates.production}`,
      inject: false
    }),
    new DotENVWebpackPlugin(),
    process.env.ANALYZE_BUILD ? new BundleAnalyzerPlugin() : function() {},
    new EmitChangedOnlyPlugin()
  ],
  resolve: {
    alias: paths.aliases,
    modules: [paths.compiled, "node_modules"]
  },
  output: {
    path: paths.distribution,
    filename: "[name].[contenthash:4].js"
  },
  devtool: "source-map"
};

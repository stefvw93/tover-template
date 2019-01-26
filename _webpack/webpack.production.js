const { paths, filenames } = require("../project.config");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;

module.exports = {
  mode: "production",
  output: { path: paths.distribution },
  context: paths.compiled,
  entry: filenames.entry,
  plugins: [
    new HTMLWebpackPlugin({
      title: app.title,
      template: `!!pug-loader!${paths.templates.production}`
    }),
    new BundleAnalyzerPlugin()
  ]
};

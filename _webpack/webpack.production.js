const { app, paths, filenames } = require("../project.config");
const HTMLWebpackPlugin = require("html-webpack-plugin");
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
    process.env.ANALYZE_BUILD ? new BundleAnalyzerPlugin() : function() {}
  ],
  resolve: {
    alias: paths.aliases,
    modules: [paths.compiled, "node_modules"]
  },
  output: { path: paths.distribution, filename: "[name].[chunkhash].js" },
  optimization: {
    splitChunks: {
      chunks: "all"
    }
  }
};

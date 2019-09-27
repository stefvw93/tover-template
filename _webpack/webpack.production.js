const { entry, paths, app } = require("../project-config");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const DotENVWebpackPlugin = require("dotenv-webpack");
const EmitChangedOnlyPlugin = require("emit-changed-only-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const CompressionPlugin = require("compression-webpack-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;

module.exports = {
  mode: "production",
  context: paths.compiled,
  devtool: "source-map",
  entry: entry,
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [["@babel/preset-env", {}]]
          }
        }
      }
    ]
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        sourceMap: true,
        terserOptions: {
          keep_classnames: false,
          keep_fnames: false,
          mangle: true,
          compress: {
            drop_console: true
          }
        }
      })
    ]
  },
  output: {
    path: paths.distribution,
    filename: "[name].[contenthash].js"
  },
  plugins: [
    process.env.ANALYZE_BUILD ? new BundleAnalyzerPlugin() : function() {},
    new CompressionPlugin(),
    new DotENVWebpackPlugin(),
    new EmitChangedOnlyPlugin({
      exclude: /\.html/i
    }),
    new HTMLWebpackPlugin({
      title: app.title,
      template: `!!pug-loader!${paths.HTMLTemplate}`,
      inject: false
    })
  ],
  resolve: {
    alias: paths.aliases,
    modules: [paths.compiled, "node_modules"]
  }
};

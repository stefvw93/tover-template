<<<<<<< HEAD
const { entry, paths, app } = require("../project-config");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const DotENVWebpackPlugin = require("dotenv-webpack");
const EmitChangedOnlyPlugin = require("emit-changed-only-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const CompressionPlugin = require("compression-webpack-plugin");
=======
const { app, entry, paths } = require("../project-config");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const DotENVWebpackPlugin = require("dotenv-webpack");
const EmitChangedOnlyPlugin = require("emit-changed-only-webpack-plugin");
>>>>>>> b4d5752e1eebd72a74a873a96f19c18bbc92a892
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;

module.exports = {
  mode: "production",
  context: paths.compiled,
<<<<<<< HEAD
  devtool: "source-map",
  entry: entry,
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
=======
  entry: entry,
>>>>>>> b4d5752e1eebd72a74a873a96f19c18bbc92a892
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
<<<<<<< HEAD
    })
=======
    }),
    new DotENVWebpackPlugin(),
    process.env.ANALYZE_BUILD ? new BundleAnalyzerPlugin() : function() {},
    new EmitChangedOnlyPlugin()
>>>>>>> b4d5752e1eebd72a74a873a96f19c18bbc92a892
  ],
  resolve: {
    alias: paths.aliases,
    modules: [paths.compiled, "node_modules"]
<<<<<<< HEAD
  }
=======
  },
  output: {
    path: paths.distribution,
    filename: "[name].[contenthash].js"
  },
  devtool: "source-map"
>>>>>>> b4d5752e1eebd72a74a873a96f19c18bbc92a892
};

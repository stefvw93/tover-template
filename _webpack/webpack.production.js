const path = require('path');
const { entry, paths, app } = require('../project-config');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const DotEnvPlugin = require('dotenv-webpack');
const EmitChangedOnlyPlugin = require('emit-changed-only-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');

module.exports = {
  mode: 'production',
  context: paths.compiled,
  devtool: 'source-map',
  entry: entry,
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [['@babel/preset-env', {}]],
          },
        },
      },
    ],
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
            drop_console: true,
          },
        },
      }),
    ],
  },
  output: {
    path: paths.distribution,
    filename: '[name].[contenthash].js',
  },
  plugins: [
    new CopyPlugin([
      {
        from: paths.assets,
        to: path.resolve(paths.distribution, 'assets'),
      },
    ]),
    new CompressionPlugin({
      exclude: /\.jpg|\.jpeg|\.png|\.svg/i,
    }),
    new DotEnvPlugin(),
    new EmitChangedOnlyPlugin({
      exclude: /\.html|assets/i,
    }),
    new HtmlWebpackPlugin({
      title: app.title,
      template: paths.htmlTemplate,
    }),
  ],
  resolve: {
    modules: [paths.compiled, 'node_modules'],
  },
};

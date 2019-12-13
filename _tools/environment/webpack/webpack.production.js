const CompressionPlugin = require('compression-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const DotEnvPlugin = require('dotenv-webpack');
const EmitChangedOnlyPlugin = require('emit-changed-only-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const { displayName, paths } = require('../../tover-config');

module.exports = {
  mode: 'production',
  context: paths.compiled,
  devtool: 'source-map',
  entry: 'index.js',
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
        to: path.resolve(paths.distribution, paths.dirnames.assets),
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
      template: paths.htmlTemplate,
    }),
  ],
  resolve: {
    modules: [paths.compiled, 'node_modules'],
  },
};

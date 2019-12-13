const CopyPlugin = require('copy-webpack-plugin');
const DotEnvPlugin = require('dotenv-webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const webpack = require('webpack');
const { displayName, paths } = require('../../tover-config');

module.exports = {
  mode: 'development',
  devtool: 'eval-source-map',
  devServer: {
    port: 3000,
    host: 'localhost',
    open: true,
    historyApiFallback: true,
  },
  context: paths.compiled,
  entry: 'index.js',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
  plugins: [
    new CopyPlugin([
      {
        from: paths.assets,
        to: path.resolve(paths.compiled, paths.dirnames.assets),
      },
    ]),
    new DotEnvPlugin(),
    new HtmlWebpackPlugin({
      template: paths.htmlTemplate,
    }),
    new webpack.DefinePlugin({
      'process.env.API_URL': JSON.stringify(process.env.API_URL),
    }),
  ],
  resolve: {
    modules: [paths.compiled, 'node_modules'],
  },
};

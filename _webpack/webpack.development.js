const { paths, entry, devServer, app } = require('../project-config');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const DotENVWebpackPlugin = require('dotenv-webpack');

module.exports = {
  mode: 'development',
  devServer: {
    port: devServer.port,
    host: devServer.ip,
    open: devServer.open,
    historyApiFallback: true,
  },
  context: paths.compiled,
  entry: entry,
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
    new HtmlWebpackPlugin({
      title: app.title,
      template: paths.htmlTemplate,
    }),
    new DotENVWebpackPlugin(),
    new webpack.DefinePlugin({
      'process.env.API_URL': JSON.stringify(process.env.API_URL),
    }),
  ],
  resolve: {
    modules: [paths.compiled, 'node_modules'],
  },
};

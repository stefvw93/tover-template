const { paths, filenames, devServer, app } = require("../project.config");
const webpack = require("webpack");
const HTMLWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  devServer: {
    hot: devServer.hot,
    port: devServer.port,
    host: devServer.ip,
    open: devServer.open
  },
  context: paths.compiled,
  entry: filenames.entry,
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HTMLWebpackPlugin({
      title: app.title,
      template: `!!pug-loader!${paths.templates.development}`
    })
  ]
};

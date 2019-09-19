<<<<<<< HEAD
const { paths, filenames, devServer, app } = require("../project-config");
=======
const { app, devServer, entry, paths } = require("../project-config");
>>>>>>> b4d5752e1eebd72a74a873a96f19c18bbc92a892
const webpack = require("webpack");
const HTMLWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  devServer: {
    hot: devServer.hot,
    port: devServer.port,
    host: devServer.ip,
    open: devServer.open,
    historyApiFallback: true
  },
  context: paths.compiled,
  entry: entry,
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HTMLWebpackPlugin({
      title: app.title,
      template: `!!pug-loader!${paths.HTMLTemplate}`,
      inject: false
    }),
    new webpack.DefinePlugin({
      "process.env.API_URL": JSON.stringify(process.env.API_URL)
    })
  ],
  resolve: {
    alias: paths.aliases,
    modules: [paths.compiled, "node_modules"]
  }
};

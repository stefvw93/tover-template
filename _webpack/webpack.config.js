const projectConfig = require("../project.config");
const plugins = require("./webpack.plugins");

const { keys, paths, filenames, devServer } = projectConfig;

module.exports = function(env, argv) {
  const environment = process.env.NODE_ENV;

  const commonConfig = {
    context: paths.context,
    entry: filenames.entry,
    plugins: plugins(environment)
  };

  const productionConfig = {
    ...commonConfig,
    mode: "production",
    output: { path: paths.distribution }
  };

  const developmentConfig = {
    ...commonConfig,
    mode: "development",

    output: {
      path: paths.devServerContentBase
    },
    devServer: {
      contentBase: paths.devServerContentBase,
      hot: devServer.hot,
      port: devServer.port,
      host: devServer.ip,
      open: devServer.open
    }
  };

  if (environment === keys.PRODUCTION) {
    console.log(JSON.stringify(productionConfig));
    return productionConfig;
  }

  if (environment === keys.DEVELOPMENT) {
    return developmentConfig;
  }
};

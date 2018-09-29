const { execSync, exec } = require("child_process");
const projectConfig = require("../project.config");
const { keys, paths } = projectConfig;

const webpackCommand = [
  "NODE_ENV=" + keys.DEVELOPMENT,
  "webpack-dev-server",
  `--config ${paths.webpack}/webpack.config`,
  "--display-error-details"
].join(" ");

// clear compiled folder
execSync(`rm -rf ${paths.compiled}`);

// compile & watch ts
execSync("tsc -w", { stdio: "inherit" });

// webpack dev server
execSync(webpackCommand);

const { execSync } = require("child_process");
const projectConfig = require("../project.config");
const { keys, paths } = projectConfig;

const webpackCommand = [
  "NODE_ENV=" + keys.PRODUCTION,
  "webpack",
  "--display-error-details",
  `--config ${paths.webpack}/webpack.config`
].join(" ");

// clear compiled folder
execSync(`rm -rf ${paths.compiled}`);

// clear dist folder
execSync(`rm -rf ${paths.distribution}`);

// compile ts
execSync("tsc");

// transpile js
execSync(webpackCommand, { stdio: "inherit" });

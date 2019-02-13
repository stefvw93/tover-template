const { execSync } = require("child_process");
const colors = require("colors/safe");
const projectConfig = require("../project.config");
const { keys, paths } = projectConfig;

const webpackCommand = [
  // clean output dir
  // `rm -rf ${paths.compiled};`,
  // start webpack dev server with config and show error details
  "webpack-dev-server",
  `--config ${paths.webpack}/webpack.development`,
  "--display-error-details"
].join(" ");

// show api url
console.log(
  `${colors.green.bold("Starting development mode...")}\n${colors.green.bold(
    "API URL:"
  )} ${process.env.API_URL}`
);

// remind to start tsc -w
console.log(
  `${colors.green.bold("Remember")} to run \`${colors.bold("tsc -w")}\`.`
);

// webpack dev server
execSync(webpackCommand, { stdio: "inherit" });

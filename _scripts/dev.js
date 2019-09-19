const { execSync } = require("child_process");
const { paths } = require("../project-config");
const colors = require("colors/safe");
<<<<<<< HEAD
const projectConfig = require("../project-config");
const { keys, paths } = projectConfig;
=======
>>>>>>> b4d5752e1eebd72a74a873a96f19c18bbc92a892

const webpackCommand = [
  // clean output dir
  // `rm -rf ${paths.compiled};`,
  // start webpack dev server with config and show error details
  "webpack-dev-server",
  `--config ${paths.webpack}/webpack.development`,
  "--display-error-details"
].join(" ");

// show api url
console.log(`${colors.green.bold("Starting development mode...")}`);

// remind to start tsc -w
console.log(
  `${colors.green.bold("Remember")} to run \`${colors.bold("tsc -w")}\`.`
);

// webpack dev server
execSync(webpackCommand, { stdio: "inherit" });

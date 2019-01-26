const { execSync } = require("child_process");
const projectConfig = require("../project.config");
const { paths } = projectConfig;

const buildCommand = [
  `rm -rf ${paths.compiled} ${paths.distribution} &&`,
  "tsc &&",
  "webpack",
  `--config ${paths.webpack}/webpack.production`,
  "--display-error-details"
].join(" ");

// transpile js
execSync(buildCommand, { stdio: "inherit" });

const { execSync } = require("child_process");
const projectConfig = require("../project.config");
const { keys } = projectConfig;

const executables = [
  "NODE_ENV=" + keys.PRODUCTION,
  "webpack --display-error-details --config _webpack/webpack.config"
].join(" ");

execSync("tsc");
execSync(executables, { stdio: "inherit" });

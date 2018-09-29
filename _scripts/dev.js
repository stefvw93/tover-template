const { execSync, exec } = require("child_process");
const projectConfig = require("../project.config");
const { keys } = projectConfig;

const executables = [
  "NODE_ENV=" + keys.DEVELOPMENT,
  "webpack-dev-server --config _webpack/webpack.config --display-error-details"
].join(" ");

console.log(executables);

exec("tsc -w");
execSync(executables, { stdio: "inherit" });

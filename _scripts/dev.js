const { spawn } = require("child_process");
const { paths, devServer } = require("../project-config");
const killPort = require("kill-port");
const colors = require("colors/safe");

// show api url
console.log(`${colors.green.bold("Starting development mode...")}`);

// remind to start tsc -w
console.log(
  `${colors.green.bold("Remember")} to run \`${colors.bold("tsc -w")}\`.`
);

killPort(devServer.port);

const tscTask = spawn("tsc", ["-w"], { stdio: "inherit" });
const webpackTask = spawn(
  "webpack-dev-server",
  ["--config", `${paths.webpack}/webpack.development`],
  { stdio: "inherit" }
);

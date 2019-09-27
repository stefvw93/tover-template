const { spawn } = require("child_process");
const { paths, devServer } = require("../project-config");
const colors = require("colors/safe");

// show api url
console.log(`${colors.green.bold("Starting development mode...")}`);

const childProcessOptions = {
  stdio: "inherit",
  shell: /^win/.test(process.platform)
};

const tscTask = spawn("tsc", ["-w"], childProcessOptions);
const webpackTask = spawn(
  "webpack-dev-server",
  ["--config", `${paths.webpack}/webpack.development`],
  childProcessOptions
);

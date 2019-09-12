const projectConfig = require("../project.config");
const { execSync } = require("child_process");
const { paths } = projectConfig;
const colors = require("colors");
const fs = require("fs");
const path = require("path");

// build command joined by 'then'
const buildCommand = [
  // clear compiled and pre-dist folders
  `rm -rf ${paths.pre_distribution} ${paths.compiled}`,
  "tsc",
  `webpack --config ${paths.webpack}/webpack.production --display-error-details`
].join(" && ");

/**
 * Execute build
 */
console.log(`${colors.green.bold("Compiling production...")}`);
if (process.env.API_URL) {
  console.log(`${colors.green.bold("API URL: ")} ${process.env.API_URL}`);
}

execSync(buildCommand, { stdio: "inherit" });

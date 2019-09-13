const { paths } = require("../project-config");
const { execSync } = require("child_process");
const colors = require("colors");

// build command joined by 'then'
const buildCommand = [
  `rm -rf ${paths.compiled}`,
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

const { paths } = require("../project-config");
const { execSync } = require("child_process");
<<<<<<< HEAD
const projectConfig = require("../project-config");
const { paths } = projectConfig;
=======
>>>>>>> b4d5752e1eebd72a74a873a96f19c18bbc92a892
const colors = require("colors");

// build command joined by 'then'
const clearCompiled = `rm -rf ${paths.compiled}`;
const compileTypeScript = "tsc";
const webpack = `webpack --config ${paths.webpack}/webpack.production --display-error-details`;
const buildCommand = [
  clearCompiled,
  compileTypeScript,
  webpack,
  clearCompiled
].join(" && ");

/**
 * Execute build
 */
console.log(`${colors.green.bold("Compiling production...")}`);
<<<<<<< HEAD
=======
if (process.env.API_URL) {
  console.log(`${colors.green.bold("API URL: ")} ${process.env.API_URL}`);
}
>>>>>>> b4d5752e1eebd72a74a873a96f19c18bbc92a892

execSync(buildCommand, { stdio: "inherit" });

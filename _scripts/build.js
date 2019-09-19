const { paths } = require("../project-config");
const { execSync } = require("child_process");
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

execSync(buildCommand, { stdio: "inherit" });

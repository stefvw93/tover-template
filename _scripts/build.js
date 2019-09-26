const { paths } = require("../project-config");
const { execSync } = require("child_process");
const colors = require("colors");
const rimraf = require("rimraf");

// build command joined by 'then'
const compileTypeScript = "tsc";
const webpack = `webpack --config ${paths.webpack}/webpack.production --display-error-details`;
const buildCommand = [compileTypeScript, webpack].join(" && ");

const childOptions = {
  stdio: "inherit",
  shell: /^win/.test(process.platform)
};

/**
 * Execute build
 */
console.log(`${colors.green.bold("Compiling production...")}`);

rimraf.sync(paths.compiled);
execSync(buildCommand, childOptions);

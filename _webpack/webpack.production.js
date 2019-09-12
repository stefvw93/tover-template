const { app, paths, filenames } = require("../project.config");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const DotENVWebpackPlugin = require("dotenv-webpack");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;

class EmitChangedOnlyPlugin {
  constructor(settings = {}) {
    this.settings = {
      splitChunks: true,
      alwaysOverwrite: ["index.html"]
    };

    Object.assign(this.settings, settings);
  }

  apply(compiler) {
    const fs = require("fs");
    const path = require("path");
    const colors = require("colors");
    const { optimization, output } = compiler.options;
    const outDir = output.path;
    const distributedFiles = fs.existsSync(outDir)
      ? fs.readdirSync(outDir)
      : [];

    if (output.filename.indexOf("[contenthash") < -1) {
      colors.yellow(
        "EmitChangedOnlyPlugin: Using [contenthash] substitute in filename is recommended!"
      );
    }

    // split build into chunks
    // https://webpack.js.org/configuration/optimization/#optimizationsplitchunks
    if (this.settings.splitChunks === true) {
      optimization.runtimeChunk = "single";
      optimization.splitChunks.chunks = "all";
    }

    let handledAssets;

    // https://webpack.js.org/api/compiler-hooks/#emit
    compiler.hooks.emit.tap("EmitChangedOnlyPlugin", compilation => {
      const { alwaysOverwrite } = this.settings;
      const assets = Object.keys(compilation.assets);

      //  keep a back-up of compiled assets for 'done' hook
      handledAssets = assets;

      // remove assets if they whould always be overwritten, or if the file already exists
      distributedFiles
        .filter(
          file => alwaysOverwrite.indexOf(file) < 0 && assets.indexOf(file) > -1
        )
        .forEach(file => delete compilation.assets[file]);
    });

    // https://webpack.js.org/api/compiler-hooks/#done
    compiler.hooks.done.tap("EmitChangedOnlyPlugin", () => {
      // clean unused files from previous build
      distributedFiles
        .filter(file => {
          return handledAssets.indexOf(file) < 0;
        })
        .forEach(file => {
          fs.unlinkSync(path.join(outDir, file));
        });
    });
  }
}

module.exports = {
  mode: "production",
  context: paths.compiled,
  entry: filenames.entry,
  plugins: [
    new HTMLWebpackPlugin({
      title: app.title,
      template: `!!pug-loader!${paths.templates.production}`,
      inject: false
    }),
    new DotENVWebpackPlugin(),
    process.env.ANALYZE_BUILD ? new BundleAnalyzerPlugin() : function() {},
    new EmitChangedOnlyPlugin()
  ],
  resolve: {
    alias: paths.aliases,
    modules: [paths.compiled, "node_modules"]
  },
  output: {
    path: paths.distribution,
    filename: "[name].[contenthash:4].js"
  },
  optimization: {
    // runtimeChunk: "single",
    // splitChunks: {
    //   chunks: "all"
    // }
  }
};

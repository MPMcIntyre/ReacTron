const HtmlWebpackPlugin = require("html-webpack-plugin");
const ElectronReloaderPlugin = require("electron-reloader-webpack-plugin");
const { declareCurrentPack } = require("./custom-plugins/declareCurrentPack");
const { exec } = require("child_process");
const path = require("path");
const BundleAnalyzerPlugin =
  require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

// Bundle analyzer path for html files on packaging
const bundleAnalyzerPath = path.join(
  __dirname,
  "..",
  "..",
  "scripts",
  "Webpack-Bundle-Analyzer (Packaged)"
);

module.exports.ReacTronPluginSpecifier = class {
  constructor(dev_env, settings) {
    // Different development environments require different variables
    if (dev_env === undefined) {
    }
    if (dev_env) {
      this.analyzer = settings.showBundleAnalyzer ? "server" : "disabled";
    } else {
      this.analyzer = settings.emitBundleAnalyzerOnPackage
        ? "static"
        : "disabled"; //Webpack-bundle-analyzer
    }

    // Plugin array for the main process
    this.mainProcessPlugins = [
      new declareCurrentPack("Electron main", {
        showStats: settings.webpackStats ? false : true,
      }),
      new BundleAnalyzerPlugin({
        analyzerMode: this.analyzer,
        reportFilename: path.join(
          __dirname,
          "..",
          "..",
          "scripts",
          "Webpack-Bundle-Analyzer (Packaged)",
          "main.bundle.html"
        ),
        analyzerPort: settings.bundleAnalyzerPortB,
      }),
    ];

    // Plugin array for the renderer process
    this.rendererProcessPlugins = [
      new declareCurrentPack("Electron renderer", {
        showStats: settings.webpackStats ? false : true,
      }),
      new BundleAnalyzerPlugin({
        analyzerMode: this.analyzer,
        reportFilename: path.join(bundleAnalyzerPath, "renderer.bundle.html"),
        analyzerPort: settings.bundleAnalyzerPortA,
      }),
      new HtmlWebpackPlugin({ template: "./src/index.html" }),
    ];

    // If the webpack is in production mode or developer settings.ElectronReload is false
    // remove the reloader plugin as to not restart it on every save
    if ((!dev_env && settings.ElectronReload) ) {
      this.mainProcessPlugins.append( new ElectronReloaderPlugin("yarn", [" electron ."]));
      if (dev_env === true) {
        exec("yarn electron .", (err, stdout, stderr) => {
          if (err) console.log(err);
          return;
        });
      }
    }
  }
};

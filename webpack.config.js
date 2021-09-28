console.log("Initializing");
const ThreadsPlugin = require("threads-plugin");
const { settings } = require("./developerSettings");
const path = require("path");
const {
  deferElectronStart,
  declareCurrentPack,
} = require("./scripts/webpack.plugins");
const BundleAnalyzerPlugin =
  require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

// * Different development environments require different variables
if (process.env.DEV) {
  var analyzer = settings.showBundleAnalyzer ? "server" : "disabled"; //Webpack-bundle-analyzer
  var devmode = "development"; //Webpack devmode option
  var devTool = "source-map"; //Webpack devtool
} else {
  var analyzer = "disabled";
  var devmode = "production";
  var devTool = false;
}
var stats = process.env.verbose ? "normal" : "none";

// * General rule-set and loaders can remain similar for both renderer and main
const globalRuleSet = [
  // * Javascript
  {
    test: /\.(js|jsx)$/,
    exclude: /node_modules/,
    use: ["babel-loader", "source-map-loader"],
  },
  // * Typescript
  {
    test: /\.(ts|tsx)$/,
    exclude: /node_modules/,
    use: ["ts-loader", "source-map-loader"],
  },
  // * Styling (css, scss, sass)
  {
    test: /\.(css|scss|sass)$/,
    exclude: /node_modules/,
    use: ["style-loader", "css-loader", "sass-loader", "source-map-loader"],
  },
  // * Files
  {
    test: /\.(jpg|jpeg|png|gif|mp3|svg|ttf|woff|otf)$/,
    exclude: /node_modules/,
    use: ["file-loader", "source-map-loader"],
  },
];

module.exports = [
  // ! Electron renderer
  {
    target: "electron-renderer",
    mode: devmode,
    stats: stats, //Custom stats are generated with declareCurrentPack plugin
    //Entries go here (code-splitting requires seperate entries)
    entry: {
      renderer: "./src/renderer/renderer.main.tsx",
    },
    //Outputs are automatic
    output: {
      filename: "[name].js",
      path: path.resolve(__dirname, "dist"),
    },
    devtool: devTool,
    module: {
      rules: globalRuleSet,
    },
    plugins: [
      new declareCurrentPack("Electron renderer", { showStats: false }),
      new BundleAnalyzerPlugin({
        analyzerMode: analyzer,
        reportFilename: "renderer.bundle.html",
        analyzerPort: settings.bundleAnalyzerPortA,
      }),
    ],
    resolve: {
      extensions: [".js", ".jsx", ".json", ".ts", ".tsx"],
      modules: ["node_modules", "src"],
    },
  },

  // ! Electron Main + preloads
  {
    target: "electron-main",
    mode: devmode,
    stats: stats, //Custom stats are generated with declareCurrentPack plugin
    //Entries go here (code-splitting requires seperate entries)
    entry: {
      main: "./src/main/process.main.ts",
      preloadMain: "./src/main/preloads/main.preload.ts",
    },
    //Outputs are automatic
    output: {
      filename: "[name].js",
      path: path.resolve(__dirname, "dist"),
    },
    devtool: devTool,
    module: {
      rules: globalRuleSet,
    },
    plugins: [
      new declareCurrentPack("Electron main", { showStats: true }),
      new deferElectronStart(),
      new BundleAnalyzerPlugin({
        analyzerMode: analyzer,
        reportFilename: "main.bundle.html",
        analyzerPort: settings.bundleAnalyzerPortB,
      }),
      new ThreadsPlugin(),
    ],
    resolve: {
      extensions: [".js", ".jsx", ".json", ".ts", ".tsx"],
      modules: ["node_modules", "src"],
    },
  },
];

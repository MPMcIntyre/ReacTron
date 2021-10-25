console.log("Initializing");
const ThreadsPlugin = require("threads-plugin");
const { settings } = require("./developerSettings");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ElectronReloaderPlugin = require("electron-reloader-webpack-plugin");
const path = require("path");
const { exec } = require("child_process");
const {
  declareCurrentPack,
  FontLoader,
  AssetLoader,
} = require("./scripts/webpack.plugins");
const BundleAnalyzerPlugin =
  require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

// Bundle analyzer path for html files on packaging
const bundleAnalyzerPath = path.join(
  __dirname,
  "scripts",
  "Webpack-Bundle-Analyzer (Packaged)"
);

var devTool = "source-map"; //Webpack devtool
var stats = settings.webpackStats === true ? "normal" : "none";

// Different development environments require different variables
if (process.env.DEV) {
  var analyzer = settings.showBundleAnalyzer ? "server" : "disabled";
  var devmode = "development"; //Webpack devmode option
} else {
  var analyzer = settings.emitBundleAnalyzerOnPackage ? "static" : "disabled"; //Webpack-bundle-analyzer
  var devmode = "production";
}

// Plugin array for the main process
const mainProcessPlugins = [
  new declareCurrentPack("Electron main", {
    showStats: settings.webpackStats ? false : true,
  }),
  new BundleAnalyzerPlugin({
    analyzerMode: analyzer,
    reportFilename: path.join(
      __dirname,
      "scripts",
      "Webpack-Bundle-Analyzer (Packaged)",
      "main.bundle.html"
    ),
    analyzerPort: settings.bundleAnalyzerPortB,
  }),
  new ThreadsPlugin(),
  new ElectronReloaderPlugin("node", ["./scripts/ElectronStart.js"]),
];

// Plugin array for the renderer process
const rendererProcessPlugins = [
  new declareCurrentPack("Electron renderer", {
    showStats: settings.webpackStats ? false : true,
  }),
  new BundleAnalyzerPlugin({
    analyzerMode: analyzer,
    reportFilename: path.join(bundleAnalyzerPath, "renderer.bundle.html"),
    analyzerPort: settings.bundleAnalyzerPortA,
  }),
  new HtmlWebpackPlugin({ template: "./src/index.html" }),
];

// If the webpack is in production mode or developer settings.ElectronReload is false
// remove the reloader plugin as to not restart it on every save
if ((process.env.DEV && !settings.ElectronReload) || !process.env.DEV) {
  mainProcessPlugins.pop();
  process.env.DEV &&
    exec("electron .", (err, stdout, stderr) => {
      if (err) console.log(err);
    });
}

// Copy font files over
FontLoader();

// Copy asset files over
AssetLoader();

// General rule-set and loaders can remain similar for both renderer and main
const globalRuleSet = [
  // Javascript
  {
    test: /\.(js|jsx)$/,
    exclude: /node_modules/,
    use: ["ts-loader", "source-map-loader"],
  },
  // Typescript
  {
    test: /\.(ts|tsx)$/,
    exclude: /node_modules/,
    use: ["ts-loader", "source-map-loader"],
  },
  // Styling (css, scss, sass)
  {
    test: /\.(css|scss|sass)$/,
    exclude: /node_modules/,
    use: [
      "style-loader",
      "css-loader",
      {
        loader: "sass-loader",
        options: {
          // Prefer `dart-sass`
          implementation: require("dart-sass"),
        },
      },
      "source-map-loader",
    ],
  },
  // Files
  {
    test: /\.(jpg|jpeg|png|gif|mp3|svg)$/,
    exclude: /node_modules/,
    use: ["file-loader", "source-map-loader"],
  },
  // Node
  {
    test: /.node$/,
    loader: "node-loader",
  },
];

// Main webpack export
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
    plugins: rendererProcessPlugins,
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
    plugins: mainProcessPlugins,
    resolve: {
      extensions: [".js", ".jsx", ".json", ".ts", ".tsx"],
      modules: ["node_modules", "src"],
    },
  },
];

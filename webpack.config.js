const { settings } = require("./developerSettings");

const path = require("path");
const { FontLoader, AssetLoader } = require("./scripts/webpack/webpack.utils");
const {
  ReacTronPluginSpecifier,
} = require("./scripts/webpack/webpack.plugins");

var stats = settings.webpackStats === true ? "normal" : "none";
if (process.env.DEV === undefined) {
  process.env.DEV = true;
}
let devmode = process.env.DEV ? "development" : "production";
const webpackPlugins = new ReacTronPluginSpecifier(process.env.DEV, settings);

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
    devtool: "source-map",
    module: {
      rules: globalRuleSet,
    },
    plugins: webpackPlugins.rendererProcessPlugins,
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
    devtool: "source-map",
    module: {
      rules: globalRuleSet,
    },
    plugins: webpackPlugins.mainProcessPlugins,
    resolve: {
      extensions: [".js", ".jsx", ".json", ".ts", ".tsx"],
      modules: ["node_modules", "src"],
    },
  },
];

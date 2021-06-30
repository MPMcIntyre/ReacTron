console.log("Initializing");
const path = require("path");
const {
  deferElectronStart,
  declareCurrentPack,
} = require("./scripts/webpack.plugins");

const BundleAnalyzerPlugin =
  require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

let devmode;
if (process.env.DEV) {
  devmode = "development";
} else {
  devmode = "production";
}

const globalRuleSet = [
  {
    test: /\.(js|jsx)$/,
    exclude: /node_modules/,
    use: "babel-loader",
  },
  {
    test: /\.(ts|tsx)$/,
    exclude: /node_modules/,
    use: "ts-loader",
  },
  {
    test: /\.(css|scss|sass)$/,
    exclude: /node_modules/,
    use: ["style-loader", "css-loader", "sass-loader"],
  },
  {
    test: /\.(jpg|jpeg|png|gif|mp3|svg)$/,
    exclude: /node_modules/,
    use: ["file-loader"],
  },
];

module.exports = [
  // * Electron renderer
  {
    target: "electron-renderer",
    mode: devmode,
    stats: "none",
    entry: {
      renderer: "./src/renderer/renderer.main.tsx",
    },
    devtool: "source-map",
    module: {
      rules: globalRuleSet,
    },
    plugins: [
      new declareCurrentPack("Electron renderer", { showStats: false }),
      new BundleAnalyzerPlugin({ analyzerMode: "static" }),
    ],
    resolve: {
      extensions: [".js", ".jsx", ".json", ".ts", ".tsx"],
      modules: ["node_modules", "src"],
    },

    output: {
      filename: "[name].js",
      path: path.resolve(__dirname, "dist"),
    },
  },
  // * Electron Main + preloads
  {
    target: "electron-main",
    mode: devmode,
    stats: "none",
    entry: {
      main: "./src/main/process.main.ts",
      preloadMain: "./src/main/preloads/main.preload.ts",
    },
    devtool: "source-map",
    module: {
      rules: globalRuleSet,
    },
    plugins: [
      new declareCurrentPack("Electron main", { showStats: true }),
      new deferElectronStart(),
      new BundleAnalyzerPlugin({ analyzerMode: "static" }),
    ],
    resolve: {
      extensions: [".js", ".jsx", ".json", ".ts", ".tsx"],
      modules: ["node_modules", "src"],
    },

    output: {
      filename: "[name].js",
      path: path.resolve(__dirname, "dist"),
    },
  },
];

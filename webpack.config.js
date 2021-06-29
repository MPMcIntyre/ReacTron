const path = require("path");
const { deferElectronStart } = require("./scripts/webpack.plugins");

let devmode;
if (process.env.DEV) {
  devmode = "development";
} else {
  devmode = "production";
}

module.exports = {
  mode: devmode,
  entry: {
    main: "./src/main/process.main.ts",
    renderer: "./src/renderer/renderer.main.tsx",
    preloadMain: "./src/main/preloads/main.preload.ts",
  },
  devtool: "source-map",
  stats: "minimal",
  module: {
    rules: [
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
    ],
  },
  plugins: [new deferElectronStart()],
  resolve: {
    extensions: [".js", ".jsx", ".json", ".ts", ".tsx"],
    modules: ["node_modules", "src"],
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist"),
  },
  // externals: ["electron"],
  externals: ({ context, request }, callback) => {
    var IGNORES = ["electron", "fs"];
    if (IGNORES.indexOf(request) >= 0) {
      return callback(null, "require('" + request + "')");
    }
    return callback();
  },

  // externals: (function () {
  //   var IGNORES = ["electron"];
  //   return function (context, request, callback) {
  //     if (IGNORES.indexOf(request) >= 0) {
  //       return callback(null, "require('" + request + "')");
  //     }
  //     return callback();
  //   };
  // })(),
};

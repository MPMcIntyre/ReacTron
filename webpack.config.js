const path = require("path");
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
        test: /\.(css|scss)$/,
        exclude: /node_modules/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(jpg|jpeg|png|gif|mp3|svg)$/,
        exclude: /node_modules/,
        use: ["file-loader"],
      },
    ],
  },
  resolve: {
    extensions: [".js", ".jsx", ".json", ".ts", ".tsx"],
    modules: ["node_modules", "src"],
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist"),
    // chunkFilename: "[id].[chunkhash]",
  },
  externals: (function () {
    var IGNORES = ["electron", "electron-reload"];
    return function (context, request, callback) {
      if (IGNORES.indexOf(request) >= 0) {
        return callback(null, "require('" + request + "')");
      }
      return callback();
    };
  })(),
};

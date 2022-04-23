const fs = require("fs");
const path = require("path");
const ncp = require("ncp").ncp;

module.exports.FontLoader = async function () {
  ncp.limit = 16;
  const dirPath = path.join(
    __dirname,
    "../",
    "../",
    "src",
    "renderer",
    "fonts"
  );
  const distPath = path.join(__dirname, "../", "../", "dist", "fonts");

  fs.rmSync(distPath, { recursive: true });
  fs.mkdirSync(distPath);

  if (fs.existsSync(dirPath)) {
    files = fs.readdirSync(dirPath);
    await ncp(dirPath, distPath, function (err) {
      if (err) {
        return console.error(err);
      }
      console.log("Fonts loaded");
    });
  }
};

module.exports.AssetLoader = async function () {
  ncp.limit = 16;
  const dirPath = path.join(__dirname, "../", "../", "src", "assets");
  const distPath = path.join(__dirname, "../", "../", "dist", "assets");

  fs.rmSync(distPath, { recursive: true });
  fs.mkdirSync(distPath);

  if (fs.existsSync(dirPath)) {
    files = fs.readdirSync(dirPath);
    await ncp(dirPath, distPath, function (err) {
      if (err) {
        return console.error(err);
      }
      console.log("Assets loaded");
    });
  }
};

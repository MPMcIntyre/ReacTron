const concurrently = require("concurrently");
const fs = require("fs");
const path = require("path");

// * To keep the source-code or structure of the source code secret, we delete maps and any bundle analyzers
const distPath = path.join(__dirname, "../", "dist");
const distFiles = fs.readdirSync(distPath);

distFiles.forEach((file) => {
  let prefs = file.split(".");
  //   * Remove maps when packaging
  if (prefs[prefs.length - 1] === "map") {
    fs.unlink(path.join(distPath, file), () => {
      indicate(file);
    });
    //   * Remove webpack-bundle analyzer report
  } else if (prefs[prefs.length - 1] === "html") {
    if (
      prefs[0] === "renderer" ||
      prefs[0] === "main" ||
      prefs[0] === "report"
    ) {
      fs.unlink(path.join(distPath, file), () => {
        indicate(file);
      });
    }
  }
});

// * Indicate what files have been deleted
function indicate(fileName) {
  console.log(`Removed ${fileName} for packaging`);
}

// * Run webpack in development mode and thereafter electron builder.
// * This avoids source-maps and bundle-analyzers
concurrently(
  [
    {
      command: "webpack --mode production && electron-builder",
      name: "Packager",
      prefixColor: "blue",
    },
  ],
  {
    prefix: "name",
    killOthers: ["failure", "success"],
    restartTries: 3,
  }
).then(
  function onSuccess(exitInfo) {
    // This code is necessary to make sure the parent terminates
    // when the application is closed successfully.
    process.exit();
  },
  function onFailure(exitInfo) {
    // This code is necessary to make sure the parent terminates
    // when the application is closed because of a failure.
    process.exit();
  }
);

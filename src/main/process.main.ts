import "../globals.ts";
const { app, BrowserWindow } = require("electron");
const { EnableHotReload } = require("./utils/electron.utils");

const path = require("path");
var basepath = app.getAppPath();

const mFile = path.join(basepath, "./dist/index.html");
const preload = path.join(basepath, "./dist/preloadMain.js");

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      //   preload: "preload.js",
      preload: preload,
      //!security
      nodeIntegration: false,
      contextIsolation: true, // protect against prototype pollution
      enableRemoteModule: false, // turn off remote
    },
  });

  if (process.env.DEV) {
    EnableHotReload(win);
  }

  win.loadFile(mFile);
}

app.whenReady().then(() => {
  createWindow();

  app.on("activate", function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", function () {
  if (process.platform !== "darwin") app.quit();
});

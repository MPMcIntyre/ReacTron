const { app, BrowserWindow, ipcMain, session } = require("electron");
const {
  EnableHotReload,
  EnableReactDevtools,
} = require("./utils/electron.utils");
const openURL = require("open");
const path = require("path");

// Get application path
var basepath = app.getAppPath();

const mFile = path.join(basepath, "dist", "index.html");
const preload = path.join(basepath, "dist", "preloadMain.js");

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

app.whenReady().then(async () => {
  // * Load extentions into the browser if in development mode
  process.env.DEV && (await EnableReactDevtools(session, basepath));

  createWindow();

  // This is mainly targeted for MacOS, if the window is re-activated, it opens a new window, unless it already exists
  app.on("activate", function () {
    BrowserWindow.getAllWindows().length === 0 && createWindow();
  });
});

// * Close app when all windows are closed, except if on macOS
app.on("window-all-closed", function () {
  process.platform !== "darwin" && app.quit();
});

// // * Handle the ipcRenderer invocations with ipcMain.handle("channel", callback(event, args))
ipcMain.handle("openURL", (event: {}, URL: string) => {
  console.log(`Opening ${URL}`);
  try {
    openURL(URL);
  } catch (err) {
    console.log(err);
  }
  return true;
});

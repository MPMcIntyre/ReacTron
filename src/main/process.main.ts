const openURL = require("open");
const path = require("path");
const { app, BrowserWindow, ipcMain, session } = require("electron");
const {
  EnableHotReload,
  EnableReactDevtools,
} = require("./utils/electron.utils");

// * Get application path
var basepath = app.getAppPath();

// * Set up hot reloader for the renderer
process.env.DEV && EnableHotReload(basepath);

const mainHtmlFilePath = path.join(basepath, "dist", "index.html");
const preloadFilePath = path.join(basepath, "dist", "preloadMain.js");

// * A function to create a browser window, initialising with the preload file and main .html file
function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      //   preload: "preload.js",
      preload: preloadFilePath,
      //!security
      nodeIntegration: false,
      contextIsolation: true, // protect against prototype pollution
      enableRemoteModule: false, // turn off remote
    },
  });

  // * Load file
  win.loadFile(mainHtmlFilePath);
}

// * When the app is ready, load the extensions (if in devmode), then create the window
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

// * Handle the ipcRenderer invocations with ipcMain.handle("channel", callback(event, args))
ipcMain.handle("openURL", (event: {}, URL: string) => {
  console.log(`Opening ${URL}`);
  try {
    openURL(URL);
  } catch (err) {
    console.log(err);
  }
  return true;
});

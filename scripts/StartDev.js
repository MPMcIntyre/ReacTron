const concurrently = require("concurrently");
const { settings } = require("../developerSettings.js");
let ipcSocket = settings.ipcPort;
let deferTime = settings.electronDeferTime;

concurrently(
  [
    {
      command: "yarn webpack --watch",
      name: "webpack",
      prefixColor: "green",
      env: { DGRAM_SCKT: ipcSocket },
    },
    {
      command: "node ./scripts/DelayStart&&yarn electron .",
      name: "electron-main",
      prefixColor: "blue",
      env: { DGRAM_SCKT: ipcSocket, DEFER_TIME: deferTime },
    },
  ],
  {
    prefix: "name",
    killOthers: ["failure", "success"],
    restartTries: 0,
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

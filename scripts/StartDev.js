const concurrently = require("concurrently");
const { settings } = require("../developerSettings.js");

concurrently(
  [
    {
      command: "yarn webpack --watch",
      env: { DGRAM_SCKT: settings.ipcPort, DEV: true },
    },
  ],
  {
    prefix: "none",
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

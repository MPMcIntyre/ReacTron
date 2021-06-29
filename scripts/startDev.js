const concurrently = require("concurrently");
// ! Set the IPC socket here:
let ipcSocket = 6677;
// ! Set the max wait time for webpack here:
let waitTime = 15000;

concurrently(
  [
    {
      command: "yarn webpack --watch",
      name: "webpack",
      prefixColor: "green",
      env: { DGRAM_SCKT: ipcSocket },
    },
    {
      command: "node ./scripts/delayStart&&yarn electron .",
      name: "electron-main",
      prefixColor: "blue",
      env: { DGRAM_SCKT: ipcSocket, WAIT_TIME: waitTime },
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

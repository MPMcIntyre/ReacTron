const concurrently = require("concurrently");
const { settings } = require("../developerSettings.js");

concurrently(
  [
    {
      command: "yarn webpack --watch",
      name: "webpack",
      prefixColor: "green",
      env: { DGRAM_SCKT: settings.ipcPort, DEV: true },
    },
    {
      command: "node ./scripts/DelayStart&&yarn electron .",
      name: "electron-main",
      prefixColor: "blue",
      env: {
        DGRAM_SCKT: settings.ipcPort,
        DEFER_TIME: settings.electronDeferTime,
        DEV: true,
        REACT_DEV_TOOLS: settings.reactDevTools ? settings.reactDevTools : "",
        REDUX_DEV_TOOLS: settings.reduxDevTools ? settings.reduxDevTools : "",
        GRAPHQL_DEV_TOOLS: settings.graphQLDevTools
          ? settings.graphQLDevTools
          : "",
      },
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

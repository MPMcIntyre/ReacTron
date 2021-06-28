const concurrently = require("concurrently");

concurrently(["yarn webpack --watch", "yarn electron ."], {
  prefix: "name",
  killOthers: ["failure", "success"],
  restartTries: 0,
}).then(
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

// IPC communication
const dgram = require("dgram");
const server = dgram.createSocket("udp4");

console.log("Awaiting webpack");

// * This script runs if the maximum wait time is exceeded
const testTimer = setTimeout(() => {
  displayInformativeText();
  clearInterval(testTimer);
}, process.env.DEFER_TIME);

// * This script (hopefully) recieves a dgram (udp) message from the webpack plugin deferElectronStart
server.on("message", (msg, rinfo) => {
  if (msg.toString() === "webpack-completed") {
    console.log("Webpack completed, launching Electron :)");
    clearTimeout(testTimer);
    server.close();
  }
});
server.bind(process.env.DGRAM_SCKT);

// * Info text
displayInformativeText = () => {
  console.log(`MAX WAIT TIME EXCEEDED! (${process.env.DEFER_TIME}ms)`);
  console.log(
    "If webpack has completed (webpack 5.40.0 compiled successfully in ... s)"
  );
  console.log(
    "There might be an error in the wepback deferElectronStart plugin or startDev script ~~~ ELSE:"
  );

  console.log(
    "Ensure DEV environment variable is set to true when running development"
  );
  console.log(
    'Ensure webpack\'s mode is set to development (mode:"development") when running development'
  );
  console.log(
    "If your app is just THAT big, you can change this time in the developerSettings.js (electronDeferTime)"
  );
  console.log("Starting electron");
  server.close();
};

// * Server error handling
server.on("error", (err) => {
  console.log(`server error:\n${err.stack}`);
  server.close();
});

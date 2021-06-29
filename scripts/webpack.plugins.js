const concurrently = require("concurrently");
const dgram = require("dgram");
const socket = dgram.createSocket("udp4");
socket.connect(process.env.DGRAM_SCKT);
// socket.send(message, 0, message.length, 6677, "localhost", function (err) {
//   client.close();
// });

module.exports.deferElectronStart = class {
  constructor(options) {
    this.options = options;
  }
  apply(compiler) {
    compiler.hooks.afterCompile.tap("MyPlugin", (compilation) => {
      // return true to emit the output, otherwise false
      setTimeout(() => {
        try {
          socket.send("webpack-completed");
          socket.close();
        } catch (err) {}
      }, 50);
      return true;
    });
  }
};

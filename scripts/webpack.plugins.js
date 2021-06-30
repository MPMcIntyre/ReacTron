const dgram = require("dgram");
const socket = dgram.createSocket("udp4");

// * IPC if environment variable is created
process.env.DGRAM_SCKT && socket.connect(process.env.DGRAM_SCKT);

// * Defer electron start / wait for webpack plugin
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
      }, 500);
      return true;
    });
  }
};

// * Give user feedback of webpack
module.exports.declareCurrentPack = class {
  constructor(name, options) {
    this.name = name;
    this.showStats = options.showStats;
  }
  apply(compiler) {
    // * This only needs to be shown once
    if (this.showStats) {
      compiler.hooks.initialize.tap("InitCheck", (compilation) => {
        // return true to emit the output, otherwise false
        console.log("Starting compilation");
      });
    }

    // * Once compilation has completed
    compiler.hooks.done.tap("OnComp", (stats) => {
      // return true to emit the output, otherwise false
      let assetCount = Object.keys(stats.compilation.assets).length;
      let moduleCount = stats.compilation.modules.size;
      let time =
        (stats.compilation.endTime - stats.compilation.startTime) / 1000;
      console.log(`Webpack has compiled ${this.name}`);
      console.log(`Total assets: ${assetCount}, total modules: ${moduleCount}`);
      this.showStats && console.log(`Total time: ${time}s`);
    });

    //  * ERROR HANDLING
    compiler.hooks.failed.tap("ErrCheck", (error) => {
      // return true to emit the output, otherwise false
      console.log(`Webpack has failed to compile ${this.name}`);
      console.log(`Error: ${error}`);
    });

    compiler.hooks.watchClose.tap("closeCheck", (error) => {
      console.log(`Webpack watch has stopped`);
    });
  }
};

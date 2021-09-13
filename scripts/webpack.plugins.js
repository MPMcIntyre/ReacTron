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
      let error = false;
      let assetCount = Object.keys(stats.compilation.assets).length;
      let moduleCount = stats.compilation.modules.size;
      // Error colours:
      let Underscore = "\x1b[4m";
      let FgRed = "\x1b[31m";
      let Reset = "\x1b[0m";
      let FgYellow = "\x1b[33m";
      // Handle errors
      if (stats.compilation.errors.length !== 0) {
        error = true;
        if (stats.compilation.errors.length === 1) {
          console.log(`${FgRed}${Underscore}`);
          console.log("An error occurred:"); //cyan
        } else {
          console.log("Multiple errors occurred:"); //cyan
        }
        for (let i = 0; i < stats.compilation.errors.length; i++) {
          stats.compilation.errors.length > 1 &&
            console.log("Error no." + i + 1);
          console.log(Reset, FgYellow);
          // console.log();
          console.log("Error type: " + stats.compilation.errors[i]["name"]);
          console.log("" + stats.compilation.errors[i]["error"]);
        }
      }
      let time =
        (stats.compilation.endTime - stats.compilation.startTime) / 1000;
      console.log(Reset);
      !error && console.log(`Webpack has compiled ${this.name}`);
      !error &&
        console.log(
          `Total assets: ${assetCount}, total modules: ${moduleCount}`
        );
      console.log(
        `Total emitted assets: ${stats.compilation.emittedAssets.size}`
      );

      this.showStats && console.log(`Total time: ${time}s`);
    });

    compiler.hooks.watchClose.tap("closeCheck", (error) => {
      console.log(`Webpack watch has stopped`);
    });
  }
};

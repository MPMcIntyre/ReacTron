const path = require("path");
const fs = require("fs");
let distDir = path.join(process.cwd(), "dist");
let previousUpdateTime: any = new Date();

// * Custom hot reload function for Electron **
// * -> Function whatches the files inside /.build directoy, upon change it reloads the window
export function EnableHotReload(window: any) {
  try {
    let fileDir = path.join(distDir, "renderer.js");
    fs.watch(fileDir, (event: string, filename: string) => {
      if (filename) {
        let thisUpdateTime: any = new Date();
        if (thisUpdateTime - previousUpdateTime > 2000) {
          console.log("Files updated: Reloading page");
          // window.webContents.send("reload");
          window.reload();
          previousUpdateTime = new Date();
        }
      }
    });
  } catch (err) {
    throw new Error(err);
  }
}

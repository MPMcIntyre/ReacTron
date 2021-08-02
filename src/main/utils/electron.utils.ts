const path = require("path");
const fs = require("fs");
let distDir = path.join(process.cwd(), "dist");

export function EnableHotReload(window: any) {
  try {
    const files = fs.readdirSync(distDir);
    let stats: [] = [];
    files.forEach((file: []) => {
      let fileDir = path.join(distDir, file);
      fs.watch(fileDir, (event: string, filename: string) => {
        if (filename) {
          console.log("Files updated: Reloading page");
          window.reload();
        }
      });
    });
  } catch (err) {
    throw new Error(err);
  }
}

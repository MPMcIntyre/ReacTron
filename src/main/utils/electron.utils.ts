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
  } catch (err: any) {
    // throw new Error(err);
  }
}

export async function EnableReactDevtools(session: any, basepath: string) {
  let ReactDevToolPath = path.join(
    basepath,
    "scripts",
    "react-devtools",
    "3.4.2"
  );
  let ReduxDevToolPath = path.join(
    basepath,
    "scripts",
    "redux-devtools",
    "2.17.1"
  );
  let GraphQLDevToolPath = path.join(
    basepath,
    "scripts",
    "graphql-devtools",
    "0.1.2"
  );

  process.env.REACT_DEV_TOOLS && (await installDevTools(ReactDevToolPath));
  process.env.REDUX_DEV_TOOLS && (await installDevTools(ReduxDevToolPath));
  process.env.GRAPHQL_DEV_TOOLS && (await installDevTools(GraphQLDevToolPath));

  async function installDevTools(devpath: string) {
    try {
      await session.defaultSession
        .loadExtension(
          devpath,
          // allowFileAccess is required to load the devtools extension on file:// URLs.
          { allowFileAccess: true }
        )
        .catch();
      console.log("! Ignore the previous warnings !");
    } catch (err) {
      console.log(err);
    }
  }
}

const path = require("path");

// * Custom hot reload function for Electron **
// * -> Function whatches the files inside /.build directoy, upon change it reloads the window
export function EnableHotReload(basepath: string): void {
  // Set up hot reloader
  const { rendererReloader } = require("electron-hot-reload");
  const rendererFile = path.join(basepath, "dist", "renderer.js");

  rendererReloader(rendererFile, null, (error: any, path: string) => {
    console.log("Renderer has updated");
  });
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

  // * Install the devtools into the browser window if the developerSettings is set to true
  process.env.REACT_DEV_TOOLS && (await installDevTools(ReactDevToolPath));
  process.env.REDUX_DEV_TOOLS && (await installDevTools(ReduxDevToolPath));
  process.env.GRAPHQL_DEV_TOOLS && (await installDevTools(GraphQLDevToolPath));

  // * Install function for the devtools
  async function installDevTools(devpath: string) {
    try {
      await session.defaultSession
        .loadExtension(
          devpath,
          // allowFileAccess is required to load the devtools extension on file:// URLs.
          { allowFileAccess: true }
        )
        .catch();
    } catch (err) {
      console.log(err);
    }
  }
}

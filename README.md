<div align="CENTER"> 
    <img src="https://github.com/MPMcIntyre/personal-readme/raw/master/ReacTron.png?raw=true" width="300"/>
    A dynamic boilerplate with minimalist React, linked directly to WebPack and a custom hot relaoder for Electron. Keep your source code obscure by only publishing minified code, and add almost any package with an up-to-date webpack config. Bundled with scripts to ease prodution, such as source maps for development, but removal thereof when building to propduction. This boilerplate is tailored to keep the development environment as close to production as possible by completely mitigating a dev-server.
</div>
<h1>Overview:</h1>
<h3>Settings:</h3>
<h4>developerSettings.js</h4>
<ul>
    <li>electronDeferTime: time-out time for the DelayStart.js script</li>
  <li>ipcPort: The udp port that dgram uses for webpack to emit the <li>compilation complete event to DelayStart.js</li>
  <li>showBundleAnalyzer: is used in webpack.config.js to show the bundle analyzer or not</li>
  <li>bundleAnalyzerPortA: Bundle analyzer port for the renderer files</li>
  <li>bundleAnalyzerPortB: Bundle analyzer port for the main files
<ul>

<h3>Scripts</h3>
<h4>asar.check.bat</h4>
This script is just a placeholder for MS development environments, and can be placed inside of the packaged app to extract the .asar file for review. This script is not automatically run.

<h4>SelayStart.js</h4>
This script is one of the scripts that runs concurrently with the webpack bundler. Its sole purpouse is to simply delay until the webpack has finished bundling or until the time-out has lapsed. Once this function has completed, it closes and the StartDev.js script will launch electron.

<h4>Package.js</h4>
This script is only run when packaging the app. It provides a cleanup of .map.js files and removes any webpack bundled javascript files. This is to ensure minification and obscurity when webpack compiles in production mode.

<h4>StartDev.js</h4>
This script uses concurrently (described in the commands below) to simultaniously run the webpack compiler and DelayStart. Webpack is run in watch-mode in order to compile after every save. This allows for the custom hot-reloader to detect file changes and reload the webpage upon a save.

<h4>webpack.plugins.js</h4>
This file contains custom webpack plugins that use webpack hooks to detect failure to compile, compilation completion, as well as minimalistic stats reporting.

<h1>Commands:</h1>
<h4>Start (`yarn start` or `npm run start`)</h4>
This will run the starting script which uses the <a href="https://www.npmjs.com/package/concurrently">concurrently package</a> to simultaniously start the webpack bundler and the Electron delayStart.js script. The webpack bundler uses a custom plugin that hooks into webpack and, using <a href="https://nodejs.org/api/dgram.html">dgram</a> emits a message upon completion. The delayStart script acts as the dgram host, waiting for the event. Once registered, the delay script starts the electron process. There is a time-out inside of the delay start script, this is to ensure that even if there is no event emitted, that the electron app will start, and can be edited inside of the developerSettings.js.

<h4>Rebuild (`yarn rebuild` or `npm run rebuild`)</h4>
This uses electron-builder to install app dependancies and rebuild npm packages for electron.

<h4>Package (`yarn package` or `npm run package`)</h4>
This script starts the Package.js script, which cleans up the `./dist` folder, runs webpack in production mode, then uses electron-builder to package the app for the current platform.

<h4>Postinstall</h4>
This script is used as a hook for electron-builder.

<h2>Notes:</h2>
This template was created to ease the development process for myself, yet I think there might be a few people that prefer to use a simplistic serverless setup such as this one. There is still plenty of work that will go into this template, but it will be incremental. If you like this project and wish to support me, please feel free to buy me a coffee or something.❤️

<div align="CENTER"> 
    <img src="https://github.com/MPMcIntyre/personal-readme/raw/master/ReacTron.png?raw=true" width="300"/>
    <br/>
    A dynamic boilerplate with minimalist React (server-less), linked directly to WebPack and a custom hot relaoder for Electron. Keep your source code obscure by only publishing minified code, and add almost any package with an up-to-date webpack config. Bundled with scripts to ease prodution, such as source maps for development, but removal thereof when building to production, allowing for installation of local fonts, and Chrome dev-tool extentions. This boilerplate is tailored to keep the development environment as close to production as possible by completely mitigating a dev-server. Write in `src`, develop in `dist`, and package to `release`.
</div>
<h1>Version history:</h1>
<ul>
<li>1.1.1 - Minor updates</li>
  <ul>
    <li>Update package.json (removed some bloat with security risks):</li>
    <li>Updated readme</li>
    <li>Added github sponsors</li>
    <li>Audited packages (0 vulnerabilites)</li>
  </ul>
<li>1.1.0 - First major revision (Public release)</li>
  <ul>
    <li>Added developer extensions:</li>
      <ul>
        <li>Added React developer tools extention</li>
        <li>Added Redux developer tools extention</li>
        <li>Added GraphQL developer tools extention</li>
      </ul>
    <li>Added webpack functionality:</li>
      <ul>
        <li>Added FontLoader and AssetLoader</li>
        <li>Added HtmlWebpackPlugin</li>
        <li>Added threads plugin - for future use</li>
      </ul>
    <li>Updated renderer properties:</li>
      <ul>
        <li>Added local font installation to renderer.main.tsx</li>
        <li>Updated react-app UI</li>
      </ul>
    <li>General:</li>
      <ul>
        <li>Updated readme</li>
      </ul>
  </ul>
<li>1.0.0 - First Commit (Private release)</li>
</ul>

# Overview:

<h3>Settings:</h3>
<h4>developerSettings.js</h4>
<ul>
  <li>webpackStats: If false, custom messages are displayed, else, normal webpack messages are displayed</li>
  <li>electronDeferTime: Time-out time for the DelayStart.js script</li>
  <li>ipcPort: The udp port that dgram uses for webpack to emit the compilation complete event to DelayStart.js</li>
  <li>showBundleAnalyzer: Is used in webpack.config.js to show the bundle analyzer or not</li>
  <li>bundleAnalyzerPortA: Bundle analyzer port for the renderer files</li>
  <li>bundleAnalyzerPortB: Bundle analyzer port for the main files
  <li>reactDevTools: Enable/disable react developer tools extension </li>
  <li>reduxDevTools:  Enable/disable redux developer tools extension </li>
  <li>graphQLDevTools: Enable/disable graphQL developer tools extension</li>
</ul>

### Scripts

#### asar.check.bat

This script is just a placeholder for MS development environments, and can be placed inside of the packaged app to extract the .asar file for review. This script is not automatically run.

#### DelayStart.js

This script is one of the scripts that runs concurrently with the webpack bundler. It's sole purpouse is to simply delay until the webpack has finished bundling or until the time-out has lapsed. Once this function has completed, it closes and the StartDev.js script will launch electron.

#### Package.js

This script is only run when packaging the app. It provides a cleanup of .map.js files and removes any webpack bundled javascript files. This is to ensure minification and obscurity when webpack compiles in production mode.

#### StartDev.js

This script uses concurrently (described in the commands below) to simultaniously run the webpack compiler and DelayStart. Webpack is run in watch-mode in order to compile after every save. This allows for the custom hot-reloader to detect file changes and reload the webpage upon a save.

#### webpack.plugins.js

This file contains custom webpack plugins that use webpack hooks to detect failure to compile, compilation completion, as well as minimalistic stats reporting. In addition to the webpack plugins, this file also houses the FontLoader and AssetLoader functions.

#### Installing local fonts:

Fonts can be downloaded in any html supported format (.ttf, woff2, etc.), added to the `font`
folder inside of `./src`, then added by including it in the `fonts` object inside of `renderer.main.tsx`. Remember that it is an object that uses the name of the font file as the object key, and the font format as the value.

# Commands:

#### Start (`yarn start` or `npm run start`)

This will run the starting script which uses the <a href="https://www.npmjs.com/package/concurrently">concurrently package</a> to simultaniously start the webpack bundler and the Electron delayStart.js script. The webpack bundler uses a custom plugin that hooks into webpack and, using <a href="https://nodejs.org/api/dgram.html">dgram</a> emits a message upon completion. The delayStart script acts as the dgram host, waiting for the event. Once registered, the delay script starts the electron process. There is a time-out inside of the delay start script, this is to ensure that even if there is no event emitted, that the electron app will start, and can be edited inside of the developerSettings.js.

#### Rebuild (`yarn rebuild` or `npm run rebuild`)

This uses electron-builder to install app dependancies and rebuild npm packages for electron.

#### Package (`yarn package` or `npm run package`)

This script starts the Package.js script, which cleans up the `./dist` folder, runs webpack in production mode, then uses electron-builder to package the app for the current platform. Settings for electron builder can be altered inside of the package.json file.

#### Postinstall

This script is used as a hook for electron-builder.

<div align="CENTER"> 
<h2>Notes:</h2>
When using the developer tools, it is common to see error messages regarding the manifest key and permissions. This is normal, and the extensions still work as normal.
<h1></h1>
The local paths for the main process and renderer process differ as the renderer is executed by the index.html file. Thus ensure, for the main process, to include the `./dist/` folder as your base when accessing assets or other material.
<h1></h1>
This template was created to ease the development process for myself, yet I think there might be a few people that prefer to use a simplistic serverless setup such as this one. There is still plenty of work that will go into this template, but it will be incremental. If you like this project and wish to support me, please feel free to buy me a coffee or something.

<br/>
<a href="https://github.com/sponsors/MPMcIntyre" target="_blank" rel="noreferrer"> 
  <img src="https://img.shields.io/static/v1?label=Sponsor&message=%E2%9D%A4&logo=GitHub&link=<url>" alt="githubSponsors-img"/>
</a>

</div>

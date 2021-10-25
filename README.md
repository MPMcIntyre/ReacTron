<div align="CENTER"> 
    <img src="https://github.com/MPMcIntyre/personal-readme/raw/master/ReacTron.png?raw=true" width="300"/>
    <br/>
    A dynamic boilerplate with minimalist React (server-less), linked directly to WebPack with typescript support and electron reloaders for both the renderer and the main process sperately. Keep your source code obscure by only publishing minified code, and add almost any package with an up-to-date webpack config. Bundled with scripts to ease prodution, such as source maps, allowing for installation of local fonts (.ttf, .woff2, etc.), and Chrome dev-tool extentions. This boilerplate is tailored to keep the development environment as close to production as possible by completely mitigating a dev-server. Write in `src`, develop in `dist`, and package to `release`.
</div>
<h1>Version history:</h1>
<ul>
<li>1.2.0 - Second major revision</li>
  <ul>
    <li>Audited and updated packages</li>
      <ul>
        <li>Waiting on electron-builder to update ansi-regex (the only 2 minor vulnerabilities)</li>
      </ul>
    <li>Replaced node-sass with dart-sass</li>
      <ul>
        <li>Node-sass is depricated, dart-sass has improved performance and continued support</li>
        <li>Reflected changes in webpack.config</li>
      </ul>
    <li>Added electron-reloader-webpack-plugin for hot reloading of the main process</li>
      <ul>
        <li>Electron is started by this plugin unless specified otherwise in the developerSettings.js</li>
        <li>Electron proces is started with concurrently in ElectronStart.js from the webpack config</li>
      </ul>
    <li>Removed electron delay start scripts (depricated)</li>
    <li>Added electron-hot-reload</li>
      <ul>
        <li>This closes the issue regarding the custom hot reloader (<a href="https://github.com/MPMcIntyre/ReacTron/issues/1">#1</a>)</li>
      </ul>
    <li>Updated developerSettings.js to reflect core changes</li>
    <li>Updated readme</li>
  </ul>
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

`webpackStats`: `true|false` If false, custom messages are displayed, else, normal webpack messages are displayed

`showBundleAnalyzer`: `true|false` Is used in webpack.config.js to show the bundle analyzer or not

`emitBundleAnalyzerOnPackage`: `true|false` Emits bundle analyzer .html files in `./scripts` for your code and packages upon packaging

`ElectronReload`: `true|false` Used to determine if the electron-reloader-webpack-plugin is added to plugins or not for hot-reloading of the main process. If it is, it will run electron, else electron is started with exec.

`bundleAnalyzerPortA`: `number` Bundle analyzer port for the renderer files

`bundleAnalyzerPortB`: `number` Bundle analyzer port for the main files

`reactDevTools`: `true|false` Enable/disable react developer tools extension

`reduxDevTools`: `true|false` Enable/disable redux developer tools extension

`graphQLDevTools`: `true|false` Enable/disable graphQL developer tools extension

### Scripts

#### asar.check.bat

This script is just a placeholder for MS development environments, and can be placed inside of the packaged app to extract the .asar file for review. This script is not automatically run.

#### ElectronStart.js

This script creates environment variables for the electron process during development and starts the electron process.

#### Package.js

This script is only run when packaging the app. It provides a cleanup of .map.js files and removes any webpack bundled javascript files. This is to ensure minification and obscurity when webpack compiles in production mode.

#### StartDev.js

This script runs webpack in watch mode with defined environment variables for development mode.

#### webpack.plugins.js

This file contains custom webpack plugins that use webpack hooks to detect failure to compile, compilation completion, as well as minimalistic stats reporting. In addition to the webpack plugins, this file also houses the FontLoader and AssetLoader functions.

#### Installing local fonts:

Fonts can be downloaded in any html supported format (.ttf, woff2, etc.), added to the
folder `./src/renderer/fonts`, then added by including it in the `fonts` object inside of `renderer.main.tsx`. Remember that it is an object that uses the name of the font file as the object key (string), and the font format as the value e.g. `fonts = {Questrial:"ttf"}`.

# Commands:

#### Start (`yarn start` or `npm run start`)

This will run the starting script which uses the <a href="https://www.npmjs.com/package/concurrently">concurrently package</a> to start the webpack bundler in watch mode, which also starts the electron process. Terminate webpack with ctrl+c in the terminal to stop it from spawning an electron process, or save in one of the main process files to restart or start an electron process when killed.

#### Rebuild (`yarn rebuild` or `npm run rebuild`)

This uses electron-builder to install app dependancies and rebuild npm packages for electron.

#### Package (`yarn package` or `npm run package`)

This script starts the Package.js script, which cleans up the `./dist` folder, runs webpack in production mode, then uses electron-builder to package the app for the current platform. Settings for electron builder can be altered inside of the package.json file.

_PLEASE NOTE: When packaging for the first time, ensure that you have an internet connection, electron-builder needs to download when it is first run, otherwise you will recieve an error with code "ERR_ELECTRON_BUILDER_CANNOT_EXECUTE"_

#### Postinstall

This script is used as a hook for electron-builder.

<h2>Notes:</h2>
When using the developer tools, it is common to see error messages regarding the manifest key and permissions. This is normal, and the extensions still work as normal.
<h1></h1>
The local paths for the main process and renderer process differ as the renderer is executed by the index.html file. Thus ensure, for the main process, to include the `./dist/` folder as your base when accessing assets or other material.

<div align="CENTER"> 
    
<h1></h1>
This template was created to ease the development process for myself, yet I think there might be a few people that prefer to use a simplistic serverless setup such as this one. There is still plenty of work that will go into this template, but it will be incremental. If you like this project and wish to support me, please feel free to buy me a coffee or something.

<br/>
    
<a href="https://github.com/sponsors/MPMcIntyre" target="_blank" rel="noreferrer"> 
  <img src="https://img.shields.io/static/v1?label=Sponsor&message=%E2%9D%A4&logo=GitHub&link=<url>" alt="githubSponsors-img"/>
</a>

</div>

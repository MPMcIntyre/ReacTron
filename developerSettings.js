module.exports.settings = {
  webpackStats: false, // If false, custom messages are displayed, else, normal webpack messages are displayed
  electronDeferTime: 15000, // Maximum wait time (in ms) for webpack before electron starts
  ipcPort: 6677, //ipc port for webpack to talk to DelayStart.js
  showBundleAnalyzer: false, // Show bundle analyzer for your code and packages (bundle analyzer is always off for production)
  bundleAnalyzerPortA: 8888, // Bundle analyzer port for renderer bundle
  bundleAnalyzerPortB: 8889, // Bundle analyzer port for main bundle
  reactDevTools: true, // Enable react developer tools extension
  reduxDevTools: true, // Enable redux developer tools extension
  graphQLDevTools: true, // Enable graphQL developer tools extension
};

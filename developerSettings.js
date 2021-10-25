module.exports.settings = {
  webpackStats: false, // If false, minimal custom messages are displayed, else, normal webpack messages are displayed
  showBundleAnalyzer: true, // Show bundle analyzer for your code and packages, this does not happen for packaging
  emitBundleAnalyzerOnPackage: true, // Emit bundle analyzer .html files in `./scripts` for your code and packages upon packaging
  ElectronReload: true, // Enable electron reloader for the main process
  bundleAnalyzerPortA: 8888, // Bundle analyzer port for renderer bundle
  bundleAnalyzerPortB: 8889, // Bundle analyzer port for main bundle
  reactDevTools: true, // Enable react developer tools extension
  reduxDevTools: true, // Enable redux developer tools extension
  graphQLDevTools: true, // Enable graphQL developer tools extension
};

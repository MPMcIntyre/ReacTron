const { contextBridge } = require("electron");

const isDev = () => {
  return process.env.DEV;
};

contextBridge.exposeInMainWorld("GlobalApi", {
  isDev: isDev(),
});

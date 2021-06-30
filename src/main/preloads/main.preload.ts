import "./core.preload.ts";
const { contextBridge } = require("electron");
const open = require("open");

// opens the url in the default browser
const openExternal = (link: string) => {
  return open(link);
};

contextBridge.exposeInMainWorld("mainApi", {
  openExternal: openExternal,
});

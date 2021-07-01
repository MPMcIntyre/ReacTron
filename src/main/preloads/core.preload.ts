const { contextBridge, ipcRenderer } = require("electron");

const invoke = (channel: string, args: any) => {
  ipcRenderer.invoke(channel, args);
};

const isDev = () => {
  return process.env.DEV;
};

contextBridge.exposeInMainWorld("GlobalApi", {
  isDev: isDev(),
  invoke: invoke,
});

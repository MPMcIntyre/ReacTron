const { contextBridge, ipcRenderer } = require("electron");

const sayHello = () => {
  console.log("Hello");
};
const invoke = (channel: string, args: any) => {
  ipcRenderer.invoke(channel, args);
};

const isDev = () => {
  return process.env.DEV;
};

contextBridge.exposeInMainWorld("GlobalApi", {
  isDev: isDev(),
  invoke: invoke,
  sayHello: sayHello,
});

contextBridge.exposeInMainWorld("Omar", {
  myNameIs: (name: string) => {
    console.log(name);
  },
});

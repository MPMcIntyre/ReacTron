export {};
declare global {
  interface window {
    electron: {
      isDev: () => boolean;
    };
  }
}

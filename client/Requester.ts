// import { ipcRenderer } from "electron";
const { ipcRenderer } = window.require("electron");

export default class Requester {
  public request<T>(channel: string, argument?: string): Promise<string> {
    ipcRenderer.send(channel, argument);

    return new Promise((resolve) => {
      ipcRenderer.on(channel, (event, response) => {
        resolve(response);
      });
    });

    //return new Promise((resolve) => resolve("hello world"));
  }
}

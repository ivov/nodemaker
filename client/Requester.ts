import { ipcRenderer } from "electron";

export default class Requester {
  public request<T>(channel: string, argument?: string): Promise<T> {
    ipcRenderer.send(channel, argument);

    return new Promise((resolve) => {
      ipcRenderer.on(channel, (event, response) => {
        resolve(response);
      });
    });
  }
}

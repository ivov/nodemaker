const { ipcRenderer } = window.require("electron");

/**Responsible for receiving a request through a channel and returning a response through that same channel.*/
export default class Requester {
  // prettier-ignore
  public request<T extends RequesterInputType>(channel: string, argument?: T): Promise<RequesterOutputType<T>> {
    ipcRenderer.send(channel, argument);

    return new Promise((resolve) => {
      ipcRenderer.on(channel, (event, response) => resolve(response));
    });
  }
}

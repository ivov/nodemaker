const { ipcRenderer } = window.require("electron");

/**Responsible for receiving a request (with an optional argument) through a channel and returning a response through that same channel.*/
export default class Requester {
  public request<T>(
    channel: string,
    argument: any
  ): Promise<T extends string ? T : NodemakerResult> {
    ipcRenderer.send(channel, argument);

    return new Promise((resolve) => {
      ipcRenderer.on(channel, (event, response) => resolve(response));
    });
  }
}
